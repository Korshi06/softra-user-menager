import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import ErrorPage from '../pages/ErrorPage'
import LoginPage from '../pages/LoginPage'
import ClientInfoPage from '../pages/ClientInfoPage'
import UserInfoPage from '../pages/UserInfoPage'
import '../styles/Page.css'

const Page = () => {
  return (
    <div className='page'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/clientInfoPage' element={<ClientInfoPage />} />
        <Route path='/userInfoPage' element={<UserInfoPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default Page
