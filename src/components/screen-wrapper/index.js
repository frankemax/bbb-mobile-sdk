import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { trigDetailedInfo } from '../../store/redux/slices/wide-app/layout';
import BottomSheetChat from '../chat/bottom-sheet-chat';
import NotificationBar from '../notification-bar';
import BottomSheetActionsBar from '../actions-bar/bottom-sheet-actions-bar';
import ModalControllerComponent from '../modal';
import ChatPopupList from '../chat/chat-popup';

const ScreenWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  return (
    <>
      <Pressable onPress={() => dispatch(trigDetailedInfo())} style={{ flex: 1 }}>
        {children}
      </Pressable>
      <ModalControllerComponent />
      {/* This components keep mounted because react navigation does NOT unmount previous screens
      So, we will disable them from rendering when is not focused */}
      {isFocused && (
        <>
          <BottomSheetActionsBar />
          <NotificationBar />
          <BottomSheetChat />
          <ChatPopupList />
        </>
      )}
    </>
  );
};

export default ScreenWrapper;
