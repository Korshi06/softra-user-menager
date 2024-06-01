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
              <NavLink to='/clientInfoPage'>
                <li className='btnSlimmer'>Klienci</li>
              </NavLink>
              <NavLink to='/userInfoPage'>
                <li className='btnSlimmer'>Użytkownicy</li>
              </NavLink>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <Logo />
          <nav>
            <ul>
              <ul>
                <NavLink to='/login'>
                  <li className='btnSlimmer'>Zaloguj się</li>
                </NavLink>
              </ul>
            </ul>
          </nav>
        </>
      )}
    </div>
  )
}

export default HomePage
