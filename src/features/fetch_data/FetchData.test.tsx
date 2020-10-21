import React from 'react'

import { waitFor, screen, render } from '@testing-library/react'

import axios from 'axios'

import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'

import FetchData from './FetchData'
import reducer, { initialState } from './fetchDataSlice'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('FetchData', () => {
  describe('fetch Order data', () => {
    it('renders loading screen', async () => {
      const mockStore = createStore(reducer, {
        fetch: {
          ...initialState,
          isLoading: true,
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

        const mockStore = createStore(reducer, {
          fetch: {
            ...initialState,
            errorMessage: 'fake error message',
            isLoading: false,
          },
        })

        render(
          <Provider store={mockStore}>
            <FetchData />
          </Provider>
        )

        await waitFor(() => screen.getByText('error', { exact: false }))

        const error = screen.getByText('fake error message', { exact: false })

        expect(error).toBeInTheDocument()
        expect(error).toMatchSnapshot()
      })
    })
  })
})
