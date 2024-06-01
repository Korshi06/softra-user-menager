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
              <li className='btnSlimmer'>
                <NavLink to='/clientInfoPage'>O kliencie</NavLink>
              </li>
              <li className='btnSlimmer'>
                <NavLink to='/userInfoPage'>O użytkownikach</NavLink>
              </li>
              <li className='btnSlimmer'>
                <NavLink to='/login'>Zaloguj się</NavLink>
              </li>
            </ul>
          </nav>
        </>
      </>
    </div>
  )
}

export default ErrorPage
