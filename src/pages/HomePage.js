import React from 'react'
import { store } from '../store/UserLoggedStore'
import { NavLink } from 'react-router-dom'
import '../styles/homePage.css'

const HomePage = () => {
  const isUserLoggedIn = store.getState().UserLoginReducer.isUserLoggedIn
  const isAdmin = store.getState().UserLoginReducer.isAdmin

  return (
    <div className='center'>
      {isUserLoggedIn || isAdmin ? (
        <>
          <img src='https://picsum.photos/250/120' alt='logo' />
          <nav>
            <ul>
              <li>
                <NavLink to='/clientInfoPage'>Client Info</NavLink>
              </li>
              <li>
                <NavLink to='/userInfoPage'>User Info</NavLink>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <img src='https://picsum.photos/250/120' alt='logo' />
          <nav>
            <ul>
              <li id='btnHome'>
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
