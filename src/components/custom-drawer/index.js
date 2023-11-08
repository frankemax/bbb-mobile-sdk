import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Share } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Colors from '../../constants/colors';
import { selectCurrentUser } from '../../store/redux/slices/current-user';
import Styled from './styles';
import logger from '../../services/api';
import * as api from '../../services/api';
import { leave } from '../../store/redux/slices/wide-app/client';

const CustomDrawer = (props) => {
  const { meetingUrl } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentUserObj = useSelector(selectCurrentUser);
  const isBreakout = useSelector((state) => state.client.meetingData.isBreakout);

  const leaveSession = () => {
    dispatch(leave(api));
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

  return (
    <Styled.ViewContainer>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.blue }}
      >
        <Styled.CustomDrawerContainer>
          <Styled.UserAvatar
            userName={currentUserObj?.name}
            userRole={currentUserObj?.role}
            userColor={currentUserObj?.color}
            userImage={currentUserObj?.avatar}
            presenter={currentUserObj?.presenter}
          />
          <Styled.NameUserAvatar numberOfLines={1}>{currentUserObj?.name}</Styled.NameUserAvatar>
        </Styled.CustomDrawerContainer>
        <Styled.ContainerDrawerItemList>
          <DrawerItemList {...props} />
        </Styled.ContainerDrawerItemList>
      </DrawerContentScrollView>
      <Styled.ContainerCustomBottomButtons>
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
