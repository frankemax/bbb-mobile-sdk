import styled from 'styled-components/native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { SafeAreaView } from 'react-native';
import presentation from '../../intermediary-components/presentation';
import videoList from '../../intermediary-components/videoList';
import actionsBar from '../../intermediary-components/actionsBar';
import chat from '../../intermediary-components/chat';
import chatBottomSheet from '../../intermediary-components/chat/bottom-sheet-chat';
import iconButton from '../../components/IconButton';

const ContainerView = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;

  ${({ orientation }) =>
    orientation === 'LANDSCAPE' &&
    `
    flex-direction: row;
    justify-content: center;
  `}
`;

const ActionsBarContainer = styled.View`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ orientation }) =>
    orientation === 'LANDSCAPE' &&
    `
      width: 10%;
      height: 100%;
  `}
`;

const ChatContainer = styled.View`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: flex-start;
`;

const VideoListContainer = styled.View`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: flex-start;
  ${({ orientation }) =>
    orientation === 'LANDSCAPE' &&
    `
      width: 100%;
      height: 100%;
  `}
`;

const PresentationContainer = styled.View`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: flex-start;

  ${({ orientation }) =>
    orientation === 'LANDSCAPE' &&
    `
      width: 90%;
      height: 100%;
  `}
`;

const ChatBottomSheetContainer = styled.View`
  padding: 24px;
`;

const ActionsBar = styled(actionsBar)`
  ${({ orientation }) =>
    orientation === 'LANDSCAPE' &&
    `
      flex-direction: column;
      display: flex;
  `}
`;
const VideoList = styled(videoList)`
  ${({ orientation }) =>
    orientation === 'LANDSCAPE' &&
    `
      height: 100%;
      display: flex;
      align-items: center;
  `}
`;
const Chat = styled(chat)``;
const ChatBottomSheet = styled(chatBottomSheet)``;
const Presentation = styled(presentation)``;
const SwitchLayoutButton = styled(iconButton)`
  position: absolute;
  opacity: 0.7;
`;

// skeleton loading animations
const renderSkeletonLoading = () => {
  return (
    <SafeAreaView>
      <ContainerView>
        <VideoListContainer>
          <VideoListLoading />
        </VideoListContainer>

        <PresentationContainer>
          <PresentationLoading />
        </PresentationContainer>

        <ChatContainer>
          <ChatLoading />
        </ChatContainer>

        <ActionsBarContainer>
          <ActionsBarLoading />
        </ActionsBarContainer>
      </ContainerView>
    </SafeAreaView>
  );
};

const ActionsBarLoading = () => (
  <ContentLoader
    speed={1}
    width="100%"
    height="100%"
    viewBox="0 0 530 100"
    backgroundColor="#6e6e6e"
    foregroundColor="#505050"
  >
    <Circle cx="55" cy="53" r="40" />
    <Circle cx="155" cy="53" r="40" />
    <Circle cx="255" cy="53" r="40" />
    <Circle cx="355" cy="53" r="40" />
    <Circle cx="455" cy="53" r="40" />
  </ContentLoader>
);

const VideoListLoading = () => (
  <ContentLoader
    speed={1}
    width="100%"
    height="100%"
    viewBox="0 0 310 100"
    backgroundColor="#6e6e6e"
    foregroundColor="#505050"
  >
    <Rect x="10" y="5" rx="3" ry="3" width="90" height="90" />
    <Rect x="110" y="5" rx="3" ry="3" width="90" height="90" />
    <Rect x="210" y="5" rx="3" ry="3" width="90" height="90" />
  </ContentLoader>
);

const PresentationLoading = () => (
  <ContentLoader
    speed={1}
    width="100%"
    height="100%"
    viewBox="0 0 160 90"
    backgroundColor="#6e6e6e"
    foregroundColor="#505050"
  >
    <Rect x="0" y="0" rx="3" ry="3" width="160" height="90" />
  </ContentLoader>
);

const ChatLoading = () => (
  <ContentLoader
    speed={1}
    width="100%"
    height="100%"
    viewBox="0 0 350 160"
    backgroundColor="#6e6e6e"
    foregroundColor="#505050"
  >
    <Rect x="10" y="10" rx="3" ry="3" width="52" height="5" />
    <Rect x="10" y="20" rx="3" ry="3" width="238" height="30" />
    <Rect x="10" y="60" rx="3" ry="3" width="150" height="5" />
    <Rect x="11" y="70" rx="3" ry="3" width="321" height="30" />
    <Rect x="10" y="110" rx="3" ry="3" width="100" height="5" />
    <Rect x="10" y="120" rx="3" ry="3" width="150" height="30" />
  </ContentLoader>
);

export default {
  ContainerView,
  Presentation,
  ActionsBar,
  ActionsBarContainer,
  VideoList,
  Chat,
  ChatContainer,
  ChatBottomSheet,
  ChatBottomSheetContainer,
  VideoListContainer,
  PresentationContainer,
  SwitchLayoutButton,
  // skeleton loading
  renderSkeletonLoading,
  VideoListLoading,
  PresentationLoading,
  ChatLoading,
  ActionsBarLoading,
};
