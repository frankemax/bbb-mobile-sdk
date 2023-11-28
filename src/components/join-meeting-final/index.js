import { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { View } from 'react-native';

const JoinMeetingFinal = (props) => {
  const { userAuthToken } = props;

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
    handleDispatchUserJoin();
  }, []);

  return <View />;
};

export default JoinMeetingFinal;
