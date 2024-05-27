import React from 'react'
import { NavLink } from 'react-router-dom'
import ClientTable from '../components/ClientTable'
import { store } from '../store/UserLoggedStore'
import ActionButtons from '../components/ActionButtons'
import { Provider } from 'react-redux'
import { dataStore } from '../store/DataStore'
//All the clients that have bought the app will be shown here
//only for admin

const ClientInfoPage = () => {
  const gridRefClients = React.useRef()
  const admin = store.getState().UserLoginReducer.isAdmin
  return (
    <>
      {admin ? (
        <Provider store={dataStore}>
          <h1>ClientInfoPage</h1>
          <ClientTable gridRefClients={gridRefClients} />
          <ActionButtons gridRefClients={gridRefClients} />
        </Provider>
      ) : (
        <div className='center'>
          <h1>ClientInfoPage</h1>
          <h3>Log in as an Admin to access this page</h3>
          <NavLink to='/login'>Log in page</NavLink>
        </div>
      )}
    </>
  )
}

export default ClientInfoPage
