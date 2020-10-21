import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import fetchDataReducer from '../features/fetch_data/fetchDataSlice'

export const store = configureStore({
  reducer: {
    fetch: fetchDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
