import React from 'react'
import ReactDOM from 'react-dom'
import '../styles/modalWindow.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { store } from '../store/UserLoggedStore'

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
        <h2>Jesteś pewien że chcesz dezaktywować to konto?</h2>
        <h5>{gridRef.current.api.getSelectedRows()[0].Użytkownik}</h5>
        <div>
          <button onClick={deactivateUser}>Dezaktywuj</button>
          <button onClick={closeModal}>Anuluj</button>
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
              <br />
              <input type='text' placeholder='Company Name' name='companyName' value={companyName} onChange={handleChange} />
            </label>
            <label>
              Wykupione kopie:
              <br />
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
        {console.log(gridRef.current.api.getSelectedRows()[0])}
        <h2>Edytowanie: {gridRef.current.api.getSelectedRows()[0].Użytkownik}</h2>
        <div>
          <form onSubmit={handleSubmit(editUser)}>
            <label>
              Nazwa Urzadzenia
              <br />
              <input
                type='text'
                defaultValue={gridRef.current.api.getSelectedRows()[0].NazwaUrzadzenia}
                placeholder='Nazwa Urzadzenia'
                {...register('NazwaUrzadzenia', { required: true, minLength: 3, maxLength: 50 })}
              />
            </label>
            {errors.NazwaUrzadzenia && (
              <span>
                {errors.NazwaUrzadzenia.type === 'required'
                  ? 'Pole Nazwa Urzadzenia jest wymagane'
                  : 'Pole Nazwa Urzadzenia musi mieścić się między 3 a 50 znakami'}
              </span>
            )}

            <label>
              Użytkownik
              <br />
              <input
                type='text'
                defaultValue={gridRef.current.api.getSelectedRows()[0].Użytkownik}
                placeholder='Użytkownik'
                {...register('Użytkownik', { required: true, minLength: 3, maxLength: 50 })}
              />
            </label>
            {errors.Użytkownik && (
              <span>
                {errors.NazwaUrzadzenia.type === 'required'
                  ? 'Pole Użytkownik jest wymagane'
                  : 'Pole Użytkownik musi mieścić się między 3 a 50 znakami'}
              </span>
            )}

            <label>
              Nr IMEI
              <br />
              <input
                type='number'
                defaultValue={gridRef.current.api.getSelectedRows()[0].NrIMEI}
                placeholder='Nr IMEI'
                {...register('NrIMEI', { required: true, minLength: 12, maxLength: 12 })}
              />
            </label>
            {errors.NrIMEI && (
              <span>
                {errors.NazwaUrzadzenia.type === 'required'
                  ? 'Pole Nr IMEI jest wymagane'
                  : 'Pole Nr IMEI musi składać się z 12 znaków'}
              </span>
            )}

            <label>
              Dział
              <br />
              <input
                type='text'
                defaultValue={gridRef.current.api.getSelectedRows()[0].Dział}
                placeholder='Dział'
                {...register('Dzial', { required: true, minLength: 3, maxLength: 50 })}
              />
            </label>
            {errors.Dział && (
              <span>
                {errors.Dział.type === 'required'
                  ? 'Pole Dział jest wymagane'
                  : 'Pole Dział musi mieścić się między 3 a 50 znakami'}
              </span>
            )}

            <label>
              Nr Telefonu
              <br />
              <input
                type='text'
                defaultValue={gridRef.current.api.getSelectedRows()[0].NrTelefonu}
                placeholder='Nr Telefonu'
                {...register('NrTelefonu', { required: true, pattern: /^\d{3}-\d{3}-\d{4}$/ })}
              />
            </label>
            {errors.NrTelefonu && (
              <span>
                {errors.NrTelefonu.type === 'required'
                  ? 'Pole Nr telefonu jest wymagane'
                  : 'Pole Nr telefonu musi być zgodne ze wzorem 123-456-7890'}
              </span>
            )}

            <label>
              Wersja aplikacji
              <br />
              <input
                type='text'
                defaultValue={gridRef.current.api.getSelectedRows()[0]['Wersja aplikacji']}
                placeholder='Wersja aplikacji'
                {...register('WersjaAplikacji', { required: true, pattern: /^\d+\.\d+$/ })}
              />
            </label>
            {errors.WersjaAplikacji && (
              <span>
                {errors.WersjaAplikacji.type === 'required'
                  ? 'Pole Wersja aplikacji jest wymagane'
                  : 'Pole Wersja aplikacji musi być zgodne ze wzorem 1.0'}
              </span>
            )}

            <label>
              Ostatnia Aktywność
              <br />
              <input
                type='date'
                defaultValue={gridRef.current.api.getSelectedRows()[0].ostatniaAktywność.slice()}
                placeholder='Ostatnia Aktywność'
                {...register('ostatniaAktywność')}
              />
            </label>

            <label>
              Aktywny
              <br />
              <input type='checkbox' checked={gridRef.current.api.getSelectedRows()[0].Aktywny} {...register('Aktywny')} />
            </label>

            <button type='submit'>Prześlij</button>
          </form>

          <button onClick={closeModal}>Anuluj</button>
        </div>
      </div>
    </div>
  )
}

const ModalDeleteClient = ({ closeModal, gridRef, deleteFromClients }) => {
  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Jesteś pewien że chcesz usunąć to konto?</h2>
        <h5>{gridRef.current.api.getSelectedRows()[0].companyName}</h5>
        <div>
          <button onClick={deleteFromClients}>Usuń</button>
          <button onClick={closeModal}>Anuluj</button>
        </div>
      </div>
    </div>
  )
}

const ModalDeleteUser = ({ closeModal, gridRef, deleteFromUsers }) => {
  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Jesteś pewien że chcesz usunąć to konto?</h2>
        <h5>{gridRef.current.api.getSelectedRows()[0].Użytkownik}</h5>
        <div>
          <button onClick={deleteFromUsers}>Usuń</button>
          <button onClick={closeModal}>Anuluj</button>
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
          <label>
            Nazwa firmy
            <br />
            <input
              type='text'
              placeholder='Nazwa firmy'
              {...register('Company Name', { required: true, min: 3, maxLength: 50 })}
            />
          </label>
          {errors['Company Name'] && (
            <span>
              {errors['Company Name'].type === 'required'
                ? 'Pole Nazwa firmy jest wymagane'
                : 'Pole Nazwa firmy musi mieścić się między 3 a 50 znakami'}
            </span>
          )}

          <label>
            Kupione kopie
            <br />
            <input
              type='number'
              placeholder='Kupione kopie'
              {...register('Bought Copies', { required: true, max: 99999, min: 0, maxLength: 6 })}
            />
          </label>
          {errors['Bought Copies'] && (
            <span>
              {errors['Bought Copies'].type === 'required'
                ? 'Pole Kupione kopie jest wymagane'
                : 'Pole Kupione kopie musi mieścić się między 0 a 99999'}
            </span>
          )}

          <button>Dodaj</button>
        </form>
      )
    }
  } else if (!clientPage) {
    Inputs = () => {
      return (
        <form onSubmit={handleSubmit(addUser)}>
          {store.getState().UserLoginReducer.isAdmin ? (
            <>
              <label>
                Id Właściciela
                <br />
                <input
                  type='number'
                  placeholder='Id Właściciela'
                  {...register('IdWlasciciela', { required: true, max: 99999, min: 1, maxLength: 6 })}
                />
              </label>
              {errors['IdWlasciciela'] && (
                <span>
                  {errors['IdWlasciciela'].type === 'required'
                    ? 'Pole Id właściciela jest wymagane'
                    : 'Pole Id właściciela musi mieścić się między 1 a 99999'}
                </span>
              )}
            </>
          ) : null}

          <label>
            Użytkownik
            <br />
            <input type='text' placeholder='Użytkownik' {...register('Użytkownik', { required: true, min: 3, maxLength: 50 })} />
          </label>
          {errors['Użytkownik'] && (
            <span>
              {errors['Użytkownik'].type === 'required'
                ? 'Pole użytkownik jest wymagane'
                : 'Pole użytkownik musi mieścić się między 3 a 50 znakami'}
            </span>
          )}

          <label>
            Nr IMEI
            <br />
            <input type='text' placeholder='Nr IMEI' {...register('NrIMEI', { required: true, minLength: 12, maxLength: 12 })} />
          </label>
          {errors['Nr IMEI'] && (
            <span>
              {errors['Nr IMEI'].type === 'required' ? 'Nr IMEI jest wymagany' : 'Nr IMEI musi mieć dokładnie 12 znaków'}
            </span>
          )}

          <label>
            Nazwa Urzadzenia
            <br />
            <input
              type='text'
              placeholder='Nazwa Urzadzenia'
              {...register('NazwaUrzadzenia', { required: true, min: 3, maxLength: 50 })}
            />
          </label>
          {errors['Nazwa Urzadzenia'] && (
            <span>
              {errors['Nazwa Urzadzenia'].type === 'required'
                ? 'Pole Nazwa Urzadzenia jest wymagane'
                : 'Pole Nazwa Urzadzenia musi mieścić się między 3 a 50 znakami'}
            </span>
          )}

          <label>
            Dział
            <br />
            <input type='text' placeholder='Dział' {...register('Dzial', { required: true, min: 3, maxLength: 50 })} />
          </label>
          {errors['Dział'] && (
            <span>
              {errors['Dział'].type === 'required'
                ? 'Pole Dział jest wymagane'
                : 'Pole Dział musi się mieścić między 3 a 50 znakami'}
            </span>
          )}

          <label>
            Nr Telefonu
            <br />
            <input
              type='text'
              placeholder='Nr Telefonu'
              {...register('NrTelefonu', { required: true, pattern: /^\d{3}-\d{3}-\d{4}$/ })}
            />
          </label>
          {errors['Nr Telefonu'] && (
            <span>
              {errors['Nr Telefonu'].type === 'required'
                ? 'Pole Nr telefonu jest wymagane'
                : 'Pole Nr telefonu musi być zgodne ze wzorem 123-456-7890'}
            </span>
          )}

          <label>
            Wersja aplikacji
            <br />
            <input
              type='text'
              placeholder='Wersja aplikacji'
              {...register('WersjaAplikacji', { required: true, pattern: /^\d+\.\d+$/ })}
            />
          </label>
          {errors['Wersja aplikacji'] && (
            <span>
              {errors['Wersja aplikacji'].type === 'required'
                ? 'Pole Wersja aplikacji jest wymagane'
                : 'Pole Wersja aplikacji musi być zgodne ze wzorem 1.0'}
            </span>
          )}

          <label>
            Ostatnia Aktywność
            <br />
            <input type='date' placeholder='Ostatnia Aktywność' {...register('ostatniaAktywność', { required: true })} />
          </label>
          {errors['Ostatnia Aktywność'] && <span>Pole Ostatnia Aktywność jest wymagane</span>}

          <label>
            Aktywny
            <br />
            <input type='checkbox' {...register('Aktywny')} />
          </label>

          <button>Dodaj</button>
        </form>
      )
    }
  }

  return (
    <div className='modalOverlay'>
      <div className='modalWindow'>
        <h2>Dodawanie</h2>
        <div>
          <Inputs />
          <button onClick={closeModal}>Anuluj</button>
        </div>
      </div>
    </div>
  )
}

export default ModalWindow
