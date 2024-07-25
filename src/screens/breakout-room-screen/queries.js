import { gql } from '@apollo/client';

const BREAKOUT_ROOM_SUBSCRIPTION = gql`
subscription breakoutRoom {
  breakoutRoom {
    assignedAt
    name
    joinURL
    hasJoined
    breakoutRoomId
    freeJoin
    shortName
    participants {
      user {
        name
      }
      userId
    }
  }
}
`;

const BREAKOUT_ROOM_REQUEST_JOIN_URL = gql`
  mutation BreakoutRoomRequestJoinUrl($breakoutRoomId: String!) {
    breakoutRoomRequestJoinUrl(breakoutRoomId: $breakoutRoomId)
  }
`;

const FIRST_BREAKOUT_DURATION_DATA_SUBSCRIPTION = gql`
  subscription firstBreakoutData {
    breakoutRoom(limit: 1) {
      durationInSeconds
      startedAt
    }
  }
`;

export {
  BREAKOUT_ROOM_SUBSCRIPTION,
  FIRST_BREAKOUT_DURATION_DATA_SUBSCRIPTION,
  BREAKOUT_ROOM_REQUEST_JOIN_URL
};
