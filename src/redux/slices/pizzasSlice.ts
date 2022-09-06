import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Item, SearchPizzaParams } from '../../types/types'

import axios from 'axios'


export const fetchPizzas = createAsyncThunk<Item[], SearchPizzaParams>(
  'pizzas/fetchPizzas',
  async ({ sortBy, category, search, page }) => {
    const res = await axios.get('https://62fccc276e617f88de9e4d1a.mockapi.io/items',
      category > 0 ?
        {
          params: { category, sortBy, search: search },
        } :
        {
          params: { sortBy, search, page, limit: 5 },
        },
    )
    return res.data
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
    setItems(state, action) {
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