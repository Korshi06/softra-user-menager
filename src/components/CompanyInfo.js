import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../styles/userInfoPage.css'
import { store } from '../store/UserLoggedStore'

const CompanyInfo = (props) => {
  const { companyName, boughtCopies } = store.getState().UserLoginReducer.companyInfo

  return (
    <Container>
      <Row>
        <Col className='infoBlock'>
          <h5>Firma:</h5>
          <h3>{companyName === undefined ? 'brak' : companyName}</h3>
        </Col>
        <Col className='infoBlock'>
          <h5>Maksymalna liczba użytkowników:</h5>
          <h3>{boughtCopies === undefined ? 'brak' : boughtCopies}</h3>
        </Col>
        <Col className='infoBlock'>
          <h5>Pozostała do wykorzystania:</h5>
          <h3>{boughtCopies === undefined ? 'brak' : boughtCopies - props.clientsUsersTable.length}</h3>
        </Col>
      </Row>
    </Container>
  )
}

export default CompanyInfo
