import React from 'react'

import { waitFor, screen, render } from '@testing-library/react'

import axios from 'axios'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import FetchData from './FetchData'
import fetchDataReducer, { initialState } from './fetchDataSlice'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('FetchData', () => {
  describe('fetch Order data', () => {
    it('renders loading screen', async () => {
      const mockStore = configureStore({
        reducer: {
          fetch: fetchDataReducer,
        },
        preloadedState: {
          fetch: {
            ...initialState,
            isLoading: true,
          },
        },
      })

      render(
        <Provider store={mockStore}>
          <FetchData />
        </Provider>
      )

      expect(screen.getByText('Loading', { exact: false })).toBeInTheDocument()
      expect(screen.getByText('Loading', { exact: false })).toMatchSnapshot()

      await waitFor(() => {})
    })

    describe('on error from the server', () => {
      it('should render an error message', async () => {
        mockedAxios.get.mockRejectedValue(new Error('fake error message'))

        const mockStore = configureStore({
          reducer: {
            fetch: fetchDataReducer,
          },
          preloadedState: {
            fetch: {
              ...initialState,
              errorMessage: 'fake error message',
              isLoading: false,
            },
          },
        })

        render(
          <Provider store={mockStore}>
            <FetchData />
          </Provider>
        )

        await waitFor(() => screen.getByText('error', { exact: false }))

        expect(
          screen.queryByText('Loading', { exact: false })
        ).not.toBeInTheDocument()

        const error = screen.getByText('fake error message', { exact: false })

        expect(error).toBeInTheDocument()
        expect(error).toMatchSnapshot()
      })
    })
  })
})
