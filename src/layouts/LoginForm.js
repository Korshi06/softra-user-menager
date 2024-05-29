import React from 'react'
import { store } from '../store/UserLoggedStore'
import { useState } from 'react'
import { LOGIN_USER, LOGOUT_USER } from '../actions/UserLoginAction'
import loginInfoTable from '../data/loginInfoTable'
import { aboutCompany } from '../data/aboutCompany'
import '../styles/LoginForm.css'
import Logo from '../components/Logo'

const LoginForm = () => {
  const [reRender, setReRender] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [errorState, setErrorState] = useState('')
  const { isUserLoggedIn } = store.getState().UserLoginReducer

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
      setErrorState('Incorrect login or password')
      setReRender(!reRender)
      return
    }

    if (found.login === login && found.password === password) {
      store.dispatch({ type: LOGIN_USER, payload: { isAdmin: found.admin, companyId: found.id } })
      if (!found.admin) {
        const companyInfo = aboutCompany.find((element) => element.clientId === found.id)
        store.dispatch({
          type: 'COMPANY_INFO',
          companyInfo,
        })
      }
      setReRender(!reRender)
      setErrorState('')
    } else {
      setErrorState('Incorrect login or password')
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
            <h3>Hello! Log in here</h3>
            <input type='text' name='login' placeholder='login' value={login} onChange={inputChange} /> <br />
            <input type='password' name='password' placeholder='password' value={password} onChange={inputChange} /> <br />
            <p id='errorP'>{errorState} </p>
            <button>Log in</button>
          </>
        ) : (
          <button>Log out</button>
        )}
      </form>
      {isUserLoggedIn ? <p>Logged in</p> : <p>Logged out</p>}
    </div>
  )
}

export default LoginForm
