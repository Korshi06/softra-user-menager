import React from 'react'
import { useState } from 'react'
import ModalWindow from './ModalWindow'
import { UPDATE_USER } from '../actions/DataAction'
import { dataStore } from '../store/DataStore'

const DeactivationButton = ({ gridRefUsers }) => {
  const [openModal, setOpenModal] = useState(false)
  const [deactivation, setDeactivation] = useState(false)

  const handleDeactivationBtn = () => {
    setOpenModal(true)
    setDeactivation(true)
  }

  const deactivateUser = () => {
    const IdWlascicielaFirmy = gridRefUsers.current.api.getSelectedRows()[0].IdWlascicielaFirmy

    const deactivatedUser = {
      ...gridRefUsers.current.api.getSelectedRows()[0],
      Aktywny: false,
    }

    const deactivatedTable = dataStore.getState().DataReducer.aboutUser.map((item) => {
      if (item.IdWlascicielaFirmy === IdWlascicielaFirmy) {
        return deactivatedUser
      }
      return item
    })

    dataStore.dispatch({ type: UPDATE_USER, aboutUser: deactivatedTable })

    gridRefUsers.current.api.setGridOption('rowData', dataStore.getState().DataReducer.aboutUser)

    setOpenModal(false)
    setDeactivation(false)
  }

  return (
    <>
      <button onClick={handleDeactivationBtn} className='actionButton deleteBtn'>
        Deactivate
      </button>
      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        deactivation={deactivation}
        setDeactivation={setDeactivation}
        deactivateUser={deactivateUser}
      />
    </>
  )
}

export default DeactivationButton
