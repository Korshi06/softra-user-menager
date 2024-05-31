import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Container from 'react-bootstrap/Container'
import { aboutCompanyNames, aboutCompany } from '../data/aboutCompany'

const ClientTable = ({ gridRefClients }) => {
  return (
    <Container className='ag-theme-quartz-dark p-0 m-20 '>
      <div>
        <AgGridReact
          ref={gridRefClients}
          rowSelection='single'
          domLayout={'autoHeight'}
          columnDefs={aboutCompanyNames}
          rowData={aboutCompany}
          pagination={true}
          paginationPageSize={30}
        />
      </div>
    </Container>
  )
}

export default ClientTable
