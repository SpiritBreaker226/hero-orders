import React from 'react'
import { render } from '@testing-library/react'

import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'

import SearchWithVendorName from './SearchWithVendorName'
import reducer, { initialState } from './searchWithVendorNameSlice'

describe('SearchWithVendorName', () => {
  it('should render as expeected', () => {
    const mockStore = createStore(reducer, {
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
      fetch: {
        isLoading: false,
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
