import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import UserTable from '../components/UserTable'
import { store } from '../store/UserLoggedStore'
import '../styles/userInfoPage.css'
import CompanyInfo from '../components/CompanyInfo'
import { clientsUsersTable } from '../data/clientsUsersTable'
import { Provider } from 'react-redux'
import { dataStore } from '../store/DataStore'
import ActionButtons from '../components/ActionButtons'
import { UPDATE_DATA } from '../actions/DataAction'

//All users of the currently logged in company will be shown here

const UserInfoPage = () => {
  const isUserLoggedIn = store.getState().UserLoginReducer.isUserLoggedIn
  const isAdmin = store.getState().UserLoginReducer.isAdmin
  const gridRefUsers = React.useRef()

  const [filteredUsers, setFilteredUsers] = useState([])

  const { IdWlascicielaFirmy } = store.getState().UserLoginReducer.companyInfo

  useEffect(() => {
    if (!isAdmin && isUserLoggedIn) {
      setFilteredUsers(clientsUsersTable.filter((user) => user.IdWlascicielaFirmy === IdWlascicielaFirmy))
    }
    if (isAdmin) {
      setFilteredUsers(clientsUsersTable)
    }
  }, [isAdmin, isUserLoggedIn, IdWlascicielaFirmy])

  dataStore.dispatch({ type: UPDATE_DATA, aboutCompany: filteredUsers })

  return (
    <div className='center'>
      {isUserLoggedIn || isAdmin ? (
        <>
          <h1>User info</h1>
          <Provider store={dataStore}>
            <CompanyInfo />
            <UserTable gridRefUsers={gridRefUsers} />
            <div className='buttonWrapper'>
              <ActionButtons gridRefUsers={gridRefUsers} clientPage={false} />
            </div>
          </Provider>
        </>
      ) : (
        <div className='center'>
          <h1>UserInfoPage</h1>
          <h3>Log in to access this page</h3>
          <ul>
            <li className='btnSlimmer'>
              <NavLink to='/login'>Log in</NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserInfoPage
