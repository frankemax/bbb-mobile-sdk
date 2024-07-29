import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useOrientation } from '../../hooks/use-orientation';
import useEndReason from '../../hooks/use-end-reason';
import Styled from './styles';

const EndSessionScreen = (props) => {
  const { onLeaveSession } = props;
  const { t } = useTranslation();
  const orientation = useOrientation();
  const navigation = useNavigation();
  const title = useEndReason();
  const subtitle = t('mobileSdk.endSession.subtitle');
  const leaveText = t('app.leaveModal.confirm');

  const handleLeaveSessionButtonPress = () => {
    if (!onLeaveSession) {
      return navigation.navigate('DrawerNavigator');
    }
  };

  return (
    <Styled.ContainerView>
      <Styled.Image
        source={require('../../assets/application/endSessionImage.png')}
        resizeMode="contain"
        orientation={orientation}
      />
      <Styled.Title>{title}</Styled.Title>
      <Styled.Subtitle>{subtitle}</Styled.Subtitle>
      <Styled.ButtonContainer>
        <Styled.ConfirmButton onPress={handleLeaveSessionButtonPress}>
          {leaveText}
        </Styled.ConfirmButton>
      </Styled.ButtonContainer>
    </Styled.ContainerView>
  );
};

export default EndSessionScreen;
