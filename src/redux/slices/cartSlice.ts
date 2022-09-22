import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item, LS } from '../../types/types'


interface CartState {
  totalItems: number,
  totalPrice: number,
  totalPizzas: number,
  items: Array<Item>

}


const initialState: CartState = {
  totalItems: localStorage[LS.TotalItems] ? JSON.parse(localStorage[LS.TotalItems]) : 0,
  totalPrice: localStorage[LS.TotalPrice] ? JSON.parse(localStorage[LS.TotalPrice]) : 0,
  totalPizzas: localStorage[LS.TotalPizzas] ? JSON.parse(localStorage[LS.TotalPizzas]) : 0,
  items: localStorage[LS.Cart] ? JSON.parse(localStorage[LS.Cart]) : [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
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
      localStorage[LS.TotalPizzas] = JSON.stringify(state.totalPizzas)
    },
    removeItem(state, action: PayloadAction<Item>) {
      state.items = state.items.filter(el => el.id !== action.payload.id)

      state.totalPizzas = state.totalPizzas - action.payload.itemCount
      state.totalItems = state.totalItems - 1

      /*временно*/
      state.totalPrice = state.totalPrice - action.payload.price * action.payload.itemCount

      localStorage[LS.TotalPizzas] = JSON.stringify(state.totalPizzas)
    },
    clearAllItems(state) {
      state.items = []
      state.totalPrice = 0
      state.totalItems = 0
      state.totalPizzas = 0

      localStorage[LS.TotalPizzas] = JSON.stringify(state.totalPizzas)
    },
    itemCountIncrement(state, action: PayloadAction<Item>) {
      state.items.map(el => {
        if (el.id === action.payload.id
          && el.size == action.payload.size
          && el.type == action.payload.type) {
          el.itemCount = el.itemCount + 1
          state.totalPrice = state.totalPrice + action.payload.price
          state.totalPizzas = state.totalPizzas + 1
        }
      })
      localStorage[LS.TotalPizzas] = JSON.stringify(state.totalPizzas)
    },
    itemCountDecrement(state, action: PayloadAction<Item>) {
      state.items.map(el => {
        if (el.id === action.payload.id
          && el.size == action.payload.size
          && el.type == action.payload.type) {

          el.itemCount = el.itemCount - 1
          state.totalPrice = state.totalPrice - action.payload.price
          state.totalPizzas = state.totalPizzas - 1
        }
      })
      localStorage[LS.TotalPizzas] = JSON.stringify(state.totalPizzas)
    },

  },
})

export const {
  addItem, removeItem, clearAllItems,
  itemCountIncrement, itemCountDecrement,
} = cartSlice.actions

export default cartSlice.reducer