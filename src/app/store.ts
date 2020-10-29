import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import tableReducer from '../features/table/tableSlice'
import fetchDataReducer from '../features/fetch_data/fetchDataSlice'
import searchWithVendorNameDataReducer from '../features/search_with_vendor_name/searchWithVendorNameSlice'

export const store = configureStore({
  reducer: {
    table: tableReducer,
    fetch: fetchDataReducer,
    searchWithVendorName: searchWithVendorNameDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
