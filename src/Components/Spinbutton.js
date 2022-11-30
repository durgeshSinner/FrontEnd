import './CSS/Navbar.css'
import React from 'react'


function Spinbutton(props) {
    return (
        <button className='custombutton' onClick={props.onclick}>SPIN THE WHEEL</button>
      )
}

export default Spinbutton