import React from 'react'

import { Provider } from 'react-redux'

import { waitFor, screen, render, fireEvent } from '@testing-library/react'

import axios from 'axios'

import orders from './features/helpers/test_data_orders.json'

import { store } from './app/store'

import App from './App'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('App', () => {
  describe('when fetching order data', () => {
    beforeEach(async () => {
      mockedAxios.get.mockResolvedValue({
        data: orders,
      })

      render(
        <Provider store={store}>
          <App />
        </Provider>
      )

      await waitFor(() => screen.getByTestId('orders-table'))
    })

    it('renders orders component', () => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        process.env.REACT_APP_BASE_API_URL
      )
      expect(screen.getByRole('img')).toBeVisible()
      expect(screen.getByRole('main')).toMatchSnapshot()
    })

    describe('for searching', () => {
      describe('when selecting a vendor ', () => {
        it('should render only that vender then reset back', async () => {
          fireEvent.change(screen.getByTestId('searchWithVendorName'), {
            target: { value: 'D & D Poultry Ltd.' },
          })

          expect(
            screen.getAllByTestId('SupplierD & D Poultry Ltd.').length
          ).toEqual(2)
          expect(
            screen.queryByTestId('SupplierCanway Distribution')
          ).not.toBeInTheDocument()

          fireEvent.click(screen.getByTestId('searchResetButton'))

          expect(
            screen.getAllByTestId('SupplierD & D Poultry Ltd.').length
          ).toEqual(2)
          expect(
            screen.getAllByTestId('SupplierCanway Distribution').length
          ).toEqual(1)
        })
      })
    })
  })

  describe('when loading the page', () => {
    it('should not render no orders message and display loading text', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: { data: [] },
      })

      render(
        <Provider store={store}>
          <App />
        </Provider>
      )

      expect(
        screen.queryByText('Loading', { exact: false })
      ).toBeInTheDocument()

      expect(
        screen.queryByText('No Orders Found', { exact: false })
      ).not.toBeInTheDocument()

      await waitFor(() => screen.getByTestId('no-orders'))

      expect(
        screen.queryByText('Loading', { exact: false })
      ).not.toBeInTheDocument()

      expect(screen.queryByTestId('searchBox')).not.toBeInTheDocument()

      expect(
        screen.queryByText('No Orders Found', { exact: false })
      ).toBeInTheDocument()
    })

    describe('on error from the server', () => {
      it('should render an error message', async () => {
        mockedAxios.get.mockRejectedValue(new Error('fake error message'))

        render(
          <Provider store={store}>
            <App />
          </Provider>
        )

        await waitFor(() => screen.getByText('error', { exact: false }))

        expect(
          screen.queryByText('No Orders Found', { exact: false })
        ).not.toBeInTheDocument()

        expect(
          screen.getByText('fake error message', { exact: false })
        ).toBeInTheDocument()
      })
    })
  })
})
