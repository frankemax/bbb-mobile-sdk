import React from 'react';
import { Modal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useOrientation } from '../../../hooks/use-orientation';
import { hide } from '../../../store/redux/slices/wide-app/modal';
import AudioManager from '../../../services/webrtc/audio-manager';
import VideoManager from '../../../services/webrtc/video-manager';
import Styled from './styles';

const BreakoutInviteModal = () => {
  const modalCollection = useSelector((state) => state.modal);

  const navigation = useNavigation();
  const orientation = useOrientation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const joinSession = (breakoutRoomJoinUrl) => {
    // AudioManager.exitAudio();
    // VideoManager.unpublish(localCameraId);
    navigation.navigate('InsideBreakoutRoomScreen', { joinUrl: breakoutRoomJoinUrl });
  };

  // *** RENDER FUNCTIONS *** //

  const renderNavigateToBreakoutListScreen = () => (
    <Styled.Container orientation={orientation}>
      <Styled.TitleModal>
        {t('mobileSdk.breakout.inviteModal.title')}
      </Styled.TitleModal>
      <Styled.TitleDesc>
        {`${t('mobileSdk.breakout.inviteModal.moderatorContent')} `}
      </Styled.TitleDesc>
      <Styled.JoinBreakoutButton
        onPress={() => {
          navigation.navigate('BreakoutRoomScreen');
          dispatch(hide());
        }}
      >
        {t('mobileSdk.breakout.inviteModal.moderatorButton')}
      </Styled.JoinBreakoutButton>
    </Styled.Container>
  );

  const renderNavigateToInsideBreakout = () => (
    <Styled.Container>
      <Styled.TitleModal>
        {t('mobileSdk.breakout.inviteModal.title')}
      </Styled.TitleModal>
      <Styled.TitleDesc>
        {`${t('mobileSdk.breakout.inviteModal.content')} `}
        <Styled.RoomName>
          {modalCollection.extraInfo.shortName}
        </Styled.RoomName>
      </Styled.TitleDesc>
      <Styled.JoinBreakoutButton
        onPress={() => {
          joinSession(modalCollection.extraInfo.joinURL);
          dispatch(hide());
        }}
      >
        {t('mobileSdk.breakout.inviteModal.button')}
      </Styled.JoinBreakoutButton>
    </Styled.Container>
  );

  return (
    <Modal
      visible={modalCollection.isShow}
      onDismiss={() => dispatch(hide())}
    >
      {modalCollection.extraInfo.freeJoinOrModerator
        ? renderNavigateToBreakoutListScreen()
        : renderNavigateToInsideBreakout()}
    </Modal>
  );
};

export default BreakoutInviteModal;
