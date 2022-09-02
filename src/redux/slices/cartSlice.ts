import { createSlice } from '@reduxjs/toolkit'
import { Item } from '../../types/types'


interface CartState {
  totalItems: number,
  totalPrice: number,
  totalPizzas: number,
  items: Array<Item>

}

const initialState: CartState = {
  totalItems: 0,
  totalPrice: 0,
  totalPizzas: 0,
  items: [],

}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      if (state.items === [] || !state.items.find(el => el.id === action.payload.id
        && el.size == action.payload.size
        && el.type == action.payload.type)) {
        state.items.push({ ...action.payload, itemCount: 1 })
        state.totalItems = state.totalItems + 1
        state.totalPrice = state.totalPrice + action.payload.price
        state.totalPizzas = state.totalPizzas + 1
      } else {
        state.items.map(el => {
          if (el.id === action.payload.id) {
            el.itemCount = el.itemCount + 1
          }
        })
        state.totalPrice = state.totalPrice + action.payload.price
        state.totalPizzas = state.totalPizzas + 1
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(el => el.id !== action.payload.id)

      state.totalPizzas = state.totalPizzas - action.payload.itemCount
      state.totalItems = state.totalItems - 1

      /*временно*/
      state.totalPrice = state.totalPrice - action.payload.price * action.payload.itemCount
    },
    clearAllItems(state) {
      state.items = []
      state.totalPrice = 0
      state.totalItems = 0
      state.totalPizzas = 0
    },
    itemCountIncrement(state, action) {
      state.items.map(el => {
        if (el.id === action.payload.id
          && el.size == action.payload.size
          && el.type == action.payload.type) {
          el.itemCount = el.itemCount + 1
          state.totalPrice = state.totalPrice + action.payload.price
          state.totalPizzas = state.totalPizzas + 1
        }
      })

    },
    itemCountDecrement(state, action) {
      state.items.map(el => {
        if (el.id === action.payload.id && el.itemCount > 1) {
          el.itemCount = el.itemCount - 1
          state.totalPrice = state.totalPrice - action.payload.price
          state.totalPizzas = state.totalPizzas - 1
        }
      })

    },

  },
})

export const {
  addItem, removeItem, clearAllItems,
  itemCountIncrement, itemCountDecrement,
} = cartSlice.actions

export default cartSlice.reducer