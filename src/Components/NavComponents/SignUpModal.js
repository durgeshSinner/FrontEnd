import React, { useEffect, useState } from 'react'
import '../CSS/Modal.css'
import '../CSS/Navbar.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpModal(props) {
  //state to change validity of input fields
  const [whitespacefields, setwhitespacefields] = useState({
    email: { display: false, message: "" },
    password: { display: false, message: "" },
    phonenumber: { display: false, message: "" },
    username: { display: false, message: "" },
    streetname: { display: false, message: "" },
    cityname: { display: false, message: "" },
    pincode: { display: false, message: "" },
    state: { display: false, message: "" }
  })
  //list of current users for duplicate entry userEmail
  const [usernames, setusenames] = useState([])
  const notify = (message) => {
    toast(message);
  }
  //axios call to get all users
  useEffect(() => {
    axios.get("http://localhost:8080/getusers")
      .then(response => {
        setusenames([...response.data])
      })
      .catch(e => console.log(e))
  }, [])

  //format validations
  const emailvalidation = (e) => {
    const userEmail = e.target.value
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (userEmail.match(mailformat)){
      if (usernames.filter(username => {
        return username === userEmail
      }).length !== 0) { setwhitespacefields({ ...whitespacefields, email: { display: true, message: "Username already Exists" } })}
      else { setwhitespacefields({ ...whitespacefields, email: { display: false, message: "" } }) }
    }
    else{setwhitespacefields({ ...whitespacefields, email: { display: true, message: "Email format Wrong" } }) }
  }
  const phonevalidation = (e) => {
    var phoneno = /^\d{10}$/;
    if (!e.target.value.match(phoneno)) {setwhitespacefields({ ...whitespacefields, phonenumber: { display: true, message: "Please Enter a 10 digit PHONE no" } }) }
    else {setwhitespacefields({ ...whitespacefields, phonenumber: { display: false, message: "" } })  }

  }
  const pincodevalidation = (e) => {
    var pinno = /^\d{6}$/;
    if (!e.target.value.match(pinno)) {setwhitespacefields({ ...whitespacefields, pincode: { display: true, message: "Please Enter a 6 digit PINCODE" } })}
    else { setwhitespacefields({ ...whitespacefields, pincode: { display: false, message: "" } })  }

  }
  //on submit validation
  const formvalidation = (e) => {
    if (e.target.form[0].value === "" || whitespacefields.email.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately") }
    else if (e.target.form[1].value === "" || whitespacefields.password.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[2].value === "" || whitespacefields.phonenumber.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[3].value === "" || whitespacefields.username.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[4].value === "" || whitespacefields.streetname.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[5].value === "" || whitespacefields.cityname.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[6].value === "" || whitespacefields.pincode.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[7].value === "" || whitespacefields.state.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else {
      return Promise.resolve("Filled")
    }
  }
  //onsubmit
  const formsubmit = (e) => {
    e.preventDefault();
    console.log(e.target.form[0].value)
    const signupdetails = {
      credentials: {
        userEmail: e.target.form[0].value,
        password: e.target.form[1].value
      },
      userName: e.target.form[3].value,
      userAddress: {
        city: e.target.form[4].value,
        pincode: e.target.form[5].value,
        street: e.target.form[6].value,
        state: e.target.form[7].value
      },
      userPhone: e.target.form[2].value
    }
    formvalidation(e).then(() => {
      axios.post('http://localhost:8080/signup', signupdetails)
        .then(Response => {
          console.log(Response)
          notify("Sucessfully Registered")
          props.closesignup()
          props.openlogin()
        })
    }).catch(e => console.log(e))
  }
  
  return (
    <>
      <div className='modalBackground'>
        <div className='modalContainer' style={{ height: "550px", width: "700px" }}>
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
                        if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, email: { display: true, message: "Cant leave Email empty" } }) }
                        else { emailvalidation(event)}
                      }}
                    >
                    </input>
                    {whitespacefields.email.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.email.message}</div>}
                  </div>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <input type="password" className='inputstyle'
                      onBlur={(event) => {
                        if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, password: { display: true, message: "Cant leave Password empty" } }) }
                        else { setwhitespacefields({ ...whitespacefields, password: { display: false, message: "" } }) }
                      }}
                      placeholder="Password"></input>
                    {whitespacefields.password.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.password.message}</div>}

                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <input type="text" className='inputstyle'
                      onBlur={(event) => {
                        if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, phonenumber: { display: true, message: "Cant leave Phone Number empty" } }) }
                        else {phonevalidation(event)}
                      }}
                      placeholder='Phone Number'></input>
                    {whitespacefields.phonenumber.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.phonenumber.message}</div>}

                  </div>
                  <div className='col-sm-6 inputconstainerstyle' >
                    <input type="text" className='inputstyle'
                      onBlur={(event) => {
                        if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, username: { display: true, message: "Cant leave User Name empty" } }) }
                        else { setwhitespacefields({ ...whitespacefields, username: { display: false, message: "" } }) }
                      }}
                      placeholder='User Name'></input>
                    {whitespacefields.username.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.username.message}</div>}

                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <input type="text" className='inputstyle'
                      onBlur={(event) => {
                        if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, streetname: { display: true, message: "Cant leave street name empty" } }) }
                        else { setwhitespacefields({ ...whitespacefields, streetname: { display: false, message: "" } }) }
                      }}
                      placeholder='Street Name'></input>
                    {whitespacefields.streetname.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.streetname.message}</div>}

                  </div>
                  <div className='col-sm-6 inputconstainerstyle' >
                    <input type="text" className='inputstyle'
                      onBlur={(event) => {
                        if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, cityname: { display: true, message: "Cant leave city name empty" } }) }
                        else { setwhitespacefields({ ...whitespacefields, cityname: { display: false, message: "" } }) }
                      }}
                      placeholder='City Name'></input>
                    {whitespacefields.cityname.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.cityname.message}</div>}

                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <input type="text" className='inputstyle'
                      onBlur={(event) => {
                        if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, pincode: { display: true, message: "Cant leave pincode empty" } }) }
                        else { pincodevalidation(event) }
                      }}
                      placeholder='Pin Code'></input>
                    {whitespacefields.pincode.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.pincode.message}</div>}

                  </div>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <select className='inputstyle'
                      onBlur={(event) => {
                        if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, state: { display: true, message: "Cant leave State empty" } }) }
                        else { setwhitespacefields({ ...whitespacefields, state: { display: false, message: "" } }) }
                      }}
                      defaultValue=''>
                      <option className='inputstyle' value=''></option>
                      <option value='Andaman and Nicobar Islands'>Andaman and Nicobar Islands</option>
                      <option value='Andhra Pradesh'>Andhra Pradesh</option>
                      <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                      <option value='Assam'>Assam</option>
                      <option value='Bihar'>Bihar</option>
                      <option value='Chandigarh'>Chandigarh</option>
                      <option value='Chhattisgarh'>Chhattisgarh</option>
                      <option value='Dadra and Nagar Haveli'>Dadra and Nagar Haveli</option>
                      <option value='Daman and Diu'>Daman and Diu</option>
                      <option value='Delhi'>Delhi</option>
                      <option value='Goa'>Goa</option>
                      <option value='Gujarat'>Gujarat</option>
                      <option value='Haryana'>Haryana</option>
                      <option value='Himachal Pradesh'>Himachal Pradesh</option>
                      <option value='Jammu and Kashmir'>Jammu and Kashmir</option>
                      <option value='Jharkhand'>Jharkhand</option>
                      <option value='Karnataka'>Karnataka</option>
                      <option value='Kerala'>Kerala</option>
                      <option value='Lakshadweep'>Lakshadweep</option>
                      <option value='Madhya Pradesh'>Madhya Pradesh</option>
                      <option value='Maharashtra'>Maharashtra</option>
                      <option value='Manipur'>Manipur</option>
                      <option value='Meghalaya'>Meghalaya</option>
                      <option value='Mizoram'>Mizoram</option>
                      <option value='Nagaland'>Nagaland</option>
                      <option value='Orissa'>Orissa</option>
                      <option value='Pondicherry'>Pondicherry</option>
                      <option value='Punjab'>Punjab</option>
                      <option value='Rajasthan'>Rajasthan</option>
                      <option value='Sikkim'>Sikkim</option>
                      <option value='Tamil Nadu'>Tamil Nadu</option>
                      <option value='Tripura'>Tripura</option>
                      <option value='Uttaranchal'>Uttaranchal</option>
                      <option value='Uttar Pradesh'>Uttar Pradesh</option>
                      <option value='West Bengal'>West Bengal</option>
                    </select>
                    {whitespacefields.state.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.state.message}</div>}

                  </div>
                </div>
              </div>
              <div className='footer '>
                <button className="custombutton" style={{ width: "300px" }} onClick={formsubmit} >Sign UP</button>
              </div>
            </form >
          </div >
          <div className='row m-4 justify-content-between'>
            <div className='col-sm-5 ' style={{ color: "white", fontWeight: "600", textShadow: "1px 1px 5px red" }}>Existing User ?</div>
            <button className="custombutton col-sm-6" style={{ height: "30px" }} id='cancelBtn' onClick={() => { props.closesignup(); props.openlogin() }} >Log IN</button>
          </div>

        </div >
      </div >
    </>
  )
}

export default SignUpModal