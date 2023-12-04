import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, gql } from '@apollo/client';
import WebsocketMethods from '../meteor-socket-connect/methods/join-methods';
import MeetingInfo from './graphql-collections/meeting-info';

const JoinMeetingFinal = (props) => {
  const { userAuthToken, host, userId, sessionToken } = props;
  const [meteorStage, setMeteorStage] = useState(0);
  const receiveConnectFromMeteorSocket = useSelector(
    (state) => state.client.sessionState.receiveConnectFromMeteorSocket
  );

  const [dispatchUserJoin] = useMutation(gql`
    mutation UserJoin($authToken: String!, $clientType: String!) {
      userJoin(
        authToken: $authToken,
        clientType: $clientType,
      )
    }
  `);

  const handleDispatchUserJoin = () => {
    dispatchUserJoin({
      variables: {
        authToken: userAuthToken,
        clientType: 'HTML5',
      },
    });
    console.log('DONE STAGE 4');
    console.log('Login completed');
  };

  useEffect(() => {
    switch (meteorStage) {
      case 0: {
        handleDispatchUserJoin();
        setMeteorStage(1);
        break;
      }
      case 1: {
        WebsocketMethods.makeWS(host);
        setMeteorStage(2);
        break;
      }
      case 2: {
        WebsocketMethods.handleSetOnMethodsToWebsocket();
        setMeteorStage(3);
        break;
      }
      case 3: {
        if (receiveConnectFromMeteorSocket) {
          WebsocketMethods.SubscribeToMeteorCollections();
          // WebsocketMethods.initializeMediaManagers({
          //   internalUserID: userId,
          //   host,
          //   sessionToken
          // });
          setMeteorStage(4);
        }
        break;
      }
      case 4: {
        break;
      }
      default:
        break;
    }
  }, [meteorStage, receiveConnectFromMeteorSocket]);

  return (
    <View>
    </View>
  );
};

export default JoinMeetingFinal;
