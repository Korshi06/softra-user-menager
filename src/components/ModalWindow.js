import React from 'react'
import ReactDOM from 'react-dom'
import '../styles/modalWindow.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ModalWindow = ({
  openModal = false,
  closeModal = () => {},
  editing = false,
  gridRef = { current: { api: { getSelectedRows: () => {} } } },
  adding = false,
  addClient = () => {},
  editClient = () => {},
  deleteFromClients = () => {},
  clientPage = false,
  editUser = () => {},
  deleteFromUsers = () => {},
  addUser = () => {},
  deactivation = false,
  deactivateUser = () => {},
}) => {
  if (!openModal) return null

  if (adding) {
    return <ModalAdding addClient={addClient} addUser={addUser} closeModal={closeModal} clientPage={clientPage} />
  }

  if (gridRef.current.api.getSelectedRows()[0] === undefined) {
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
      {clientPage
        ? editing
          ? ModalEditClient({ closeModal, gridRef, editClient })
          : ModalDeleteClient({ closeModal, gridRef, deleteFromClients })
        : editing
        ? ModalEditUser({ closeModal, gridRef, editUser })
        : ModalDeleteUser({ closeModal, gridRef, deleteFromUsers })}
      {deactivation ? ModalDeactivateUser({ closeModal, gridRef, deactivateUser }) : null}
    </>,
    document.getElementById('portal')
  )
}

const ModalDeactivateUser = ({ closeModal, gridRef, deactivateUser }) => {
  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Are you sure you want to deactivate this user?</h2>
        <h5>{gridRef.current.api.getSelectedRows()[0].Użytkownik}</h5>
        <div>
          <button onClick={deactivateUser}>Deactivate</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

const ModalEditClient = ({ closeModal, gridRef, editClient }) => {
  const [companyName, setCompanyName] = useState(gridRef.current.api.getSelectedRows()[0].companyName)
  const [boughtCopies, setBoughtCopies] = useState(gridRef.current.api.getSelectedRows()[0].boughtCopies)

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
        <h2>Editing {gridRef.current.api.getSelectedRows()[0].companyName}</h2>
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

const ModalEditUser = ({ closeModal, gridRef, editUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Edytowanie: Editing {gridRef.current.api.getSelectedRows()[0].Użytkownik}</h2>
        <div>
          <form onSubmit={handleSubmit(editUser)}>
            <input
              type='number'
              defaultValue={gridRef.current.api.getSelectedRows()[0].IdWlascicielaFirmy}
              placeholder='IdWlascicielaFirmy'
              {...register('IdWlascicielaFirmy', { required: true, min: 1 })}
            />
            {errors.IdWlascicielaFirmy && <span>IdWlascicielaFirmy is required and must be greater than 0</span>}

            <input
              type='text'
              defaultValue={gridRef.current.api.getSelectedRows()[0].Użytkownik}
              placeholder='Użytkownik'
              {...register('Użytkownik', { required: true, minLength: 3, maxLength: 50 })}
            />
            {errors.Użytkownik && (
              <span>
                {errors.Użytkownik.type === 'required'
                  ? 'Użytkownik is required'
                  : 'Użytkownik must be between 3 and 50 characters'}
              </span>
            )}

            <input
              type='text'
              defaultValue={gridRef.current.api.getSelectedRows()[0].NrIMEI}
              placeholder='Nr IMEI'
              {...register('NrIMEI', { required: true, minLength: 12, maxLength: 12 })}
            />
            {errors.NrIMEI && (
              <span>{errors.NrIMEI.type === 'required' ? 'Nr IMEI is required' : 'Nr IMEI must be exactly 12 characters'}</span>
            )}

            <input
              type='text'
              defaultValue={gridRef.current.api.getSelectedRows()[0].NazwaUrządzenia}
              placeholder='NazwaUrzadzenia'
              {...register('NazwaUrzadzenia', { required: true, minLength: 3, maxLength: 50 })}
            />
            {errors.NazwaUrządzenia && (
              <span>
                {errors.NazwaUrządzenia.type === 'required'
                  ? 'Nazwa Urządzenia is required'
                  : 'Nazwa Urządzenia must be between 3 and 50 characters'}
              </span>
            )}

            <input
              type='text'
              defaultValue={gridRef.current.api.getSelectedRows()[0].Dział}
              placeholder='Dział'
              {...register('Dzial', { required: true, minLength: 3, maxLength: 50 })}
            />
            {errors.Dział && (
              <span>{errors.Dział.type === 'required' ? 'Dział is required' : 'Dział must be between 3 and 50 characters'}</span>
            )}

            <input
              type='text'
              defaultValue={gridRef.current.api.getSelectedRows()[0].NrTelefonu}
              placeholder='Nr Telefonu'
              {...register('NrTelefonu', { required: true, pattern: /^\d{3}-\d{3}-\d{4}$/ })}
            />
            {errors.NrTelefonu && (
              <span>
                {errors.NrTelefonu.type === 'required'
                  ? 'Nr Telefonu is required'
                  : 'Nr Telefonu must follow the pattern 123-456-7890'}
              </span>
            )}

            <input
              type='text'
              defaultValue={gridRef.current.api.getSelectedRows()[0]['Wersja aplikacji']}
              placeholder='Wersja aplikacji'
              {...register('WersjaAplikacji', { required: true, pattern: /^\d+\.\d+$/ })}
            />
            {errors['Wersja aplikacji'] && (
              <span>
                {errors['Wersja aplikacji'].type === 'required'
                  ? 'Wersja aplikacji is required'
                  : 'Wersja aplikacji must follow the pattern 1.0'}
              </span>
            )}

            <input
              type='date'
              defaultValue={gridRef.current.api.getSelectedRows()[0].ostatniaAktywność.slice()}
              placeholder='Ostatnia Aktywność'
              {...register('ostatniaAktywność')}
            />

            <label>
              Aktywny
              <input type='checkbox' {...register('Aktywny')} />
            </label>

            <button type='submit'>Submit</button>
          </form>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

const ModalDeleteClient = ({ closeModal, gridRef, deleteFromClients }) => {
  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Are you sure you want to delete this item?</h2>
        <h5>{gridRef.current.api.getSelectedRows()[0].companyName}</h5>
        <div>
          <button onClick={deleteFromClients}>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

const ModalDeleteUser = ({ closeModal, gridRef, deleteFromUsers }) => {
  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Are you sure you want to delete this item?</h2>
        <h5>{gridRef.current.api.getSelectedRows()[0].Użytkownik}</h5>
        <div>
          <button onClick={deleteFromUsers}>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

const ModalAdding = ({ addClient, closeModal, addUser, clientPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  let Inputs = () => {}

  if (clientPage) {
    Inputs = () => {
      return (
        <form onSubmit={handleSubmit(addClient)}>
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
      )
    }
  } else if (!clientPage) {
    Inputs = () => {
      return (
        <form onSubmit={handleSubmit(addUser)}>
          <input
            type='number'
            placeholder='IdWlascicielaFirmy'
            {...register('IdWlascicielaFirmy', { required: true, max: 99999, min: 1, maxLength: 6 })}
          />
          {errors['IdWlascicielaFirmy'] && (
            <span>
              {errors['IdWlascicielaFirmy'].type === 'required'
                ? 'IdWlascicielaFirmy is required'
                : 'IdWlascicielaFirmy must be between 1 and 99999'}
            </span>
          )}
          <input type='text' placeholder='Użytkownik' {...register('Użytkownik', { required: true, min: 3, maxLength: 50 })} />
          {errors['Użytkownik'] && (
            <span>
              {errors['Użytkownik'].type === 'required'
                ? 'Użytkownik is required'
                : 'Użytkownik must be between 3 and 50 characters'}
            </span>
          )}
          <input type='text' placeholder='Nr IMEI' {...register('NrIMEI', { required: true, minLength: 12, maxLength: 12 })} />
          {errors['Nr IMEI'] && (
            <span>{errors['Nr IMEI'].type === 'required' ? 'Nr IMEI is required' : 'Nr IMEI must be exactly 12 characters'}</span>
          )}
          <input
            type='text'
            placeholder='Nazwa Urządzenia'
            {...register('NazwaUrzadzenia', { required: true, min: 3, maxLength: 50 })}
          />
          {errors['Nazwa Urządzenia'] && (
            <span>
              {errors['Nazwa Urządzenia'].type === 'required'
                ? 'Nazwa Urządzenia is required'
                : 'Nazwa Urządzenia must be between 3 and 50 characters'}
            </span>
          )}
          <input type='text' placeholder='Dział' {...register('Dzial', { required: true, min: 3, maxLength: 50 })} />
          {errors['Dział'] && (
            <span>{errors['Dział'].type === 'required' ? 'Dział is required' : 'Dział must be between 3 and 50 characters'}</span>
          )}
          <input
            type='text'
            placeholder='Nr Telefonu'
            {...register('NrTelefonu', { required: true, pattern: /^\d{3}-\d{3}-\d{4}$/ })}
          />
          {errors['Nr Telefonu'] && (
            <span>
              {errors['Nr Telefonu'].type === 'required'
                ? 'Nr Telefonu is required'
                : 'Nr Telefonu must follow the pattern 123-456-7890'}
            </span>
          )}
          <input
            type='text'
            placeholder='Wersja aplikacji'
            {...register('WersjaAplikacji', { required: true, pattern: /^\d+\.\d+$/ })}
          />
          {errors['Wersja aplikacji'] && (
            <span>
              {errors['Wersja aplikacji'].type === 'required'
                ? 'Wersja aplikacji is required'
                : 'Wersja aplikacji must follow the pattern 1.0'}
            </span>
          )}
          <input type='date' placeholder='Ostatnia Aktywność' {...register('ostatniaAktywność', { required: true })} />
          {errors['Ostatnia Aktywność'] && <span>Ostatnia Aktywność is required</span>}
          <label>
            Aktywny
            <input type='checkbox' {...register('Aktywny')} />
          </label>
          <button>Add user</button>
        </form>
      )
    }
  }

  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Adding</h2>
        <div>
          <Inputs />
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ModalWindow
