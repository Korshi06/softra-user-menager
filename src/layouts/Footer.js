import React from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className=' bg-dark text-white  text-center'>
      <Container>
        <Row>
          <Col md='10'>
            <ul className='list-unstyled'>
              <li>
                <NavLink to='/' className='text-white'>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/login' className='text-white'>
                  Zaloguj się
                </NavLink>
              </li>
              <li>
                <NavLink to='/clientInfoPage' className='text-white'>
                  O klientach
                </NavLink>
              </li>
              <li>
                <NavLink to='/userInfoPage' className='text-white'>
                  Użytkownicy
                </NavLink>
              </li>
            </ul>
          </Col>
          <Col md='2'>
            <p>&copy; Softra 2024 </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
