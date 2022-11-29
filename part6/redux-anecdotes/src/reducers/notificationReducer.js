import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return null;
    },
  }
})


export const { addNotification, resetNotification } = notificationSlice.actions

export const setNotification = (content, secs) => {
  return dispatch => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(resetNotification())
    }, secs * 1000)
  }
}

export default notificationSlice.reducer