import React from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/header.css'
import Logo from '../components/Logo'

const Header = () => {
  return (
    <header className='header p-4'>
      <Container>
        <Row>
          <Col md='4'>
            <Logo />
          </Col>
          <Col md='8'>
            <ul className='nav justify-content-center'>
              <li className='nav-item'>
                <NavLink to='/' className='nav-link text-black'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/login' className='nav-link text-black'>
                  Login
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/clientInfoPage' className='nav-link text-black'>
                  Client Info
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/userInfoPage' className='nav-link text-black'>
                  User Info
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
