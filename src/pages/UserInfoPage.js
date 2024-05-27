import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import UserTable from '../components/UserTable'
import { store } from '../store/UserLoggedStore'
import '../styles/userInfoPage.css'
import CompanyInfo from '../components/CompanyInfo'
import { clientsUsersTable } from '../data/clientsUsersTable'
//import ActionButtons from '../components/ActionButtons'

//All users of the currently logged in company will be shown here

const UserInfoPage = () => {
  const isUserLoggedIn = store.getState().UserLoginReducer.isUserLoggedIn
  const isAdmin = store.getState().UserLoginReducer.isAdmin

  const [filteredUsers, setFilteredUsers] = useState([])

  const { companyId } = store.getState().UserLoginReducer.companyInfo

  useEffect(() => {
    if (!isAdmin && isUserLoggedIn) {
      setFilteredUsers(clientsUsersTable.filter((user) => user.IdFirmy === companyId))
    }
    if (isAdmin) {
      setFilteredUsers(clientsUsersTable)
    }
  }, [isAdmin, isUserLoggedIn, clientsUsersTable, companyId])

  return (
    <div id='userPage'>
      {isUserLoggedIn || isAdmin ? (
        <>
          <CompanyInfo clientsUsersTable={filteredUsers} />
          <UserTable clientsUsersTable={filteredUsers} />
          {/* <ActionButtons /> */}
        </>
      ) : (
        <div className='center'>
          <h1>UserInfoPage</h1>
          <h3>Log in to access this page</h3>
          <NavLink to='/login'>Log in page</NavLink>
        </div>
      )}
    </div>
  )
}

export default UserInfoPage
