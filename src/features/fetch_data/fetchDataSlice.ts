import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import { AppThunk, RootState } from '../../app/store'

import { Datum } from '../../types/Order'

import { resetVendorNames } from '../search_with_vendor_name/searchWithVendorNameSlice'
import { updateOrders } from '../table/tableSlice'

interface UpdateErrorMessageFromServerPayload {
  errorMessage: string
  isLoading: boolean
}

export interface FetchDataState extends UpdateErrorMessageFromServerPayload {
  urlEndpoint: string
}

export const initialState: FetchDataState = {
  urlEndpoint: process.env.REACT_APP_BASE_API_URL || '',
  errorMessage: '',
  isLoading: true,
}

export const fetchDataSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    updateErrorMessageFromServer: (
      state,
      action: PayloadAction<UpdateErrorMessageFromServerPayload>
    ) => {
      state.isLoading = action.payload.isLoading
      state.errorMessage = action.payload.errorMessage
    },
  },
})

export const fetchOrders = (urlEndpoint: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(updateLoading(true))

    const res = await axios.get(urlEndpoint)
    const orders: Datum[] = res.data.data
    const vendorNames = orders.map((order: Datum) => order.vendorName)

    dispatch(updateOrders(orders))

    dispatch(resetVendorNames(vendorNames))

    dispatch(updateLoading(false))
  } catch (error) {
    dispatch(
      updateErrorMessageFromServer({
        isLoading: false,
        errorMessage: error.message,
      })
    )
  }
}

export const {
  updateLoading,
  updateErrorMessageFromServer,
} = fetchDataSlice.actions

export const selectFetch = (state: RootState) => state.fetch

export default fetchDataSlice.reducer
