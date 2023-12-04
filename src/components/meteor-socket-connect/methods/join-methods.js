import {
  getRandomDigits, getRandomAlphanumeric, parseDDP, stringifyDDP,
} from '../../socket-connection/utils';
import { MeetingModule } from '../../socket-connection/modules/meeting';
import { CurrentUserModule } from '../../socket-connection/modules/current-user';
import { VideoStreamsModule } from '../../socket-connection/modules/video-streams';
import { setConnected, setReceiveConnectFromMeteorSocket } from '../../../store/redux/slices/wide-app/client';
import MethodTransaction from '../../socket-connection/method-transaction';
import MethodTransactionManager from '../../socket-connection/method-transaction-manager';
import MessageSender from '../../socket-connection/message-sender';
import AudioManager from '../../../services/webrtc/audio-manager';
import VideoManager from '../../../services/webrtc/video-manager';
import ScreenshareManager from '../../../services/webrtc/screenshare-manager';
import { store } from '../../../store/redux/store';
import logger from '../../../services/logger';

const GLOBAL_TRANSACTIONS = new MethodTransactionManager();
let GLOBAL_WS = null;
let GLOBAL_MSG_SENDER = null;
let GLOBAL_MODULES = null;

const makeWS = (host) => {
  const wsUrl = `wss://${host}/html5client/sockjs/${getRandomDigits(
    3
  )}/${getRandomAlphanumeric(8)}/websocket`;

  // eslint-disable-next-line no-undef
  GLOBAL_WS = new WebSocket(wsUrl);
  console.log('Set WS connection');
  console.log(GLOBAL_WS);
};

// ** handleSetOnMethodsToWebsocket

const onOpen = () => {
  store.dispatch(setConnected(true));

  logger.info({
    logCode: 'main_websocket_open',
  }, 'Main websocket connection open');
};

const onClose = () => {
  store.dispatch(setConnected(false));
  logger.info({
    logCode: 'main_websocket_closed',
  }, 'Main websocket connection closed');
};

const onError = (error) => {
  logger.info({
    logCode: 'main_websocket_error',
    extraInfo: {
      errorMessage: error.message,
      errorCode: error.code,
    },
  }, `Main websocket error: ${error.message}`);
};

const sendMessage = (msgObj) => {
  try {
    const msg = stringifyDDP(msgObj).replace(/\\|"/g, (match) => `\\${match}`);
    GLOBAL_WS.send(`["${msg}"]`);
    console.log('sending message: ', msg);
  } catch (error) {
    logger.error({
      logCode: 'main_websocket_error',
      extraInfo: { error, msgObj },
    }, `Main websocket send failed: ${error} enqueue= ${msgObj?.msg || 'Unknown'}`);
  }
};

const sendConnectMsg = () => {
  sendMessage({
    msg: 'connect',
    version: '1',
    support: ['1', 'pre2', 'pre1'],
  });
};

const processMessage = (msgObj) => {
  switch (msgObj.msg) {
    case 'ping': {
      sendMessage({ msg: 'pong' });
      console.log('sending pong');
      break;
    }
    case 'connected': {
      store.dispatch(setReceiveConnectFromMeteorSocket(true));
      console.log('SetConnected true');
      break;
    }
    case 'result': {
      // Probably dealing with a module makeCall/method response
      if (msgObj.collection) {
        const currentModule = GLOBAL_MODULES.current[msgObj.collection];
        if (currentModule) {
          currentModule.processMessage(msgObj);
        }
      } else {
        Object.values(GLOBAL_MODULES.current).forEach((module) => {
          module.processMessage(msgObj);
        });
      }

      // Resolve/reject any higher level transactions called from /services/api/makeCall
      if (GLOBAL_TRANSACTIONS.hasTransaction(msgObj.id)) {
        if (typeof msgObj.error === 'object') {
          GLOBAL_TRANSACTIONS.rejectTransaction(msgObj.id, msgObj.error);
        } else {
          GLOBAL_TRANSACTIONS.resolveTransaction(msgObj.id, msgObj.result);
        }
      }
      break;
    }

    case 'added': {
      const currentModule = GLOBAL_MODULES.current[msgObj.collection];
      if (currentModule) {
        if (msgObj.id !== 'publication-stop-marker') {
          currentModule.add(msgObj);
        } else {
          currentModule.onPublicationStopMarker(msgObj);
        }
      }

      break;
    }

    case 'removed': {
      const currentModule = GLOBAL_MODULES.current[msgObj.collection];
      if (currentModule) {
        currentModule.remove(msgObj);
      }
      break;
    }

    case 'changed': {
      const currentModule = GLOBAL_MODULES.current[msgObj.collection];
      if (currentModule) {
        currentModule.update(msgObj);
      }

      break;
    }
    // The following messages should be processed by the modules themselves
    case 'ready':
    case 'nosub': {
      Object.values(GLOBAL_MODULES.current).forEach((module) => {
        module.processMessage(msgObj);
      });
      break;
    }

    default:
      break;
  }
};

const onMessage = (event) => {
  let msg = event.data;

  if (msg === 'o') {
    sendConnectMsg();
  } else {
    if (msg.startsWith('a')) msg = msg.substring(1, msg.length);

    const msgObj = parseDDP(msg);

    if (msgObj && Object.keys(msgObj).length) {
      console.log('New message', msgObj);
      processMessage(msgObj);
    }
  }
};

const handleSetOnMethodsToWebsocket = () => {
  GLOBAL_WS.onopen = onOpen;
  GLOBAL_WS.onclose = onClose;
  GLOBAL_WS.onerror = onError;
  GLOBAL_WS.onmessage = (msg) => onMessage(msg);
};

// ** SubscribeToMeteorCollections

const SubscribeToMeteorCollections = () => {
  const messageSender = new MessageSender(GLOBAL_WS, GLOBAL_TRANSACTIONS);
  GLOBAL_MSG_SENDER = messageSender;

  // Mirrors for Meteor collections that are fully implemented
  const modules = {
    meetings: new MeetingModule(GLOBAL_MSG_SENDER),
    'current-user': new CurrentUserModule(GLOBAL_MSG_SENDER),
    'video-streams': new VideoStreamsModule(GLOBAL_MSG_SENDER),
  };

  Object.values(modules).forEach((module) => {
    if (module) {
      module.onConnected();
    }
  });

  GLOBAL_MODULES = modules;
};

const initializeMediaManagers = ({ internalUserID, host, sessionToken }) => {
  const mediaManagerConfigs = {
    userId: internalUserID,
    host,
    sessionToken,
    makeCall,
    logger,
  };
  console.log("kkkkkkkkkkkkk")
  console.log("host", host, "sessionToken", sessionToken, "internalUserID", internalUserID)
  AudioManager.init(mediaManagerConfigs);
  VideoManager.init(mediaManagerConfigs);
  ScreenshareManager.init(mediaManagerConfigs);
};

// ** Make Call
const makeCall = (name, ...args) => {
  if (GLOBAL_WS == null) throw new TypeError('Socket is not open');

  const transaction = new MethodTransaction(name, args);
  GLOBAL_TRANSACTIONS.addTransaction(transaction);
  sendMessage(GLOBAL_WS, transaction.payload);

  return transaction.promise;
};

export default {
  makeWS,
  handleSetOnMethodsToWebsocket,
  SubscribeToMeteorCollections,
  initializeMediaManagers,
  makeCall
};
