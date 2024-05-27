import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/errorPage.css'

const ErrorPage = () => {
  return (
    <div className='center'>
      <>
        <>
          <img src='https://picsum.photos/250/120' alt='logo' />
          <h1>Nie znaleziono strony.</h1>
          <nav>
            <ul>
              <li>
                <NavLink to='/clientInfoPage'>O klientach</NavLink>
              </li>
              <li>
                <NavLink to='/userInfoPage'>Użytkownicy</NavLink>
              </li>
              <li>
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
