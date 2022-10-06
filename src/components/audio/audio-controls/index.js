import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../../constants/colors';
import IconButtonComponent from '../../icon-button';
import AudioManager from '../../../services/webrtc/audio-manager';

const AudioControls = (props) => {
  const { isLandscape } = props;
  const isMuted = useSelector((state) => state.audio.isMuted);
  const isConnected = useSelector((state) => state.audio.isConnected);
  const isConnecting = useSelector((state) => state.audio.isConnecting);

  return (
    <>
      {isConnected && <StatusBar backgroundColor="#00BF6F" style="light" />}
      {isConnecting && <StatusBar backgroundColor="#FFC845" style="dark" />}
      <IconButtonComponent
        size={isLandscape ? 24 : 32}
        icon={!isMuted ? 'microphone' : 'microphone-off'}
        iconColor={!isMuted ? Colors.white : Colors.lightGray300}
        containerColor={!isMuted ? Colors.blue : Colors.lightGray100}
        disabled={!isConnected}
        animated
        onPress={() => {
          if (isMuted) {
            AudioManager.unmute();
          } else {
            AudioManager.mute();
          }
        }}
      />
      <IconButtonComponent
        size={isLandscape ? 24 : 32}
        icon={isConnected ? 'headphones' : 'headphones-off'}
        iconColor={isConnected ? Colors.white : Colors.lightGray300}
        containerColor={isConnected ? Colors.blue : Colors.lightGray100}
        animated
        onPress={() => {
          if (isConnected) {
            AudioManager.exitAudio();
          } else {
            AudioManager.joinMicrophone();
          }
        }}
      />
    </>
  );
};

export default AudioControls;
