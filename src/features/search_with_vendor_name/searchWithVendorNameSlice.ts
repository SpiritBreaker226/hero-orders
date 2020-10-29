import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk, RootState } from '../../app/store'
import { filterOrders } from '../table/tableSlice'

export const defaultOptions = [{ label: 'All Suppliers', value: '' }]

export type OptionType = { label: string; value: string }

export interface SearchWithVendorNameState {
  value: string
  options: OptionType[]
}

export const initialState: SearchWithVendorNameState = {
  value: defaultOptions[0].value,
  options: defaultOptions,
}

export const searchWithVendorNameSlice = createSlice({
  name: 'searchWithVendorName',
  initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    resetVendorNames: (state, action: PayloadAction<string[]>) => {
      const uniqueVendorNames = Array.from(new Set(action.payload))
      const options = uniqueVendorNames
        .sort((vendorNameA: string, vendorNameB: string) =>
          vendorNameA.localeCompare(vendorNameB)
        )
        .map((uniqueVendorName: string) => ({
          label: uniqueVendorName,
          value: uniqueVendorName,
        }))

      state.options = defaultOptions
      state.options.push(...options)
    },
  },
})

export const updateSearchWithVendorName = (searchValue: string): AppThunk => (
  dispatch
) => {
  dispatch(updateValue(searchValue))
  dispatch(filterOrders(searchValue))
}

export const {
  updateValue,
  resetVendorNames,
} = searchWithVendorNameSlice.actions

export const selectSearchWithVendorName = (state: RootState) =>
  state.searchWithVendorName

export default searchWithVendorNameSlice.reducer
