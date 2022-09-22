import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Item, SearchPizzaParams } from '../../types/types'

import axios from 'axios'


export const fetchPizzas = createAsyncThunk<Item[], SearchPizzaParams>(
  'pizzas/fetchPizzas',
  async ({ sortBy, category, search, page }) => {
    const { data } = await axios.get('https://62fccc276e617f88de9e4d1a.mockapi.io/items',
      category > 0 ?
        {
          params: { category, sortBy, search: search },
        } :
        {
          params: { sortBy, search, page, limit: 8 },
        },
    )
    return data
  },
)


interface pizzasState {
  items: Array<Item>,
  status: string
}

const initialState: pizzasState = {
  items: [],
  status: 'LOADING',
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload
    },
  },


  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, ((state) => {
      state.status = 'LOADING'
      state.items = []
    }))
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'SUCCESS'
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'ERROR'
      state.items = []
    })
  },

})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer