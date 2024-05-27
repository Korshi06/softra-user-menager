import React from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/header.css'

const Header = () => {
  return (
    <header className='header bg-dark p-4'>
      <Container>
        <Row>
          <Col md='4'>
            <img src='https://picsum.photos/250/120' alt='logo' />
          </Col>

          <Col md='8'>
            <ul className='nav justify-content-center'>
              <li className='nav-item'>
                <NavLink to='/' className='nav-link text-white'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/login' className='nav-link text-white'>
                  Zaloguj się
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/clientInfoPage' className='nav-link text-white'>
                  O klientach
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/userInfoPage' className='nav-link text-white'>
                  Użytkownicy
                </NavLink>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header
