import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

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

export const {
  updateLoading,
  updateErrorMessageFromServer,
} = fetchDataSlice.actions

export const selectFetch = (state: RootState) => state.fetch

export default fetchDataSlice.reducer
