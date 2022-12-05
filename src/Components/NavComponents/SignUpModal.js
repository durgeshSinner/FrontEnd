import React, { useEffect, useState } from 'react'
import '../CSS/Modal.css'
import '../CSS/Navbar.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpModal(props) {
  const [whitespacefields, setwhitespacefields] = useState({
    email: false,
    password: false,
    phonenumber: false,
    username: false,
    streetname: false,
    cityname: false,
    pincode: false,
    state: false
  })
  const [usernames, setusenames] = useState([])
  const [validateEmail, setvalidateEmail] = useState(true)
  const [validatephone, setvalidatephone] = useState(false)
  const [validatepincode, setvalidatepincode] = useState(false)
  const notify = (message) => {
    toast(message);
  }

  useEffect(() => {
    axios.get("http://localhost:8080/getusers")
      .then(response => {
        setusenames([...response.data])
      })
      .catch(e => console.log(e))
  }, [])

  const validation = (e) => {
    setwhitespacefields(0);
    const userEmail = e.target.value
    if (usernames.filter(username => {
      return username === userEmail
    }).length != 0) { setvalidateEmail(false) }
    else { setvalidateEmail(true) }
  }
  const formvalidation = (e) => {
    if (e.target.form[0].value === "" || !validateEmail) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately") }
    else if (e.target.form[1].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[2].value === "" || validatephone) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[3].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[4].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[5].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[6].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else if (e.target.form[7].value === "" || validatepincode) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
    else {
      return Promise.resolve("Filled")
    }
  }
  const phonevalidation = (e) => {
    var phoneno = /^\d{10}$/;
    if (!e.target.value.match(phoneno)) { setvalidatephone(true) }
    else{setvalidatephone(false)}

  }
  const pincodevalidation = (e) => {
    var pinno = /^\d{6}$/;
    if (!e.target.value.match(pinno)) { setvalidatepincode(true) }
    else{setvalidatepincode(false)}

  }

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
        })
    }).catch(e => console.log(e))
  }
  return (
    <>
      <div className='modalBackground'>
        <div className='modalContainer' style={{ height: "550px", width: "700px" }}>
          <div className='titleCloseBtn'><button onClick={() => { props.closemodal() }}>X</button></div>
          <div className='title'>
            Sign up
          </div>
          <div className='body' >
            <form>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <input type="email" className='inputstyle' placeholder="Enter Email"
                      onChange={(event) => {
                        validation(event)
                        if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, email: true }) }
                        else { setwhitespacefields({ ...whitespacefields, email: false }) }
                      }} >

                    </input>
                    {!validateEmail && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>User Email already exists</div>}
                    {whitespacefields.email && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>Can't leave this field empty</div>}
                  </div>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <input type="password" className='inputstyle' onChange={(event) => {
                      if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, password: true }) }
                      else { setwhitespacefields({ ...whitespacefields, password: false }) }
                    }} placeholder="Password"></input>
                    {whitespacefields.password && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>Can't leave this field empty</div>}

                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <input type="text" className='inputstyle' onChange={(event) => {
                      phonevalidation(event);
                      if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, phonenumber: true }) }
                      else { setwhitespacefields({ ...whitespacefields, phonenumber: false }) }
                    }} placeholder='Phone Number'></input>
                    {whitespacefields.phonenumber && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>Can't leave this field empty</div>}
                    {validatephone && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>must be a number of 10 digits</div>}

                  </div>
                  <div className='col-sm-6 inputconstainerstyle' >
                    <input type="text" className='inputstyle' onChange={(event) => {

                      if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, username: true }) }
                      else { setwhitespacefields({ ...whitespacefields, username: false }) }
                    }} placeholder='User Name'></input>
                    {whitespacefields.username && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>Can't leave this field empty</div>}

                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <input type="text" className='inputstyle' onChange={(event) => {

                      if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, streetname: true }) }
                      else { setwhitespacefields({ ...whitespacefields, streetname: false }) }
                    }} placeholder='Street Name'></input>
                    {whitespacefields.streetname && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>Can't leave this field empty</div>}

                  </div>
                  <div className='col-sm-6 inputconstainerstyle' >
                    <input type="text" className='inputstyle' onChange={(event) => {

                      if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, cityname: true }) }
                      else { setwhitespacefields({ ...whitespacefields, cityname: false }) }
                    }} placeholder='City Name'></input>
                    {whitespacefields.cityname && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>Can't leave this field empty</div>}

                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <input type="text" className='inputstyle' onChange={(event) => {
                      pincodevalidation(event);
                      if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, pincode: true }) }
                      else { setwhitespacefields({ ...whitespacefields, pincode: false }) }
                    }} placeholder='Pin Code'></input>
                    {whitespacefields.pincode && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>Can't leave this field empty</div>}
                    {validatepincode && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>must be a number of 6 digits</div>}

                  </div>
                  <div className='col-sm-6 inputconstainerstyle'>
                    <select className='inputstyle' onChange={(event) => {

                      if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, state: true }) }
                      else { setwhitespacefields({ ...whitespacefields, state: false }) }
                    }} defaultValue=''>
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
                    {whitespacefields.state && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>Can't leave this field empty</div>}

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
            <button className="custombutton col-sm-6" style={{ height: "30px" }} id='cancelBtn' onClick={() => { props.closemodal(); props.loginmodal(true) }} >Log IN</button>
          </div>

        </div >
      </div >
    </>
  )
}

export default SignUpModal