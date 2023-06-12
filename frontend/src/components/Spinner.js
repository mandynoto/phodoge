import React from 'react'
import { Spinner as Loader } from 'react-bootstrap'

const spinnerStyle = {
  position: 'absolute',
  top: 'calc(35% - 1rem)',
  left: 'calc(50% - 1rem)',
}

const Spinner = () => (
  <Loader style={spinnerStyle} animation="grow" variant="secondary" />
)

export default Spinner
