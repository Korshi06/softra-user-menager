import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/errorPage.css'
import Logo from '../components/Logo'

const ErrorPage = () => {
  return (
    <div className='center'>
      <>
        <>
          <Logo />
          <h1>Page not found.</h1>
          <nav>
            <ul>
              <li className='btnSlimmer'>
                <NavLink to='/clientInfoPage'>Client Info</NavLink>
              </li>
              <li className='btnSlimmer'>
                <NavLink to='/userInfoPage'>User Info</NavLink>
              </li>
              <li className='btnSlimmer'>
                <NavLink to='/login'>Login</NavLink>
              </li>
            </ul>
          </nav>
        </>
      </>
    </div>
  )
}

export default ErrorPage
