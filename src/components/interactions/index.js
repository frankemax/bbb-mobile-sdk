import React from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription, useMutation } from '@apollo/client';
import { hideNotification, setProfile } from '../../store/redux/slices/wide-app/notification-bar';
import useCurrentUser from '../../graphql/hooks/useCurrentUser'
import Queries from './queries';
import Styled from './styles';

const InteractionsControls = () => {
  const { data: currentUserData } = useCurrentUser();
  const { data } = useSubscription(Queries.USER_CURRENT_RAISE_HAND_SUBSCRIPTION);
  const isHandRaised = data?.user_current[0].raiseHand;
  const currentUserId = currentUserData?.user_current[0].userId;
  const [setRaiseHand] = useMutation(Queries.SET_RAISE_HAND);
  const dispatch = useDispatch();

  const setRaideHands = (raiseHand) => {
    setRaiseHand({
      variables: {
        userId: currentUserId,
        raiseHand: !raiseHand,
      },
    });
  };

  const onPressButton = () => {
    setRaideHands(isHandRaised);
    if (!isHandRaised) {
      dispatch(setProfile({ profile: 'handsUp' }));
      return;
    }
    dispatch(hideNotification());
  };

  return (
    <Styled.RaiseHandButton
      isHandRaised={isHandRaised}
      onPress={onPressButton}
    />
  );
};

export default InteractionsControls;
