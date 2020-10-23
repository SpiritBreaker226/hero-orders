import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'

import {
  updateLoading,
  updateErrorMessageFromServer,
  selectFetch,
} from './fetchDataSlice'
import { updateOrders } from '../table/tableSlice'

const FetchData: FunctionComponent = () => {
  const dispatch = useDispatch()
  const state = useSelector(selectFetch)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(updateLoading(true))

        const res = await axios.get(state.urlEndpoint)

        dispatch(
          updateOrders({
            orders: res.data.data,
          })
        )

        dispatch(updateLoading(false))
      } catch (error) {
        dispatch(
          updateErrorMessageFromServer({
            isLoading: false,
            errorMessage: error.message,
          })
        )
      }
    }

    fetchData()
  }, [dispatch, state.urlEndpoint])

  if (state.isLoading) return <div className="message">Loading...</div>
  if (state.errorMessage) {
    return <div className="message">{state.errorMessage}</div>
  }

  return null
}

export default FetchData