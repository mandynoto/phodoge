import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { ReactComponent as Logo } from '../images/logo.svg'

const navbarStyle = {
  backgroundColor: '#181D2D',
}

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo alt={title} style={{ maxWidth: '10rem', maxHeight: '2rem' }} />
        <Navbar.Brand href="/">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
