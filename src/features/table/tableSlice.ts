import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

import { Datum } from '../../types/Order'

export interface TableState {
  orders: Datum[]
  filterOrders: Datum[]
}

export const initialState: TableState = {
  orders: [],
  filterOrders: [],
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    filterOrders: (state, action: PayloadAction<string>) => {
      if (action.payload === '') {
        state.filterOrders = state.orders
        return
      }

      state.filterOrders = state.orders.filter(
        (order) => order.vendorName === action.payload
      )
    },
    updateOrders: (state, action: PayloadAction<TableState['orders']>) => {
      state.orders = action.payload
      state.filterOrders = action.payload
    },
  },
})

export const { filterOrders, updateOrders } = tableSlice.actions

export const columHeaders = ['Status', 'Delivery Day', 'Supplier', 'Total']

// The function below is called a selector and allows us to select a orders from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.table.orders)`
export const selectOrders = (state: RootState) => state.table

export default tableSlice.reducer
