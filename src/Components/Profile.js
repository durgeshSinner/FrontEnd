import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Orders from './Orders';
function Profile(props) {
    const notify = (message) => {
        toast(message);
    }
    const [username, setusername] = useState("")
    const [userdetails, setuserdetails] = useState({
        userName: "",
        userAddress: { city: "", state: "", pincode: "", street: "" },
        userPhone: ""
    })
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        axios.get(`http://localhost:8080/getprofile/${localStorage.getItem("Id")}`, config)
            .then(res => {
                setuserdetails(res.data)
                setusername(res.data.userName)
            })
            .catch(e => { console.log(e) })
    }, [])
    console.log(userdetails)
    const updateprofile = (event) => {
        event.preventDefault()
        const config = {
            headers : {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        const user = {
            userName: `${event.target.form[0].value}`,
            userAddress: {
                city: `${event.target.form[3].value}`,
                state: `${event.target.form[5].value}`,
                pincode: `${event.target.form[4].value}`,
                street: `${event.target.form[2].value}`
            },
            userPhone: `${event.target.form[1].value}`,
            userId: `${userdetails.userId}`
        }
        axios.post(`http://localhost:8080/updateprofile`, user, config)
            .then(res => {
                console.log(res);
                setusername(event.target.form[0].value)
                notify("Profile Updated")
            }).catch(e => { console.log(e) })
    }

    return (
        <div className='container-fluid'>
            <div id="modalfororderdetails"></div>
            <div className='row'>
                <div className='col-sm-4 profileinfocontainer'>
                    <div className='profilecontent lablestyle'><div>Hi, {username}</div></div>
                    <Orders />
                    <Link to="/">
                        <button className='custombutton' onClick={() => { props.userlog(); localStorage.clear() }}>Log Out</button>
                    </Link>
                </div>
                <div className='col-sm-8 profileeditcontainer'>
                    <form>
                        <div className="profileeditcontent d-flex justify-content-around">
                            <div className='lablestyle'>User Name</div>
                            <input className='profileeditstyle ' id="userName" type="text" defaultValue={userdetails.userName} placeholder={userdetails.userName} />
                        </div>
                        <div className="profileeditcontent d-flex justify-content-around">
                            <div className='lablestyle'>Phone Number</div>
                            <input className='profileeditstyle ' type="text" defaultValue={userdetails.userPhone} placeholder='Phone Number' />
                        </div>
                        <div className='container-fluid row'>
                            <div className="profileeditcontent col-sm-3" style={{ position: "relative" }}>
                                <div className='adressrotate'>ADDRESS</div>
                            </div>
                            <div className="col-sm-8">
                                <div className="profileeditcontent d-flex justify-content-between ">
                                    <div className='lablestyle'>Street Name</div>
                                    <input className='profileeditstyle ' type="text" defaultValue={userdetails.userAddress.street} placeholder='Street name' />
                                </div>
                                <div className="profileeditcontent d-flex justify-content-between">
                                    <div className='lablestyle'>City name</div>
                                    <input className='profileeditstyle ' type="text" defaultValue={userdetails.userAddress.city} placeholder='City name' />
                                </div>
                                <div className="profileeditcontent d-flex justify-content-between">
                                    <div className='lablestyle'>Pincode</div>
                                    <input className='profileeditstyle ' type="text" defaultValue={userdetails.userAddress.pincode} placeholder='Pincode' />
                                </div>
                                <div className="profileeditcontent d-flex justify-content-between">
                                    <div className='lablestyle'>State Name</div>
                                    <input className='profileeditstyle ' type="text" defaultValue={userdetails.userAddress.state} placeholder='State name' />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end m-3'><button type="submit" className='custombutton' onClick={updateprofile}>Update Profile</button></div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Profile