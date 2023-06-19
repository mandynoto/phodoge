import React from 'react'
import { ReactComponent as Logo } from '../images/logo.svg'
import '../css/hyperlink-footer.css'

const Footer = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Logo
          alt="Logo"
          style={{ width: '12px', height: '24px', marginRight: '5px' }}
        />
        <p style={{ margin: '0', fontSize: '8px', color: '#8c8c8c' }}>
          Logo&nbsp;
          <a href="https://www.kittl.com" className="footer-link">
            Created with www.kittl.com
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
