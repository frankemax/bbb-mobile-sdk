import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import { View } from 'react-native';
import Colors from '../../../constants/colors';

const ContainerPressable = styled(TouchableRipple)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Colors.blueGray};
  border-radius: 12px;
  padding: 12px;
  width: 100%;
  gap: 12px;
`;

const HeadphoneIcon = styled(MaterialIcons)`
  padding: 4px;
`;

const HeadphoneIconContainer = ({ isActive }) => (
  <View style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  }}
  >
    <HeadphoneIcon name={isActive ? 'headset-off' : 'headset'} size={24} color={Colors.white} />
  </View>
);

const HeadphoneText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${Colors.white}
  flex: 1;
`;

export default {
  HeadphoneIcon,
  HeadphoneText,
  ContainerPressable,
  HeadphoneIconContainer
};
