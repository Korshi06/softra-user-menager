import React from 'react'
import ReactDOM from 'react-dom'
import '../styles/modalWindow.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ModalWindow = ({ openModal, closeModal, editing, gridRefClients, adding, addClient, editClient, deleteFromClients }) => {
  if (!openModal) return null

  if (adding) {
    return <ModalAdding addClient={addClient} closeModal={closeModal} />
  }

  if (gridRefClients.current.api.getSelectedRows()[0] === undefined) {
    return (
      <div className='modalOverlay'>
        <div className='modalWindow'>
          <h2>Please select a row to edit</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    )
  }

  return ReactDOM.createPortal(
    <>
      {editing
        ? ModalEdit({ closeModal, gridRefClients, editClient })
        : ModalDelete({ closeModal, gridRefClients, deleteFromClients })}
    </>,
    document.getElementById('portal')
  )
}

const ModalEdit = ({ closeModal, gridRefClients, editClient }) => {
  const [companyName, setCompanyName] = useState(gridRefClients.current.api.getSelectedRows()[0].companyName)
  const [boughtCopies, setBoughtCopies] = useState(gridRefClients.current.api.getSelectedRows()[0].boughtCopies)

  const handleChange = (e) => {
    e.preventDefault()

    const { name, value } = e.target
    if (name === 'companyName') {
      setCompanyName(value)
    } else {
      setBoughtCopies(value)
    }
  }

  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Editing {gridRefClients.current.api.getSelectedRows()[0].companyName}</h2>
        <div>
          <form onSubmit={editClient}>
            <label>
              Company Name
              <input type='text' placeholder='Company Name' value={companyName} onChange={handleChange} />
            </label>
            <label>
              Bought copies:
              <input type='number' placeholder='Bought Copies' value={boughtCopies} onChange={handleChange} />
            </label>
            <br />
            <button>Save</button>
          </form>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

const ModalDelete = ({ closeModal, gridRefClients, deleteFromClients }) => {
  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Are you sure you want to delete this item?</h2>
        <h5>{gridRefClients.current.api.getSelectedRows()[0].companyName}</h5>
        <div>
          <button onClick={deleteFromClients}>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

const ModalAdding = ({ addClient, closeModal }) => {
  // const [companyName, setCompanyName] = useState()
  // const [boughtCopies, setBoughtCopies] = useState()
  // const [companyId, setCompanyId] = useState()
  // const [clientId, setClientId] = useState()

  // const handleChange = (e) => {
  //   e.preventDefault()

  //   const { name, value } = e.target
  //   if (name === 'companyId') {
  //     setCompanyId(value)
  //   } else if (name === 'clientId') {
  //     setClientId(value)
  //   } else if (name === 'companyName') {
  //     setCompanyName(value)
  //   } else if (name === 'boughtCopies') {
  //     setBoughtCopies(value)
  //   }
  // }

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Adding a new client</h2>
        <div>
          <form onSubmit={handleSubmit(addClient)}>
            <input
              type='number'
              placeholder='Company ID'
              {...register('Company ID', { required: true, max: 99999, min: 1, maxLength: 6 })}
            />
            {errors['Company ID'] && (
              <span>
                {errors['Company ID'].type === 'required' ? 'Company ID is required' : 'Company ID must be between 1 and 99999'}
              </span>
            )}
            <input
              type='number'
              placeholder='Client ID'
              {...register('Client ID', { required: true, max: 99999, min: 1, maxLength: 6 })}
            />
            {errors['Client ID'] && (
              <span>
                {errors['Client ID'].type === 'required' ? 'Client ID is required' : 'Client ID must be between 1 and 99999'}
              </span>
            )}
            <input
              type='text'
              placeholder='Company Name'
              {...register('Company Name', { required: true, min: 3, maxLength: 60 })}
            />
            {errors['Company Name'] && (
              <span>
                {errors['Company Name'].type === 'required'
                  ? 'Company Name is required'
                  : 'Company Name must be between 3 and 60 characters'}
              </span>
            )}
            <input
              type='number'
              placeholder='Bought Copies'
              {...register('Bought Copies', { required: true, max: 99999, min: 0, maxLength: 6 })}
            />
            {errors['Bought Copies'] && (
              <span>
                {errors['Bought Copies'].type === 'required'
                  ? 'Bought Copies is required'
                  : 'Bought Copies must be between 0 and 99999'}
              </span>
            )}
            <button>Add client</button>
          </form>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ModalWindow
