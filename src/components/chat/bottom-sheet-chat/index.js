import {
  useCallback, useRef, useMemo, useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';
import { Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import {
  gql, useQuery, useMutation, useSubscription
} from '@apollo/client';
import { useBottomSheetBackHandler } from '../../../hooks/useBottomSheetBackHandler';
import { setHasUnreadMessages, setBottomChatOpen } from '../../../store/redux/slices/wide-app/chat';
import UserAvatar from '../../user-avatar';
import IconButtonComponent from '../../icon-button';
import { useChatMsgs } from '../../../hooks/selectors/chat/use-chat-msgs';
import ChatService from '../service';
import Colors from '../../../constants/colors';
import Styled from './styles';

const BottomSheetChat = () => {
  // const messages = useChatMsgs();
  const height = useHeaderHeight();
  const { t } = useTranslation();

  const sheetRef = useRef(null);
  const flatListRef = useRef(null);
  const [messageText, setMessageText] = useState('');
  const dispatch = useDispatch();
  const chatStore = useSelector((state) => state.chat);

  const { loading, error, data } = useSubscription(
    gql`subscription {
      chat_message_public {
        message
        senderName
        senderRole
        senderId
        createdAt
      }
    }`
  );

  const [sendGroupChatMsg] = useMutation(gql`
  mutation sendGroupChatMsg($chatId: String!, $chatMessageInMarkdownFormat: String!) {
    sendGroupChatMsg(
      chatId: $chatId,
      chatMessageInMarkdownFormat: $chatMessageInMarkdownFormat,
    )}
  `);

  const { loading1, error1, data1 } = useQuery(
    gql`query {
        user_current {
          userId
          name
        }
      }`
  );

  const handleMessageSend = () => {
    console.log('messageSend', messageText);
    sendGroupChatMsg({
      variables: {
        chatId: 'MAIN-PUBLIC-GROUP-CHAT',
        chatMessageInMarkdownFormat: messageText,
      },
    });
  };

  const snapPoints = useMemo(() => ['95%'], []);

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      dispatch(setBottomChatOpen(false));
      dispatch(setHasUnreadMessages(false));
    }
  }, []);

  useBottomSheetBackHandler(chatStore.isBottomChatOpen, sheetRef, () => {});

  const handleMessage = (message) => {
    if ((/^https?:/.test(message))) {
      return (
        <Styled.LinkPreviewCustom
          text={message}
          containerStyle={Styled.linkPreviewContainerStyle}
          metadataContainerStyle={Styled.metadataContainerStyle}
          enableAnimation
        />
      );
    }
    return <Styled.MessageContent>{message}</Styled.MessageContent>;
  };

  const renderItem = ({ item }) => {
    const timestamp = new Date(item.createdAt);
    return (
      <Pressable>
        <Styled.ContainerItem>
          <UserAvatar
            userName={item.senderName}
            userRole={item.senderRole}
            userId={item.senderId}
          />
          <Styled.Card>
            <Styled.MessageTopContainer>
              <Styled.MessageAuthor>{item.senderName}</Styled.MessageAuthor>
              <Styled.MessageTimestamp>
                {`${String(timestamp.getHours()).padStart(2, '0')}:${String(
                  timestamp.getMinutes()
                ).padStart(2, '0')}`}
              </Styled.MessageTimestamp>
            </Styled.MessageTopContainer>
            {handleMessage(item.message)}
          </Styled.Card>
        </Styled.ContainerItem>
      </Pressable>
    );
  };

  const renderEmptyChatHandler = () => {
    if (data?.chat_message_public.length !== 0) {
      return null;
    }
    return <Styled.NoMessageText>{t('mobileSdk.chat.isEmptyLabel')}</Styled.NoMessageText>;
  };

  if (!chatStore.isBottomChatOpen) {
    return null;
  }

  return (
    <Styled.Container>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
      >
        {renderEmptyChatHandler()}
        <BottomSheetFlatList
          ref={flatListRef}
          data={data?.chat_message_public}
          renderItem={renderItem}
          onContentSizeChange={() => {
            if (data?.chat_message_public.length > 0) {
              flatListRef.current.scrollToEnd({ animated: true });
            }
          }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={height + 47}
          enabled
        >
          <Styled.SendMessageContainer>
            <Styled.TextInput
              label={t('app.chat.submitLabel')}
              onChangeText={(newText) => setMessageText(newText)}
              multiline
              value={messageText}
            />
            <IconButtonComponent
              icon="send"
              iconColor={Colors.white}
              containerColor={Colors.blue}
              animated
              onPress={() => {
                handleMessageSend();
                setMessageText('');
              }}
            />
          </Styled.SendMessageContainer>
        </KeyboardAvoidingView>
      </BottomSheet>
    </Styled.Container>
  );
};

export default BottomSheetChat;
