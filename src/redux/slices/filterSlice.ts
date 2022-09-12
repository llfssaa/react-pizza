import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type Sort = {
  name: string,
  property: string
}

export interface FilterState {
  category: number,
  sort: Sort,
  page: number,
  search: string,
}

const initialState: FilterState = {
  category: 0,
  sort: { name: 'popularity', property: 'rating' },
  page: 1,
  search: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload
    },
    setSortItems(state, action) {
      state.sort = action.payload
    },
    setPageNumber(state, action) {
      state.page = action.payload
      console.log(action.payload)
    },
    setSearchText(state, action) {
      state.search = action.payload
    },
    deleteSearchText(state) {
      state.search = ''
    },
  },
})

export const { setCategory, setSortItems, setPageNumber, setSearchText, deleteSearchText } = filterSlice.actions

export const selectFilter = (state: RootState) => state.filterSlice


export default filterSlice.reducer