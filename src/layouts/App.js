import '../styles/App.css'
import Header from './Header'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Page from './Page'
import Footer from './Footer'
import { store } from '../store/UserLoggedStore'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <header>
          <Header />
        </header>
        <main>
          <Page />
        </main>
        <Footer ClassName='footer' />
      </Router>
    </Provider>
  )
}

export default App
