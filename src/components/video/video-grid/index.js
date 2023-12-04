import React, { useCallback, useState } from 'react';
import { FlatList, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useQuery, gql, useSubscription } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { selectSortedVideoUsers } from '../../../store/redux/slices/video-streams';
import Styled from './styles';

const DEVICE_HEIGHT = parseInt(Dimensions.get('window').height, 10);

const GridView = () => {

  const { loading, error, data } = useSubscription(
    gql`subscription {
      user {
        name
        color
        avatar
        userId
        role
      }
    }`
  );

  const contentAreaUserItem = {
    cameraId: 'ContentArea',
    contentArea: true,
  };

  const mescleGridItems = [contentAreaUserItem];
  if (data?.user) {
    mescleGridItems.push(...data.user);
  }
  const [numOfColumns, setNumOfColumns] = useState(1);

  useFocusEffect(
    useCallback(() => {
      setNumOfColumns(mescleGridItems.length > 2 ? 2 : 1);
    }, [mescleGridItems])
  );

  const renderItem = (videoUser) => {
    const { item: vuItem } = videoUser;
    const {
      cameraId,
      userId,
      userAvatar,
      color,
      name,
      local,
      visible,
      role,
      contentArea,
      userEmoji,
    } = vuItem;

    if (contentArea) {
      return (
        <Styled.Item usersCount={mescleGridItems.length} dimensionHeight={DEVICE_HEIGHT}>
          <Styled.ContentArea />
        </Styled.Item>
      );
    }

    return (
      <Styled.Item usersCount={mescleGridItems.length} dimensionHeight={DEVICE_HEIGHT}>
        <Styled.VideoListItem
          cameraId={cameraId}
          userId={userId}
          userAvatar={userAvatar}
          userColor={color}
          userName={name}
          local={local}
          visible={visible}
          isGrid
          usersCount={mescleGridItems.length}
          userRole={role}
          userEmoji={userEmoji}
        />
      </Styled.Item>
    );
  };

  return (
    <FlatList
      data={mescleGridItems}
      style={Styled.styles.container}
      renderItem={renderItem}
      numColumns={numOfColumns}
      initialNumToRender={2}
      key={numOfColumns}
      disableIntervalMomentum
    />
  );
};

export default GridView;
