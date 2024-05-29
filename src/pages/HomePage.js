import React from 'react'
import { store } from '../store/UserLoggedStore'
import { NavLink } from 'react-router-dom'
import '../styles/homePage.css'
import Logo from '../components/Logo'

const HomePage = () => {
  const isUserLoggedIn = store.getState().UserLoginReducer.isUserLoggedIn
  const isAdmin = store.getState().UserLoginReducer.isAdmin

  return (
    <div className='center'>
      {isUserLoggedIn || isAdmin ? (
        <>
          <Logo />
          <nav>
            <ul>
              <li className='btnHome'>
                <NavLink to='/clientInfoPage'>Client Info</NavLink>
              </li>
              <li className='btnHome'>
                <NavLink to='/userInfoPage'>User Info</NavLink>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <Logo />
          <nav>
            <ul>
              <li className='btnHome'>
                <NavLink to='/login'>Log in</NavLink>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  )
}

export default HomePage
