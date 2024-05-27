import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/errorPage.css'

const ErrorPage = () => {
  return (
    <div className='center'>
      <>
        <>
          <img src='https://picsum.photos/250/120' alt='logo' />
          <h1>Page not found.</h1>
          <nav>
            <ul>
              <li>
                <NavLink to='/clientInfoPage'>Client Info</NavLink>
              </li>
              <li>
                <NavLink to='/userInfoPage'>User Info</NavLink>
              </li>
              <li>
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
