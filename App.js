import { Provider } from 'react-redux';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import { View, Text } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { store } from './src/store/redux/store';
import AppStatusBar from './src/components/status-bar';
import AppContent from './src/app-content';
import useJoinMeeting from './src/hooks/use-join-meeting';
import JoinMeetingFinal from './src/components/join-meeting-final';
import './src/utils/locales/i18n';

const App = (props) => {
  const LoginObject = useJoinMeeting();
  const {
    graphqlClient,
    sessionToken,
    userAuthToken,
    loginStage,
    host,
    userId
  } = LoginObject;

  if (!graphqlClient || sessionToken === null) {
    console.log('alo?');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log('ai sim?');
  return (
    <ApolloProvider client={graphqlClient}>
      <Provider store={store}>
        <JoinMeetingFinal
          userAuthToken={userAuthToken}
          host={host}
          sessionToken={sessionToken}
          userId={userId}
        />
        <OrientationLocker orientation={PORTRAIT} />
        <AppContent {...props} />
        <AppStatusBar />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
