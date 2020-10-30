import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchOrders, selectFetch } from './fetchDataSlice'

const FetchData: FunctionComponent = () => {
  const dispatch = useDispatch()
  const state = useSelector(selectFetch)

  useEffect(() => {
    dispatch(fetchOrders(state.urlEndpoint))
  }, [dispatch, state.urlEndpoint])

  if (state.isLoading) return <div className="message">Loading...</div>
  if (state.errorMessage) {
    return <div className="message">{state.errorMessage}</div>
  }

  return null
}

export default FetchData
