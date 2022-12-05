import axios from 'axios'
import React, { useState } from 'react'
import '../CSS/Modal.css'
import '../CSS/Navbar.css'

function LoginModal(props) {
  const [login, setlogin] = useState(true)

  const formsubmit = (e) => {
    e.preventDefault()
    console.log(e.target.form[0].value)
    console.log(e.target.form[1].value)
    axios.post('http://localhost:8080/token', {
      userEmail: `${e.target.form[0].value}`,
      password: `${e.target.form[1].value}`
    })
      .then(Response => {
        console.log(Response)
        localStorage.setItem('token', Response.data.token)
        localStorage.setItem('Id', Response.data.id)
        localStorage.setItem('role', Response.data.role)
        props.setuserLogged({
          logged: true,
          id: Response.data.id,
          role: Response.data.role
        })
        props.closemodal()

      })
      .catch(e => { console.log(e); setlogin(false) })

  }

  return (
    <>
      <div className='modalBackground'>
        <div className='modalContainer'>
          <div className='titleCloseBtn'><button onClick={() => { props.closemodal() }}>X</button></div>
          <div className='title'>
            Log In
          </div>
          <div className='body' >
            <form>
              <input type="email" className=" inputstyle mt-4" placeholder="Enter email" onChange={() => { setlogin(true) }} />
              <input type="password" className="inputstyle mt-4 " placeholder="Password" onChange={() => { setlogin(true) }} />
              {!login && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>Wrong Credentials</div>}

              <div className='footer mt-5'>
                <button className="custombutton" style={{ width: "300px" }} onClick={formsubmit} >Log In</button>
              </div>
            </form>
          </div>
          <div className='row m-4 justify-content-between'>
            <div className='col-sm-4 ' style={{ color: "white", fontWeight: "600", textShadow: "1px 1px 5px red" }}>Not a User ?</div>
            <button className="custombutton col-sm-6" style={{ height: "30px" }} id='cancelBtn' onClick={() => { props.closemodal(); props.signupmodal(true) }} >Sign up</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginModal