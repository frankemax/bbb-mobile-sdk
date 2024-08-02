import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/client';
import { setProfile } from '../../store/redux/slices/wide-app/modal';
import useCurrentUser from '../../graphql/hooks/useCurrentUser';
import Queries from './queries';

const useModalListener = () => {
  const dispatch = useDispatch();

  // ? currentUser
  const { data: currentUserData } = useCurrentUser();
  const currentUser = currentUserData?.user_current[0];
  const currentUserId = currentUser?.userId;

  // ? breakouts
  const { data: breakoutInviteData } = useSubscription(Queries.BREAKOUT_INVITE_SUBSCRIPTION);
  const breakoutsData = breakoutInviteData?.breakoutRoom;
  const hasBreakouts = breakoutsData?.length > 0;

  // ? breakout_invite effect
  useEffect(() => {
    if (hasBreakouts && currentUserId) {
      dispatch(setProfile({
        profile: 'breakout_invite',
        extraInfo: {
          freeJoin: breakoutsData[0]?.freeJoin,
          shortName: breakoutsData[0]?.shortName,
          joinURL: breakoutsData[0]?.joinURL,
          amIModerator: currentUser?.isModerator
        }
      }));
    }
  }, [breakoutsData?.length, currentUserId]);

  return null;
};

export default useModalListener;
