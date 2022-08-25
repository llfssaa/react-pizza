import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type Sort = {
  name: string,
  property: string
}

interface FilterState {
  categoryId: number,
  sort: Sort
}

const initialState: FilterState = {
  categoryId: 0,
  sort: { name: 'popularity', property: 'rating' },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSortItems(state, action) {
      state.sort = action.payload
    },
  },
})

export const { setCategoryId, setSortItems } = filterSlice.actions

export const selectFilter = (state: RootState) => state.filterSlice


export default filterSlice.reducer