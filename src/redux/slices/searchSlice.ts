import { createSlice } from '@reduxjs/toolkit'

interface searchState {
  text: string
}

const initialState: searchState = {
  text: '',
}

const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setText(state, action) {
      state.text = action.payload
    },
    deleteText(state) {
      state.text = ''
    },
  },
})

export const { setText, deleteText } = SearchSlice.actions

export default SearchSlice.reducer