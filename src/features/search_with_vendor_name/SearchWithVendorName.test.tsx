import React from 'react'
import { render } from '@testing-library/react'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import SearchWithVendorName from './SearchWithVendorName'
import searchWithVendorNameDataReducer, {
  initialState,
} from './searchWithVendorNameSlice'

describe('SearchWithVendorName', () => {
  it('should render as expeected', () => {
    const mockStore = configureStore({
      reducer: {
        searchWithVendorName: searchWithVendorNameDataReducer,
      },
      preloadedState: {
        searchWithVendorName: {
          ...initialState,
          options: [
            {
              label: 'more',
              value: 'more',
            },
            {
              label: 'testing',
              value: 'testing',
            },
          ],
        },
      },
    })

    const { getAllByRole } = render(
      <Provider store={mockStore}>
        <SearchWithVendorName />
      </Provider>
    )

    expect(getAllByRole('option').length).toEqual(2)
  })
})
