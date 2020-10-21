import queryString from 'query-string'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

import { APIQuery } from '../../types/ApiQuery'

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
    updateURL: (state, action: PayloadAction<APIQuery>) => {
      const currentURL = queryString.parseUrl(state.urlEndpoint)
      const query = { ...currentURL.query, ...action.payload }
      const newUrl = queryString.stringifyUrl(
        {
          url: currentURL.url,
          query,
        },
        {
          skipEmptyString: true,
          skipNull: true,
        }
      )

      state.urlEndpoint = newUrl
    },
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
  updateURL,
  updateLoading,
  updateErrorMessageFromServer,
} = fetchDataSlice.actions

export const selectFetch = (state: RootState) => state.fetch

export default fetchDataSlice.reducer
