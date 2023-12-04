import React from 'react'
import logo from './Logo/logo.png'

function Logo({width = '100px'}) {
  return (
    <div>
      <img src={logo} alt="Logo" style={{ width:"50%"}} />
    </div>
  )
}

export default Logo