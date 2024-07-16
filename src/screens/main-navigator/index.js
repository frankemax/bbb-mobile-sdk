import { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../loading-screen';
import useJoinMeeting from '../../graphql/hooks/use-join-meeting';
import DrawerNavigator from '../../components/custom-drawer/drawer-navigator';
import UserJoinScreen from '../user-join-screen';
import GuestScreen from '../guest-screen';
import Styled from './styles';

// Screens

const MainNavigator = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const joinObject = useJoinMeeting();

  const {
    graphqlUrlApolloClient,
    sessionToken,
    loginStage,
    clientStartupSettings,
    clientSettings
  } = joinObject;

  useEffect(() => {
    if (loginStage === 6) {
      navigation.reset({
        index: 1,
        routes: [{ name: 'UserJoinScreen' }]
      });
    }
  }, [loginStage]);

  if (loginStage <= 5) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <ApolloProvider client={graphqlUrlApolloClient}>
      <Stack.Navigator
        screenOptions={Styled.ScreenOptions}
      >
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{
            title: 'Loading Screen',
          }}
        />
        <Stack.Screen
          name="UserJoinScreen"
          component={UserJoinScreen}
          options={{
            title: 'UserJoinScreen',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GuestScreen"
          component={GuestScreen}
          options={{
            title: 'GuestScreen',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DrawerNavigator"
        >
          {() => (
            <DrawerNavigator
              navigationRef="test"
              jUrl="test"
              onLeaveSession={() => console.log('leave')}
              meetingUrl="test"
            />
          )}
        </Stack.Screen>
        {/* <GuestScreen />
      <EndNavigator />
      <TransferScreen /> */}
      </Stack.Navigator>
    </ApolloProvider>
  );
};

export default MainNavigator;