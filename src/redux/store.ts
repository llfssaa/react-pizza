import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import searchSlice from './slices/searchSlice'
import cartSlice from './slices/cartSlice'
import pizzasSlice from './slices/pizzasSlice'


export const store = configureStore({
  reducer: {
    filterSlice,
    searchSlice,
    cartSlice,
    pizzasSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

