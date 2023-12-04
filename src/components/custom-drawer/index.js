import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Share } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { gql, useQuery, useSubscription } from '@apollo/client';
import Colors from '../../constants/colors';
import { selectCurrentUser } from '../../store/redux/slices/current-user';
import { setProfile } from '../../store/redux/slices/wide-app/modal';
import Styled from './styles';
import logger from '../../services/api';
import * as api from '../../services/api';
import { leave } from '../../store/redux/slices/wide-app/client';

const CustomDrawer = (props) => {
  const { meetingUrl, navigation } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentUserObj = useSelector(selectCurrentUser);
  const isBreakout = useSelector((state) => state.client.meetingData.isBreakout);

  const { loading, error, data } = useSubscription(
    gql`subscription {
      user_current {
        userId
        name
        role
        color
        avatar
        presenter
      }
    }`
  );

  const leaveSession = () => {
    dispatch(leave(api));
  };

  const onClickFeatureNotImplemented = () => {
    dispatch(setProfile({ profile: 'not_implemented' }));
    navigation.closeDrawer();
  };

  const onClickShare = async () => {
    try {
      const result = await Share.share({
        message: meetingUrl || 'https://bigbluebutton.org/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      logger.error({
        logCode: 'error_sharing_link',
        extraInfo: { error },
      }, `Exception thrown while clicking to share meeting_url: ${error}`);
    }
  };

  const renderNotImplementedItem = () => (
    <>
      <DrawerItem
        label={t('mobileSdk.whiteboard.label')}
        labelStyle={Styled.TextButtonLabel}
        style={{ opacity: 0.3 }}
        onPress={onClickFeatureNotImplemented}
        inactiveTintColor={Colors.lightGray400}
        inactiveBackgroundColor={Colors.lightGray100}
        icon={() => (
          <Styled.DrawerIcon name="brush" size={24} color="#1C1B1F" />
        )}
      />
      <DrawerItem
        label={t('app.notes.title')}
        labelStyle={Styled.TextButtonLabel}
        style={{ opacity: 0.3 }}
        onPress={onClickFeatureNotImplemented}
        inactiveTintColor={Colors.lightGray400}
        inactiveBackgroundColor={Colors.lightGray100}
        icon={() => (
          <Styled.DrawerIcon name="notes" size={24} color="#1C1B1F" />
        )}
      />
      <DrawerItem
        label={t('app.actionsBar.actionsDropdown.streamOptions')}
        labelStyle={Styled.TextButtonLabel}
        style={{ opacity: 0.3 }}
        onPress={onClickFeatureNotImplemented}
        inactiveTintColor={Colors.lightGray400}
        inactiveBackgroundColor={Colors.lightGray100}
        icon={() => (
          <Styled.DrawerIcon name="connected-tv" size={24} color="#1C1B1F" />
        )}
      />
    </>
  );

  console.log('custom_drawer');

  return (
    <Styled.ViewContainer>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.blue }}
      >
        <Styled.CustomDrawerContainer>
          <Styled.UserAvatar
            userName={data?.user_current[0]?.name}
            userRole={data?.user_current[0]?.role}
            userColor={data?.user_current[0]?.color}
            userImage={data?.user_current[0]?.avatar}
            presenter={data?.user_current[0]?.presenter}
          />
          <Styled.NameUserAvatar numberOfLines={1}>
            {data?.user_current[0]?.name}
          </Styled.NameUserAvatar>
        </Styled.CustomDrawerContainer>
        <Styled.ContainerDrawerItemList>
          <DrawerItemList {...props} />
          {renderNotImplementedItem()}
        </Styled.ContainerDrawerItemList>
      </DrawerContentScrollView>
      <Styled.ContainerCustomBottomButtons>

        {/* DEFAULT ITEMS */}
        {!isBreakout && (
        <DrawerItem
          label={t('mobileSdk.drawer.shareButtonLabel')}
          labelStyle={Styled.TextButtonLabel}
          onPress={onClickShare}
          inactiveTintColor={Colors.lightGray400}
          inactiveBackgroundColor={Colors.lightGray100}
          icon={() => <Styled.DrawerIcon name="share" size={24} color="#1C1B1F" />}
        />
        )}
        <DrawerItem
          label={isBreakout ? t('mobileSdk.breakout.leave') : t('app.navBar.settingsDropdown.leaveSessionLabel')}
          labelStyle={Styled.TextButtonLabel}
          onPress={leaveSession}
          inactiveTintColor={Colors.lightGray400}
          inactiveBackgroundColor={Colors.lightGray100}
          icon={() => <Styled.DrawerIcon name="logout" size={24} color="#1C1B1F" />}
        />
      </Styled.ContainerCustomBottomButtons>
    </Styled.ViewContainer>
  );
};

export default CustomDrawer;
