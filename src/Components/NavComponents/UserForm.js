import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserForm(props) {
    const notify = (message) => {
        toast(message);
    }
    //state to change validity of input fields
    const [whitespacefields, setwhitespacefields] = useState({
        phonenumber: { display: false, message: "" },
        username: { display: false, message: "" },
        streetname: { display: false, message: "" },
        cityname: { display: false, message: "" },
        pincode: { display: false, message: "" },
        state: { display: false, message: "" }
    })

    //format validations

    const phonevalidation = (e) => {
        var phoneno = /^\d{10}$/;
        if (!e.target.value.match(phoneno)) { setwhitespacefields({ ...whitespacefields, phonenumber: { display: true, message: "Please Enter a 10 digit PHONE no" } }) }
        else { setwhitespacefields({ ...whitespacefields, phonenumber: { display: false, message: "" } }) }

    }
    const pincodevalidation = (e) => {
        var pinno = /^\d{6}$/;
        if (!e.target.value.match(pinno)) { setwhitespacefields({ ...whitespacefields, pincode: { display: true, message: "Please Enter a 6 digit PINCODE" } }) }
        else { setwhitespacefields({ ...whitespacefields, pincode: { display: false, message: "" } }) }

    }
    //on submit validation
    const formvalidation = (e) => {
        if (props.usage === "Sign Up") {
            if (e.target.form[0].value === "" || props.EmailPassValid.email.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately") }
            else if (e.target.form[1].value === "" || props.EmailPassValid.password.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
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
        else {
            if (e.target.form[0].value === "" || whitespacefields.phonenumber.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
            else if (e.target.form[1].value === "" || whitespacefields.username.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
            else if (e.target.form[2].value === "" || whitespacefields.streetname.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
            else if (e.target.form[3].value === "" || whitespacefields.cityname.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
            else if (e.target.form[4].value === "" || whitespacefields.pincode.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
            else if (e.target.form[5].value === "" || whitespacefields.state.display) { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
            else {
                return Promise.resolve("Filled")
            }
        }
    }
    return (

        <>
            <div className='row'>
                <div className='col-sm-6 inputconstainerstyle'>
                    <label className='inputstyle border-0'>Phone number</label>
                    <input type="number" className='inputstyle'
                        onBlur={(event) => {
                            if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, phonenumber: { display: true, message: "Cant leave Phone Number empty" } }) }
                            else { phonevalidation(event) }
                        }}
                        defaultValue={props.details.userPhone}></input>
                    {whitespacefields.phonenumber.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.phonenumber.message}</div>}

                </div>
                <div className='col-sm-6 inputconstainerstyle' >
                    <label className='inputstyle border-0'>User Name</label>
                    <input type="text" className='inputstyle'
                        onBlur={(event) => {
                            if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, username: { display: true, message: "Cant leave User Name empty" } }) }
                            else { setwhitespacefields({ ...whitespacefields, username: { display: false, message: "" } }) }
                        }}
                        defaultValue={props.details.userName}></input>
                    {whitespacefields.username.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.username.message}</div>}

                </div>
            </div>
            <div className='row'>
                <div className='col-sm-6 inputconstainerstyle'>
                    <label className='inputstyle border-0'>Street Name</label>
                    <input type="text" className='inputstyle'
                        onBlur={(event) => {
                            if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, streetname: { display: true, message: "Cant leave street name empty" } }) }
                            else { setwhitespacefields({ ...whitespacefields, streetname: { display: false, message: "" } }) }
                        }}
                        defaultValue={props.details.userAddress.street}></input>
                    {whitespacefields.streetname.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.streetname.message}</div>}

                </div>
                <div className='col-sm-6 inputconstainerstyle' >
                    <label className='inputstyle border-0'>City Name</label>
                    <input type="text" className='inputstyle'
                        onBlur={(event) => {
                            if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, cityname: { display: true, message: "Cant leave city name empty" } }) }
                            else { setwhitespacefields({ ...whitespacefields, cityname: { display: false, message: "" } }) }
                        }}
                        defaultValue={props.details.userAddress.city}></input>
                    {whitespacefields.cityname.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.cityname.message}</div>}

                </div>
            </div>
            <div className='row'>
                <div className='col-sm-6 inputconstainerstyle'>
                    <label className='inputstyle border-0'>Pin Code</label>
                    <input type="number" className='inputstyle'
                        onBlur={(event) => {
                            if (event.target.value === "") { setwhitespacefields({ ...whitespacefields, pincode: { display: true, message: "Cant leave pincode empty" } }) }
                            else { pincodevalidation(event) }
                        }}
                        defaultValue={props.details.userAddress.pincode}></input>
                    {whitespacefields.pincode.display && <div className='text-start' style={{ color: "red", fontSize: "13px" }}>{whitespacefields.pincode.message}</div>}

                </div>
                <div className='col-sm-6 inputconstainerstyle'>
                    <label className='inputstyle border-0'>State</label>
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
            <div className='footer '>
                <button className="custombutton" style={{ width: "300px" }} onClick={(e) => {
                    props.formsubmit(e, formvalidation);
                }} >{props.usage}</button>
            </div>
        </>


    )
}

export default UserForm