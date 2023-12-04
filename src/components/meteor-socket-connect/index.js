import { View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import WebsocketMethods from './methods/join-methods';
import logger from '../../services/logger';

const MeteorSocketController = (props) => {
  const {
    host, userAuthToken, sessionToken, userId
  } = props;

  const [loginStage, setLoginStage] = useState(0);

  useEffect(() => {
    switch (loginStage) {
      case 0:
        WebsocketMethods.makeWS(host);
        WebsocketMethods.handleSetOnMethodsToWebsocket();
        WebsocketMethods.SubscribeToMeteorCollections();
        // JoinMethods.connectToMeteorWebsocket(host, userAuthToken, sessionToken, userId);
        setLoginStage(1);
        break;
      default:
        console.log('error');
    }
  }, [loginStage]);

  return (
    <View />
  );
};

export default MeteorSocketController;
