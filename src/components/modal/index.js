import React from 'react';
import { useSelector } from 'react-redux';
import BreakoutInviteModal from '../../screens/breakout-room-screen/breakout-invite-modal';
import CantCreatePollModal from '../../screens/poll-screen/modals/cant-create-poll';
import RecordControlsModal from '../record/modals/record-controls-modal';
import RecordStatusModal from '../record/modals/record-status-modal';
import ReceivePollModal from '../../screens/poll-screen/modals/receive-poll';
import PublishedPollModal from '../../screens/poll-screen/modals/published-poll';
import AudioDeviceSelectorModal from '../actions-bar/audio-device-selector-control/audio-device-selector-modal';
import NotImplementedModal from './not-implemented';
import Settings from '../../../settings.json';

const ModalControllerComponent = () => {
  const modalCollection = useSelector((state) => state.modal);

  if (modalCollection.profile === 'breakout_invite' && Settings.showBreakouts) {
    return (
      <BreakoutInviteModal />
    );
  }
  if (modalCollection.profile === 'audio_device_selector') {
    return (
      <AudioDeviceSelectorModal />
    );
  }
  if (modalCollection.profile === 'not_implemented') {
    return (
      <NotImplementedModal />
    );
  }
  if (modalCollection.profile === 'create_poll_permission') {
    return (
      <CantCreatePollModal />
    );
  }
  if (modalCollection.profile === 'receive_poll') {
    return (
      <ReceivePollModal />
    );
  }
  if (modalCollection.profile === 'poll_published') {
    return (
      <PublishedPollModal />
    );
  }
  if (modalCollection.profile === 'record_controls') {
    return (
      <RecordControlsModal />
    );
  }
  if (modalCollection.profile === 'record_status') {
    return (
      <RecordStatusModal />
    );
  }

  return null;
};

export default ModalControllerComponent;
