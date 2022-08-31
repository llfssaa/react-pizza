import { createSlice } from '@reduxjs/toolkit'
import { Item } from '../../types/types'


interface CartState {
  totalItems: number,
  items: Array<Item>

}

const initialState: CartState = {
  totalItems: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload)
    },
  },
})

export const { addItem } = cartSlice.actions

export default cartSlice.reducer