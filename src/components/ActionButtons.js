import React, { useState } from 'react'
import ModalWindow from './ModalWindow'
import { dataStore } from '../store/DataStore'
import { UPDATE_DATA, UPDATE_USER } from '../actions/DataAction'
import '../styles/actionButtons.css'
import { store } from '../store/UserLoggedStore'
import { current } from '@reduxjs/toolkit'

const ActionButtons = ({ gridRefClients, gridRefUsers, clientPage }) => {
  const [openModal, setOpenModal] = useState(false)
  const [editing, setEditing] = useState(false)
  const [adding, setAdding] = useState(false)
  const [deactivation, setDeactivation] = useState(false)

  const handleDeactivationBtn = () => {
    setOpenModal(true)
    setDeactivation(true)
  }

  const deactivateUser = () => {
    const selectedUser = gridRefUsers.current.api.getSelectedRows()[0]
    const { IdWlascicielaFirmy } = selectedUser

    const deactivatedUser = {
      ...selectedUser,
      Aktywny: false,
    }

     

    let currentUsers = []
    if (store.getState().UserLoginReducer.isAdmin) {
      currentUsers = dataStore.getState().DataReducer.aboutUser
    } else {
      console.log(store.getState().UserLoginReducer.companyInfo.IdWlascicielaFirmy)
      currentUsers = dataStore
        .getState()
        .DataReducer.aboutUser.filter(
          (user) => user.IdWlascicielaFirmy === store.getState().UserLoginReducer.companyInfo.IdWlascicielaFirmy
        )
    }


    const updatedUsers = dataStore
      .getState()
      .DataReducer.aboutUser.map((user) => (user.IdWlascicielaFirmy === IdWlascicielaFirmy ? deactivatedUser : user))

    dataStore.dispatch({ type: UPDATE_USER, aboutUser: updatedUsers })
    gridRefUsers.current.api.setRowData(updatedUsers)

    setOpenModal(false)
    setDeactivation(false)
  }

  const handleEditBtn = () => {
    setOpenModal(true)
    setEditing(true)
    setAdding(false)
  }

  const editClient = (e) => {
    e.preventDefault()
    const selectedClient = gridRefClients.current.api.getSelectedRows()[0]
    const { IdWlascicielaFirmy } = selectedClient

    const editedClient = {
      ...selectedClient,
      companyName: e.target[0].value,
      boughtCopies: Number(e.target[1].value),
    }

    const updatedClients = dataStore
      .getState()
      .DataReducer.aboutCompany.map((client) => (client.IdWlascicielaFirmy === IdWlascicielaFirmy ? editedClient : client))

    dataStore.dispatch({ type: UPDATE_DATA, aboutCompany: updatedClients })
    gridRefClients.current.api.setRowData(updatedClients)

    setOpenModal(false)
    setEditing(false)
  }

  const editUser = (e) => {
    const selectedUser = gridRefUsers.current.api.getSelectedRows()[0]
    const { Id } = selectedUser

    const editedUser = {
      ...selectedUser,
      IdWlascicielaFirmy: e.IdWlascicielaFirmy,
      Użytkownik: e.Użytkownik,
      NrIMEI: e.NrIMEI,
      NazwaUrządzenia: e.NazwaUrzadzenia,
      Dział: e.Dzial,
      NrTelefonu: e.NrTelefonu,
      ['Wersja aplikacji']: e.WersjaAplikacji,
      ostatniaAktywność: e.ostatniaAktywność,
      Aktywny: e.Aktywny,
    }

    let currentUsers = []
    if (store.getState().UserLoginReducer.isAdmin) {
      currentUsers = dataStore.getState().DataReducer.aboutUser
    } else {
      console.log(store.getState().UserLoginReducer.companyInfo.IdWlascicielaFirmy)
      currentUsers = dataStore
        .getState()
        .DataReducer.aboutUser.filter(
          (user) => user.IdWlascicielaFirmy === store.getState().UserLoginReducer.companyInfo.IdWlascicielaFirmy
        )
    }

    const updatedUsers = currentUsers.map((user) => (user.Id === Id ? editedUser : user))

    dataStore.dispatch({ type: UPDATE_USER, aboutUser: updatedUsers })
    gridRefUsers.current.api.setRowData(updatedUsers)

    setOpenModal(false)
    setEditing(false)
  }

  const handleDeleteBtn = () => {
    setOpenModal(true)
    setEditing(false)
    setAdding(false)
  }

  const closeModal = () => {
    setOpenModal(false)
    setAdding(false)
    setEditing(false)
  }

  const deleteFromClients = () => {
    const selectedClient = gridRefClients.current.api.getSelectedRows()[0]
    const { IdWlascicielaFirmy } = selectedClient

    const updatedClients = dataStore
      .getState()
      .DataReducer.aboutCompany.filter((client) => client.IdWlascicielaFirmy !== IdWlascicielaFirmy)

    dataStore.dispatch({ type: UPDATE_DATA, aboutCompany: updatedClients })
    gridRefClients.current.api.setRowData(updatedClients)

    setOpenModal(false)
  }

  const deleteFromUsers = () => {
    const selectedUser = gridRefUsers.current.api.getSelectedRows()[0]
    const { Id } = selectedUser

    let currentUsers = []
    if (store.getState().UserLoginReducer.isAdmin) {
      currentUsers = dataStore.getState().DataReducer.aboutUser
    } else {
      console.log(store.getState().UserLoginReducer.companyInfo.IdWlascicielaFirmy)
      currentUsers = dataStore
        .getState()
        .DataReducer.aboutUser.filter(
          (user) => user.IdWlascicielaFirmy === store.getState().UserLoginReducer.companyInfo.IdWlascicielaFirmy
        )
    }

    const updatedUsers = currentUsers.filter((user) => user.Id !== selectedUser.Id)

    dataStore.dispatch({ type: UPDATE_USER, aboutUser: updatedUsers })
    gridRefUsers.current.api.setRowData(updatedUsers)

    setOpenModal(false)
  }

  const handleAddBtn = () => {
    setOpenModal(true)
    setEditing(false)
    setAdding(true)
  }

  const addClient = (e) => {
    e.preventDefault()
    const updatedClients = dataStore.getState().DataReducer.aboutCompany.slice()
    const newId = updatedClients[updatedClients.length - 1].IdWlascicielaFirmy + 1

    const newClient = {
      companyName: e.target[0].value,
      boughtCopies: Number(e.target[1].value),
      IdWlascicielaFirmy: newId,
    }

    updatedClients.push(newClient)
    dataStore.dispatch({ type: UPDATE_DATA, aboutCompany: updatedClients })
    gridRefClients.current.api.setRowData(updatedClients)

    setOpenModal(false)
  }

  const addUser = (e) => {
    const userTable = dataStore.getState().DataReducer.aboutUser.slice()
    const newId = userTable[userTable.length - 1].Id + 1

    const newUser = {
      Id: newId,
      IdWlascicielaFirmy: e.IdWlascicielaFirmy,
      Użytkownik: e.Użytkownik,
      NrIMEI: e.NrIMEI,
      NazwaUrządzenia: e.NazwaUrzadzenia,
      Dział: e.Dzial,
      NrTelefonu: e.NrTelefonu,
      ['Wersja aplikacji']: e.WersjaAplikacji,
      ostatniaAktywność: e.ostatniaAktywność,
      Aktywny: e.Aktywny,
    }

    let currentUsers = []
    if (store.getState().UserLoginReducer.isAdmin) {
      currentUsers = dataStore.getState().DataReducer.aboutUser
    } else {
      console.log(store.getState().UserLoginReducer.companyInfo.IdWlascicielaFirmy)
      currentUsers = dataStore
        .getState()
        .DataReducer.aboutUser.filter(
          (user) => user.IdWlascicielaFirmy === store.getState().UserLoginReducer.companyInfo.IdWlascicielaFirmy
        )
    }

  

    const updatedUsers = [...currentUsers, newUser]
    dataStore.dispatch({ type: UPDATE_USER, aboutUser: updatedUsers })

    gridRefUsers.current.api.setRowData(dataStore.getState().DataReducer.aboutUser)

    setOpenModal(false)
  }

  return (
    <>
      <button onClick={handleEditBtn} className='actionButton'>
        Edytuj
      </button>
      <button onClick={handleAddBtn} className='actionButton'>
        Dodaj
      </button>
      <button onClick={handleDeleteBtn} className='actionButton deleteBtn'>
        Usuń
      </button>
      {!clientPage && (
        <button onClick={handleDeactivationBtn} className='actionButton deleteBtn'>
          Dezaktywuj
        </button>
      )}

      <ModalWindow
        openModal={openModal}
        closeModal={closeModal}
        editing={editing}
        adding={adding}
        deactivation={deactivation}
        clientPage={clientPage}
        gridRef={clientPage ? gridRefClients : gridRefUsers}
        deleteFromClients={clientPage ? deleteFromClients : undefined}
        deleteFromUsers={!clientPage ? deleteFromUsers : undefined}
        editClient={clientPage ? editClient : undefined}
        editUser={!clientPage ? editUser : undefined}
        addClient={clientPage ? addClient : undefined}
        addUser={!clientPage ? addUser : undefined}
        deactivateUser={!clientPage ? deactivateUser : undefined}
      />
    </>
  )
}

export default ActionButtons
