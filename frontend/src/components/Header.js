import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { ReactComponent as Logo } from '../images/logo.svg'

const navbarStyle = {
  backgroundColor: '#fff9e3',
  height: '2.7rem',
}

const logoStyle = {
  maxWidth: '10rem',
  maxHeight: '2rem',
}

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo alt={title} style={logoStyle} />
        <Navbar.Brand href="/">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
