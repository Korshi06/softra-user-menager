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
                <NavLink to='/clientInfoPage'>O klientach</NavLink>
              </li>
              <li className='btnHome'>
                <NavLink to='/userInfoPage'>O użytkownikach</NavLink>
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
                <NavLink to='/login'>Zaloguj się</NavLink>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  )
}

export default HomePage
