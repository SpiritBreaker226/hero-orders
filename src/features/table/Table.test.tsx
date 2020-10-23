import React from 'react'
import { render } from '@testing-library/react'

import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'

import orders from '../helpers/test_data_orders.json'

import Table from './Table'
import reducer, { initialState } from './tableSlice'

describe('Table', () => {
  it('should render as expeected', () => {
    const mockStore = createStore(reducer, {
      table: {
        ...initialState,
        orders: orders.data,
      },
      fetch: {
        isLoading: false,
      },
    })
    const { getAllByRole } = render(
      <Provider store={mockStore}>
        <Table />
      </Provider>
    )

    expect(getAllByRole('columnheader').length).toEqual(4)
    expect(getAllByRole('row').length).toEqual(5)
  })

  describe('when no orders are found', () => {
    it('should render no orders message', () => {
      const mockStore = createStore(reducer, {
        table: {
          ...initialState,
          orders: [],
        },
        fetch: {
          isLoading: false,
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
