import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import UrlUtils from '../utils/functions';

const useJoinMeeting = () => {
  const [sessionToken, setSessionToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userAuthToken, setUserAuthToken] = useState(null);
  const [graphqlClient, setGraphqlClient] = useState(null);
  const [enterApiResponse, setEnterApiResponse] = useState(null);
  const [urlWithSessionId, setUrlWithSessionId] = useState(null);
  const [host, setHost] = useState('');
  const [loginStage, setLoginStage] = useState(0);

  const url = 'https://dev30.bigbluebutton.org/bigbluebutton/api/join?fullName=User+6499614&meetingID=random-43615&password=mp&redirect=true&checksum=7f91e4328939e4218395677b5ce8773ed14cba0b';

  async function requestSessionToken() {
    fetch(`${url}`)
      .then((data) => {
        if (data.status === 200) {
          setUrlWithSessionId(data.url);
          setSessionToken(UrlUtils.parseQueryString(data.url).sessionToken);
          setHost(UrlUtils.getHostFromUrl(url));
          setLoginStage(1);
          console.log('DONE STAGE 0');
        }
      });
  }

  async function joinWithSessionToken() {
    fetch(`${urlWithSessionId}`)
      .then((data) => {
        if (data.status === 200) {
          setLoginStage(2);
          console.log('DONE STAGE 1');
        }
      });
  }

  async function callApiEnter() {
    fetch(`https://${host}/bigbluebutton/api/enter/?sessionToken=${sessionToken}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setEnterApiResponse(data.response.returncode);
        if (data?.response?.internalUserID) {
          setUserId(data.response.internalUserID);
          setUserName(data.response.fullname);
          setUserAuthToken(data.response.authToken);
          setLoginStage(3);
          console.log('DONE STAGE 2');
        }
      });
  }

  async function connectGraphqlServer() {
    if (enterApiResponse !== 'SUCCESS') {
      console.log('Error enterApiResponse');
      return;
    }

    console.log(`Creating graphql socket with token ${sessionToken}`);
    const wsLink = new WebSocketLink(
      new SubscriptionClient(`wss://${`${host}`}/v1/graphql`, {
        reconnect: true,
        timeout: 30000,
        connectionParams: {
          headers: {
            'X-Session-Token': sessionToken,
            'json-patch-supported': 'true'
          }
        }
      })
    );

    setGraphqlClient(new ApolloClient({ link: wsLink, cache: new InMemoryCache() }));
    console.log('DONE STAGE 3');
    setLoginStage(4);
  }

  useEffect(() => {
    switch (loginStage) {
      case 0:
        requestSessionToken();
        break;
      case 1:
        joinWithSessionToken();
        break;
      case 2:
        callApiEnter();
        break;
      case 3:
        connectGraphqlServer();
        break;
      case 4:
        console.log('Login first part complete');
        break;
      default:
        console.log('error');
    }
  }, [loginStage]);

  return {
    graphqlClient,
    userId,
    userName,
    sessionToken,
    userAuthToken,
    loginStage
  };
};

export default useJoinMeeting;
