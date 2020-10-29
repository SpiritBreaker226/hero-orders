import React from 'react'
import { useSelector } from 'react-redux'

import ErrorBoundary from './features/ErrorBoundary'
import FetchData from './features/fetch_data/FetchData'
import SearchWithVendorName from './features/search_with_vendor_name/SearchWithVendorName'
import Table from './features/table/Table'

import { selectOrders } from './features/table/tableSlice'

import logo from './logo.svg'
import './App.scss'

function App() {
  const orders = useSelector(selectOrders)

  return (
    <ErrorBoundary>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="chef hero" />
      </header>

      <main role="main">
        {orders.length > 0 && <SearchWithVendorName />}
        <Table />
        <FetchData />
      </main>
    </ErrorBoundary>
  )
}

export default App
