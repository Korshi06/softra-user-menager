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
          <h1>Nie znaleziono strony.</h1>
          <nav>
            <ul>
              <ul>
                <NavLink to='/clientInfoPage'>
                  <li className='btnSlimmer'>Klienci</li>
                </NavLink>
              </ul>
              <ul>
                <NavLink to='/userInfoPage'>
                  <li className='btnSlimmer'>Użytkownicy</li>
                </NavLink>
              </ul>
              <ul>
                <NavLink to='/login'>
                  <li className='btnSlimmer'>Zaloguj się</li>
                </NavLink>
              </ul>
            </ul>
          </nav>
        </>
      </>
    </div>
  )
}

export default ErrorPage
