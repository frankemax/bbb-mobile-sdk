import React from 'react';
import * as Linking from 'expo-linking';
import { View, Text } from 'react-native';
import Settings from '../../../settings.json';
import SocketConnection from '../../components/socket-connection';
import logger from '../../services/logger';
import Styled from './styles';

const TestComponentsScreen = (props) => {
  const { jUrl } = props;
  const url = Linking.useURL();

  return (
    <View>
      <Styled.ContainerView>
        <Text>
          URL:
          {url}
        </Text>
      </Styled.ContainerView>
    </View>
  );
};

export default TestComponentsScreen;
