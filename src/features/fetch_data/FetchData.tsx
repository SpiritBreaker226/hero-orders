import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchOrders, selectFetch } from './fetchDataSlice'

import styles from './FetchData.module.scss'

const FetchData: FunctionComponent = () => {
  const dispatch = useDispatch()
  const state = useSelector(selectFetch)

  useEffect(() => {
    dispatch(fetchOrders(state.urlEndpoint))
  }, [dispatch, state.urlEndpoint])

  if (state.isLoading) return <div className={styles.message}>Loading...</div>
  if (state.errorMessage) {
    return <div className={styles.message}>{state.errorMessage}</div>
  }

  return null
}

export default FetchData
