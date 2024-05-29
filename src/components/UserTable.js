import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { clientsUsersTableNames } from '../data/clientsUsersTable'
import Container from 'react-bootstrap/Container'

const UserTable = (props) => {
  const gridRefUsers = React.useRef()
  return (
    <Container className='ag-theme-quartz-dark p-0 m-20 '>
      <div>
        <AgGridReact
          domLayout={'autoHeight'}
          ref={gridRefUsers}
          columnDefs={clientsUsersTableNames}
          rowData={props.clientsUsersTable}
          pagination={true}
          paginationPageSize={30}
        />
      </div>
    </Container>
  )
}

export default UserTable
