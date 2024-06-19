import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isBottomChatOpen: false,
  isFastChatOpen: true,
  hasUnreadMessages: false,
  hasShownInFastChat: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setBottomChatOpen: (state, action) => {
      state.isBottomChatOpen = action.payload;
    },
    setHasUnreadMessages: (state, action) => {
      state.hasUnreadMessages = action.payload;
    },
    setHasShownInFastChat: (state, action) => {
      state.hasShownInFastChat = action.payload;
    }
  },
});

export const {
  setBottomChatOpen,
  setHasUnreadMessages,
  setHasShownInFastChat
} = chatSlice.actions;

export default chatSlice.reducer;
