import React, { useState, useEffect } from 'react'
import '../CSS/Modal.css'
import '../CSS/Navbar.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserForm from './UserForm';

function SignUpModal(props) {
  //list of current users for duplicate entry userEmail
  const [usernames, setusenames] = useState([])

  //axios call to get all users
  useEffect(() => {
    axios.get("http://localhost:8080/getusers")
      .then(response => {
        setusenames([...response.data])
      })
      .catch(e => console.log(e))
  }, [])

  const notify = (message) => {
    toast(message);
  }

  const [EmailPassValid, setEmailPassValid] = useState({
    email: { display: false, message: "" },
    password: { display: false, message: "" }
  })
  //format validations
  const emailvalidation = (e) => {
    const userEmail = e.target.value
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (userEmail.match(mailformat)) {
      if (usernames.filter(username => {
        return username === userEmail
      }).length !== 0) { setEmailPassValid({ ...EmailPassValid, email: { display: true, message: "Username already Exists" } }) }
      else { setEmailPassValid({ ...EmailPassValid, email: { display: false, message: "" } }) }
    }
    else { setEmailPassValid({ ...EmailPassValid, email: { display: true, message: "Email format Wrong" } }) }
  }
  //onsubmit
  const formsubmit = (e, formvalidation) => {
    e.preventDefault();
    console.log(e.target.form[0].value)
    const signupdetails = {
      credentials: {
        userEmail: e.target.form[0].value,
        password: e.target.form[1].value
      },
      userName: e.target.form[3].value,
      userAddress: {
        city: e.target.form[5].value,
        pincode: e.target.form[6].value,
        street: e.target.form[4].value,
        state: e.target.form[7].value
      },
      userPhone: e.target.form[2].value
    }
    formvalidation(e)
      .then(() => {
        axios.post('http://localhost:8080/signup', signupdetails)
          .then(Response => {
            console.log(Response)
            notify("Sucessfully Registered")
            props.closesignup()
            props.openlogin()
          })
      })
      .catch(e => console.log(e))
  }
  const details = {
    userName: "",
    userAddress: { city: "", state: "", pincode: "", street: "" },
    userPhone: ""
  }
  return (
    <>
      <div className='modalBackground'>
        <div className='modalContainer' style={{ height: "600px", width: "700px" }}>
          <div className='titleCloseBtn'><button onClick={() => { props.closesignup() }}>X</button></div>
          <div className='title'>
            Sign up
          </div>
          <div className='body' >
            <form>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <input type="email" className='inputstyle' placeholder="Enter Email"
                      onBlur={(event) => {
                        if (event.target.value === "") { setEmailPassValid({ ...EmailPassValid, email: { display: true, message: "Cant leave Email empty" } }) }
                        else { emailvalidation(event) }
                      }}
                    >
                    </input>
                    {EmailPassValid.email.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{EmailPassValid.email.message}</div>}
                  </div>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <input type="password" className='inputstyle'
                      onBlur={(event) => {
                        if (event.target.value === "") { setEmailPassValid({ ...EmailPassValid, password: { display: true, message: "Cant leave Password empty" } }) }
                        else { setEmailPassValid({ ...EmailPassValid, password: { display: false, message: "" } }) }
                      }}
                      placeholder="Password"></input>
                    {EmailPassValid.password.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{EmailPassValid.password.message}</div>}

                  </div>
                </div>
                <UserForm formsubmit={formsubmit} EmailPassValid={EmailPassValid} details={details} usage={"Sign Up"} />
              </div>

            </form >
          </div >
          <div className='row m-1 justify-content-between' style={{position :"absolute",bottom : 0, right : 0}}>
            <div className='col-sm-5 ' style={{ color: "white", fontWeight: "600", textShadow: "1px 1px 5px red" }}>Existing User ?</div>
            <button className="custombutton col-sm-6" style={{ height: "25px" }} id='cancelBtn' onClick={() => { props.closesignup(); props.openlogin() }} >Log IN</button>
          </div>
        </div >
      </div >
    </>
  )
}

export default SignUpModal