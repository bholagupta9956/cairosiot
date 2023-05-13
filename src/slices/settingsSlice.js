import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    reloadTime:  20 * 1000,
  },
  reducers: {
    setReloadTime: (state, action) => {
      state.reloadTime = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setReloadTime } = settingsSlice.actions

export default settingsSlice.reducer