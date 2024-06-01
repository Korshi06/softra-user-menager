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
import Logo from '../components/Logo'

//All users of the currently logged in company will be shown here

const UserInfoPage = () => {
  const isUserLoggedIn = store.getState().UserLoginReducer.isUserLoggedIn
  const isAdmin = store.getState().UserLoginReducer.isAdmin
  const gridRefUsers = React.useRef()

  const [filteredUsers, setFilteredUsers] = useState([])
  const [activeAccounts, setActiveAccounts] = useState(0)

  const { IdWlascicielaFirmy } = store.getState().UserLoginReducer.companyInfo

  useEffect(() => {
    if (!isAdmin && isUserLoggedIn) {
      setFilteredUsers(clientsUsersTable.filter((user) => user.IdWlascicielaFirmy === IdWlascicielaFirmy))
      setActiveAccounts(
        clientsUsersTable.filter((user) => user.IdWlascicielaFirmy === IdWlascicielaFirmy && user.Aktywny === true).length
      )
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
          <h1>Użytkownicy</h1>
          <Provider store={dataStore}>
            <CompanyInfo activeAccounts={activeAccounts} />
            <UserTable gridRefUsers={gridRefUsers} />
            <div className='buttonWrapper'>
              <ActionButtons gridRefUsers={gridRefUsers} clientPage={false} setActiveAccounts={setActiveAccounts} />
            </div>
          </Provider>
        </>
      ) : (
        <div className='center'>
          <Logo />
          <h1>Użytkownicy</h1>
          <h3>Zaloguj się by wyświetlić</h3>
          <ul>
            <ul>
              <NavLink to='/login'>
                <li className='btnSlimmer'>Zaloguj się</li>
              </NavLink>
            </ul>
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserInfoPage
