import React from 'react'
import { render } from '@testing-library/react'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import orders from '../helpers/test_data_orders.json'

import fetchDataReducer from '../fetch_data/fetchDataSlice'

import Table from './Table'
import tableReducer, { initialState } from './tableSlice'

describe('Table', () => {
  it('should render as expeected', () => {
    const mockStore = configureStore({
      reducer: {
        table: tableReducer,
        fetch: fetchDataReducer,
      },
      preloadedState: {
        table: {
          ...initialState,
          filterOrders: orders.data,
        },
        fetch: {
          isLoading: false,
        },
      },
    })

    const { getAllByRole } = render(
      <Provider store={mockStore}>
        <Table />
      </Provider>
    )

    expect(getAllByRole('heading').length).toEqual(4) // number of columns
    expect(getAllByRole('row').length).toEqual(4)
  })

  describe('when no orders are found', () => {
    it('should render no orders message', () => {
      const mockStore = configureStore({
        reducer: {
          table: tableReducer,
          fetch: fetchDataReducer,
        },
        preloadedState: {
          table: { ...initialState },
          fetch: {
            isLoading: false,
          },
        },
      })

      const { getByText } = render(
        <Provider store={mockStore}>
          <Table />
        </Provider>
      )

      expect(getByText('No Orders Found', { exact: false })).toBeInTheDocument()
    })
  })
})
