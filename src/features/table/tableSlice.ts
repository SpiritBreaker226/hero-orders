import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

import { Datum } from '../../types/Order'

export interface TableState {
  orders: Datum[]
}

export const initialState: TableState = {
  orders: [],
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    updateOrders: (state, action: PayloadAction<TableState>) => {
      state.orders = action.payload.orders
    },
  },
})

export const { updateOrders } = tableSlice.actions

export const columHeaders = [
  'Status',
  'Delivery Day',
  'Supplier (or Vendor)',
  'Total',
]

// The function below is called a selector and allows us to select a orders from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.table.orders)`
export const selectOrders = (state: RootState) => state.table.orders

export default tableSlice.reducer
