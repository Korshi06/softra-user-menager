import React from 'react'
import { store } from '../store/UserLoggedStore'
import { useState } from 'react'
import { LOGIN_USER, LOGOUT_USER } from '../actions/UserLoginAction'
import loginInfoTable from '../data/loginInfoTable'
import { aboutCompany } from '../data/aboutCompany'
import '../styles/LoginForm.css'
import Logo from '../components/Logo'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [reRender, setReRender] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [errorState, setErrorState] = useState('')
  const { isUserLoggedIn } = store.getState().UserLoginReducer

  const navigate = useNavigate()

  const inputChange = (e) => {
    setLogin(e.target.name === 'login' ? e.target.value : login)
    setPassword(e.target.name === 'password' ? e.target.value : password)
  }

  const handleLogInBtn = (e) => {
    e.preventDefault()

    if (isUserLoggedIn) {
      store.dispatch({ type: LOGOUT_USER })
      setReRender(!reRender)
      return
    }
    const found = loginInfoTable.find((element) => element.login === login)
    if (!found) {
      store.dispatch({ type: LOGOUT_USER })
      setErrorState('Niepoprawne hasło lub login')
      setReRender(!reRender)
      return
    }

    if (found.login === login && found.password === password) {
      store.dispatch({ type: LOGIN_USER, payload: { isAdmin: found.admin, IdWlascicielaFirmy: found.id } })
      if (!found.admin) {
        const companyInfo = aboutCompany.find((element) => element.IdWlascicielaFirmy === found.id)
        store.dispatch({
          type: 'COMPANY_INFO',
          companyInfo,
        })
      }
      setReRender(!reRender)
      setErrorState('')

      navigate('/')
    } else {
      setErrorState('Niepoprawne hasło lub login')
      store.dispatch({ type: LOGOUT_USER })
      setReRender(!reRender)
    }
  }

  return (
    <div className='form center'>
      <form onSubmit={handleLogInBtn}>
        <Logo />
        {!isUserLoggedIn ? (
          <>
            <h3>Witaj! Zaloguj się tutaj.</h3>
            <input type='text' name='login' placeholder='login' value={login} onChange={inputChange} /> <br />
            <input type='password' name='password' placeholder='password' value={password} onChange={inputChange} /> <br />
            <p id='errorP'>{errorState} </p>
            <button>Zaloguj się</button>
          </>
        ) : (
          <button>Wyloguj się</button>
        )}
      </form>
      {isUserLoggedIn ? <p>Zalogowano</p> : <p>Wylogowano</p>}
    </div>
  )
}

export default LoginForm
