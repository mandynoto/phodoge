import React from 'react'
import { Button } from 'react-bootstrap'
import '../css/app.css'

const Welcome = () => {
  return (
    <div className="splash">
      <h1>kita</h1>
      <p>Share photos</p>
      <p>
        <Button variant="primary" href="https://unsplash.com" target="_blank">
          Learn more
        </Button>
      </p>
    </div>
  )
}

export default Welcome
