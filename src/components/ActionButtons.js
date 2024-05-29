import React from 'react'
import { useState } from 'react'
import ModalWindow from './ModalWindow'
import loginInfoTable from '../data/loginInfoTable'
import { dataStore } from '../store/DataStore'
import { UPDATE_DATA, UPDATE_USER } from '../actions/DataAction'
import '../styles/actionButtons.css'

const ActionButtons = ({ gridRefClients, gridRefUsers, clientPage }) => {
  const [openModal, setOpenModal] = useState(false)
  const [editing, setEditing] = useState(false)
  const [adding, setAdding] = useState(false)

  const handleEditBtn = () => {
    setOpenModal(true)
    setEditing(true)
    setAdding(false)
  }

  const editClient = (e) => {
    e.preventDefault()
    const companyId = gridRefClients.current.api.getSelectedRows()[0].companyId

    const editedClient = {
      ...gridRefClients.current.api.getSelectedRows()[0],
      companyName: e.target[0].value,
      boughtCopies: Number(e.target[1].value),
    }

    const editedTable = dataStore.getState().DataReducer.aboutCompany.map((item) => {
      if (item.companyId === companyId) {
        return editedClient
      }
      return item
    })

    dataStore.dispatch({ type: UPDATE_DATA, aboutCompany: editedTable })

    gridRefClients.current.api.setGridOption('rowData', dataStore.getState().DataReducer.aboutCompany)

    setOpenModal(false)
    setEditing(false)
  }

  const editUser = (e) => {
    e.preventDefault()
    const userId = gridRefUsers.current.api.getSelectedRows()[0].idUżytkownika

    const editedUser = {
      ...gridRefUsers.current.api.getSelectedRows()[0],
      idUżytkownika: e.target[0].value,
      IdFirmy: e.target[1].value,
      NrIMEI: e.target[2].value,
      NazwaUrządzenia: e.target[3].value,
      Dział: e.target[4].value,
      NrTelefonu: e.target[5].value,
      ostatnieAktywność: e.target[6].value,
      Aktywny: e.target[7].value,
    }

    const editedTable = dataStore.getState().DataReducer.aboutUser.map((item) => {
      if (item.idUżytkownika === userId) {
        return editedUser
      }
      return item
    })

    dataStore.dispatch({ type: UPDATE_USER, aboutUser: editedTable })

    gridRefUsers.current.api.setGridOption('rowData', dataStore.getState().DataReducer.aboutUser)

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
    const clientId = gridRefClients.current.api.getSelectedRows()[0].clientId

    const editedTable = dataStore.getState().DataReducer.aboutCompany.slice()

    editedTable.filter((item) => {
      if (item.clientId === clientId) {
        const index = editedTable.indexOf(item)
        editedTable.splice(index, 1)
      }
      return editedTable
    })

    loginInfoTable.filter((item) => {
      if (item.id === clientId) {
        const index = loginInfoTable.indexOf(item)
        loginInfoTable.splice(index, 1)
      }
      return loginInfoTable
    })

    dataStore.dispatch({ type: UPDATE_DATA, aboutCompany: editedTable })

    gridRefClients.current.api.setGridOption('rowData', dataStore.getState().DataReducer.aboutCompany)
    setOpenModal(false)
  }

  const deleteFromUsers = () => {
    const clientId = gridRefUsers.current.api.getSelectedRows()[0].idUżytkownika

    const editedTable = dataStore.getState().DataReducer.aboutUser.slice()

    editedTable.filter((item) => {
      if (item.idUżytkownika === clientId) {
        const index = editedTable.indexOf(item)
        editedTable.splice(index, 1)
      }
      return editedTable
    })

    dataStore.dispatch({ type: UPDATE_DATA, aboutCompany: editedTable })

    gridRefUsers.current.api.setGridOption('rowData', editedTable)
    setOpenModal(false)
  }

  const handleAddBtn = () => {
    setOpenModal(true)
    setEditing(false)
    setAdding(true)
  }

  const addClient = (e) => {
    const newClient = {
      companyName: e['Company Name'],
      boughtCopies: Number(e['Bought Copies']),
      companyId: Number(e['Company ID']),
      clientId: Number(e['Client ID']),
    }

    const editedTable = dataStore.getState().DataReducer.aboutCompany.slice()
    editedTable.push(newClient)
    dataStore.dispatch({ type: UPDATE_DATA, aboutCompany: editedTable })
    gridRefClients.current.api.setGridOption('rowData', dataStore.getState().DataReducer.aboutCompany)
    setOpenModal(false)
  }

  const addUser = (e) => {
    const newUser = {
      idUżytkownika: Number(e['ID Użytkownika']),
      IdFirmy: Number(e['ID Firmy']),
      NrIMEI: Number(e['Nr IMEI']),
      NazwaUrządzenia: e['Nazwa Urządzenia'],
      Dział: e['Dział'],
      NrTelefonu: e['Nr Telefonu'],
      ['Ostatnie Aktywność']: e['Ostatnie Aktywność'],
      ostatnieAktywność: e['Ostatnie Aktywność'],
      Aktywny: e['Aktywny'],
    }

    console.log(newUser)
    dataStore.getState().DataReducer.aboutUser.push(newUser)
    gridRefUsers.current.api.setGridOption('rowData', dataStore.getState().DataReducer.aboutUser)

    setOpenModal(false)
  }

  return (
    <>
      <div className='buttonWrapper'>
        <button onClick={handleEditBtn} className='actionButton'>
          Edytuj
        </button>
        <button onClick={handleAddBtn} className='actionButton'>
          Add
        </button>
        <button onClick={handleDeleteBtn} className='actionButton' id='deleteBtn'>
          Delete
        </button>
      </div>
      <ModalWindow
        openModal={openModal}
        deleteFromClients={deleteFromClients}
        gridRef={gridRefClients}
        editing={editing}
        closeModal={closeModal}
        editClient={editClient}
        adding={adding}
        addClient={addClient}
        clientPage={true}
        editUser={editUser}
        deleteFromUsers={deleteFromUsers}
        addUser={addUser}
      />
    </>
  )
}

export default ActionButtons
