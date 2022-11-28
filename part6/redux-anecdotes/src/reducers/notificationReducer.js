import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setVoteNotification(state, action) {
      return `You voted for: "${action.payload}"`
    },
    setNewNotification(state, action) {
      return `You created the anecdote: "${action.payload}"`
    },
    resetNotification(state, action) {
      return null;
    },
  }
})


export const { setVoteNotification, setNewNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer