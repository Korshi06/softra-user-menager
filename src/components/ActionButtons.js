import React from 'react'
import { useState } from 'react'
import ModalWindow from './ModalWindow'
import loginInfoTable from '../data/loginInfoTable'
import { dataStore } from '../store/DataStore'
import { UPDATE_DATA } from '../actions/DataAction'
import '../styles/actionButtons.css'

const ActionButtons = ({ gridRefClients }) => {
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

    dataStore.getState().DataReducer.aboutCompany.filter((item) => {
      if (item.clientId === clientId) {
        const index = dataStore.getState().DataReducer.aboutCompany.indexOf(item)
        dataStore.getState().DataReducer.aboutCompany.splice(index, 1)
      }
      return dataStore.getState().DataReducer.aboutCompany
    })

    loginInfoTable.filter((item) => {
      if (item.id === clientId) {
        const index = loginInfoTable.indexOf(item)
        loginInfoTable.splice(index, 1)
      }
      return loginInfoTable
    })

    gridRefClients.current.api.setGridOption('rowData', dataStore.getState().DataReducer.aboutCompany)
    setOpenModal(false)
  }

  const handleAddBtn = () => {
    setOpenModal(true)
    setEditing(false)
    setAdding(true)
  }

  const addClient = (e) => {
    const newClient = {
      companyName: e.companyName,
      boughtCopies: Number(e.boughtCopies),
      companyId: Number(e.companyId),
      clientId: Number(e.clientId),
    }

    dataStore.getState().DataReducer.aboutCompany.push(newClient)
    gridRefClients.current.api.setGridOption('rowData', dataStore.getState().DataReducer.aboutCompany)
    setOpenModal(false)
  }

  return (
    <>
      <div className='buttonWrapper'>
        <button onClick={handleEditBtn} className='actionButton btn btn-primary'>
          Edit
        </button>
        <button onClick={handleAddBtn} className='actionButton btn btn-primary'>
          Add
        </button>
        <button onClick={handleDeleteBtn} className='btn actionButton btn-danger'>
          Delete
        </button>
      </div>
      <ModalWindow
        openModal={openModal}
        deleteFromClients={deleteFromClients}
        gridRefClients={gridRefClients}
        editing={editing}
        closeModal={closeModal}
        editClient={editClient}
        adding={adding}
        addClient={addClient}
      />
    </>
  )
}

export default ActionButtons
