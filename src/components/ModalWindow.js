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
          <h2>Wybierz wiersz by go edytować.</h2>
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
    } else if (name === 'boughtCopies') {
      setBoughtCopies(value)
    }
  }

  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Edytowanie {gridRefClients.current.api.getSelectedRows()[0].companyName}</h2>
        <div>
          <form onSubmit={editClient}>
            <label>
              Nazwa firmy:
              <input type='text' placeholder='Company Name' name='companyName' value={companyName} onChange={handleChange} />
            </label>
            <label>
              Wykupione kopie:
              <input type='number' placeholder='Bought Copies' name='boughtCopies' value={boughtCopies} onChange={handleChange} />
            </label>
            <br />
            <button>Zapisz</button>
          </form>
          <button onClick={closeModal}>Anuluj</button>
        </div>
      </div>
    </div>
  )
}

const ModalDelete = ({ closeModal, gridRefClients, deleteFromClients }) => {
  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Czy jesteś pewien że chcesz usunąć te dane?</h2>
        <h5>{gridRefClients.current.api.getSelectedRows()[0].companyName}</h5>
        <div>
          <button onClick={deleteFromClients}>Usuń</button>
          <button onClick={closeModal}>Anuluj</button>
        </div>
      </div>
    </div>
  )
}

const ModalAdding = ({ addClient, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Dodawanie danych</h2>
        <div>
          <form onSubmit={handleSubmit(addClient)}>
            <input
              type='number'
              placeholder='Company ID'
              {...register('Company ID', { required: true, max: 99999, min: 1, maxLength: 6 })}
            />
            {errors['Company ID'] && (
              <span>
                {errors['Company ID'].type === 'required'
                  ? 'Company ID jest wymagane'
                  : 'Company ID musi mieścić się w przedziale 1-99999'}
              </span>
            )}
            <input
              type='number'
              placeholder='Client ID'
              {...register('Client ID', { required: true, max: 99999, min: 1, maxLength: 6 })}
            />
            {errors['Client ID'] && (
              <span>
                {errors['Client ID'].type === 'required'
                  ? 'Client ID jest wymagane'
                  : 'Client ID musi mieścić się w przedziale 1-99999'}
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
                  ? 'Company Name jest wymagane'
                  : 'Company Name musi mieścić się w przedziale 3-60 znaków'}
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
                  ? 'Bought Copies jest wymagane'
                  : 'Bought Copies musi mieścić się w przedziale 0-99999'}
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
