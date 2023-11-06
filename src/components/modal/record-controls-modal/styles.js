import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import Colors from '../../../constants/colors';
import button from '../../button';

const ModalContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

const ModalTop = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalBottom = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const CloseButton = styled(Icon)`
  padding: 0px;
  margin: 0px;
`;

const ConfirmButton = styled(button)`
  background-color: ${Colors.orange};
  color: ${Colors.white};
  font-size: 18px;
  font-weight: 500;
  padding: 12px;
  border-radius: 40px;
`;

const ConfirmButtonIcon = styled(Icon)`
  padding: 0px;
  margin: 0px;
`;

const CloseButtonText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

const ModalContent = styled(View)`
  background-color: white;
  border-radius: 10px;
  padding: 24px;
  width: 95%;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 500;
`;

const Description = styled(Text)`
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 400;
  color: ${Colors.lightGray300};
  padding-top: 16px;
`;

const ButtonContainer = styled(View)`
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled(TouchableOpacity)`
  margin-left: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.orange};
  padding: 8px 24px;
  gap: 8px;
  border-radius: 40px;
`;

const ButtonText = styled(Text)`
  color: white;
  font-weight: 18px;
  font-weight: 500;
`;

const CancelButton = styled(TouchableOpacity)`
  padding: 12px;
  border-radius: 40px;
`;

const CancelText = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  color: ${Colors.lightGray300};
`;

const TimeText = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: ${Colors.lightGray400};
  font-weight: 500;
  padding-top: 24px;
  padding-bottom: 4px;
`;

const Divider = styled(View)`
  width: 120px;
  border-top-width: 1px;
  border-color: ${Colors.lightGray200};
`;

const DividerContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default {
  ModalContainer,
  ModalTop,
  ModalBottom,
  CloseButton,
  CloseButtonText,
  ConfirmButton,
  ConfirmButtonIcon,
  ModalContent,
  Title,
  Description,
  ButtonContainer,
  Button,
  ButtonText,
  CancelButton,
  CancelText,
  TimeText,
  Divider,
  DividerContainer
};
