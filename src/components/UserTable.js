import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { clientsUsersTableNames } from '../data/clientsUsersTable'
import Container from 'react-bootstrap/Container'
import { dataStore } from '../store/DataStore'

const UserTable = ({ gridRefUsers }) => {
  return (
    <Container className='ag-theme-quartz-dark p-0 m-20 '>
      <div>
        <AgGridReact
          ref={gridRefUsers}
          domLayout={'autoHeight'}
          rowSelection='single'
          columnDefs={clientsUsersTableNames}
          rowData={dataStore.getState().DataReducer.aboutCompany}
          pagination={true}
          paginationPageSize={50}
        />
      </div>
    </Container>
  )
}

export default UserTable
