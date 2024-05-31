import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../styles/userInfoPage.css'
import { store } from '../store/UserLoggedStore'
import { dataStore } from '../store/DataStore'

const CompanyInfo = () => {
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
          <h5>Pozostało do wykorzystania:</h5>
          <h3>
            {boughtCopies === undefined
              ? 'brak'
              : boughtCopies - dataStore.getState().DataReducer.aboutCompany.filter((user) => user.Aktywny === true).length}
          </h3>
        </Col>
      </Row>
    </Container>
  )
}

export default CompanyInfo
