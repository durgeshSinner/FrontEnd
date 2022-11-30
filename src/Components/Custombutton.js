import React from 'react'
import './CSS/Navbar.css'

function Custombutton(props) {
  return (
    <button className='custombutton' onClick={props.onclick}>{props.message}</button>
  )
}

export default Custombutton