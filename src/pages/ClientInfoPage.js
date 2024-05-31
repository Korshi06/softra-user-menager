import React from 'react'
import { NavLink } from 'react-router-dom'
import ClientTable from '../components/ClientTable'
import { store } from '../store/UserLoggedStore'
import ActionButtons from '../components/ActionButtons'
import { Provider } from 'react-redux'
import { dataStore } from '../store/DataStore'
import '../styles/userInfoPage.css'
import Logo from '../components/Logo'
//All the clients that have bought the app will be shown here
//only for admin

const ClientInfoPage = () => {
  const gridRefClients = React.useRef()
  const admin = store.getState().UserLoginReducer.isAdmin
  return (
    <>
      {admin ? (
        <div className='center'>
          <Provider store={dataStore}>
            <h1>O klientach</h1>
            <ClientTable gridRefClients={gridRefClients} />
            <div className='buttonWrapper'>
              <ActionButtons gridRefClients={gridRefClients} clientPage={true} />
            </div>
          </Provider>
        </div>
      ) : (
        <div className='center'>
          <Logo />
          <h1>ClientInfoPage</h1>
          <h3>Log in as an Admin to access this page</h3>
          <ul>
            <li className='btnSlimmer'>
              <NavLink to='/login'>Log in</NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default ClientInfoPage
