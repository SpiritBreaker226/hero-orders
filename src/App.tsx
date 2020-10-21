import React from 'react'

import ErrorBoundary from './features/ErrorBoundary'
import FetchData from './features/fetch_data/FetchData'

import logo from './logo.svg'
import './App.scss'

function App() {
  return (
    <ErrorBoundary>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="chef hero" />
      </header>

      <main role="main">
        <FetchData />
      </main>
    </ErrorBoundary>
  )
}

export default App
