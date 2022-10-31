import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Styled from './styles';
import IconButtonComponent from '../../icon-button';
import VideoManager from '../../../services/webrtc/video-manager';
import { setFocusedId, setIsFocused } from '../../../store/redux/slices/wide-app/layout';

const VideoContainer = (props) => {
  const {
    cameraId,
    userAvatar,
    userColor,
    userName,
    style,
    local,
  } = props;

  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const mediaStreamId = useSelector(
    (state) => state.video.videoStreams[cameraId]
  );
  const signalingTransportOpen = useSelector(
    (state) => state.video.signalingTransportOpen
  );

  useEffect(() => {
    if (signalingTransportOpen) {
      if (cameraId && !mediaStreamId && !local) {
        VideoManager.subscribe(cameraId);
      }
    }
  }, [cameraId, mediaStreamId, signalingTransportOpen]);

  const renderVideo = () => {
    if (typeof mediaStreamId === 'string') {
      return <Styled.VideoStream streamURL={mediaStreamId} />;
    }

    if (userAvatar && userAvatar.length !== 0) {
      return <Styled.UserAvatar source={{ uri: userAvatar }} />;
    }

    return <Styled.UserColor userColor={userColor} />;
  };

  return (
    <Styled.ContainerPressable
      style={style}
      onPress={() => setShowOptions((prevState) => !prevState)}
    >
      {renderVideo()}

      {!showOptions && (
        <Styled.NameLabelContainer>
          <Styled.NameLabel numberOfLines={1}>{userName}</Styled.NameLabel>
        </Styled.NameLabelContainer>
      )}

      {showOptions && (
        <Styled.PressableButton
          activeOpacity={0.6}
          onPress={() => {
            dispatch(setFocusedId(mediaStreamId));
            dispatch(setIsFocused(true));
          }}
        >
          <IconButtonComponent
            icon="fullscreen"
            iconColor="white"
            size={16}
            containerColor="#00000000"
          />
          <Styled.NameLabel numberOfLines={2} style={{ flexShrink: 1 }}>
            Focar usuário
          </Styled.NameLabel>
        </Styled.PressableButton>
      )}
    </Styled.ContainerPressable>
  );
};

export default VideoContainer;
