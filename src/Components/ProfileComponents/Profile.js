import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Orders from './Orders';
import { log } from '../../App'
import { useNavigate } from 'react-router-dom'
import UserForm from '../NavComponents/UserForm'

function Profile(props) {
    //navigate used when user logs out redirected to home page
    const navigate = useNavigate()
    //user context
    const loggeddata = useContext(log)

    const notify = (message) => {
        toast(message);
    }
    //user validation
    const validuser = () => {
        console.log(loggeddata)
        if (!loggeddata.logged) {
            return Promise.reject("User Not Logged")
        }
        else {
            return Promise.resolve("User Logged")
        }
    }
    //user role validation
    const validpageuser = () => {
        if (loggeddata.role === "USER") { return Promise.resolve("USER ROLE") }
        else { return Promise.reject("ADMIN ROLE") }
    }

    //on update the profile data of user need to be fetched.
    const [update, setupdate] = useState(false)
    //user data
    const [userdetails, setuserdetails] = useState({
        userName: "",
        userAddress: { city: "", state: "", pincode: "", street: "" },
        userPhone: ""
    })
    //for loading user profile data after checking the validation of user and his role 
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        validuser().then(() => {
            validpageuser().then(() => {
                axios.get(`http://localhost:8080/getprofile/${loggeddata.id}`, config)
                    .then(res => {
                        setuserdetails(res.data)
                    })
                    .catch(e => { console.log(e) })
            }).catch(() => {
                notify("Can not perform USER actions")
                navigate("/")
            })
        }).catch(() => {
            notify("please log in")
            navigate("/")
        })
        console.log("hi")
    }, [update])
    //onsubmit function passed through props and when event is occured the function is read
    const formsubmit = (e, formvalidation) => {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        console.log(e.target.form[0].value)
        const user = {
            userId: loggeddata.id,
            userName: e.target.form[1].value,
            userAddress: {
                city: e.target.form[3].value,
                pincode: e.target.form[4].value,
                street: e.target.form[2].value,
                state: e.target.form[5].value
            },
            userPhone: e.target.form[0].value
        }
        formvalidation(e)
            .then(() => {
                axios.post(`http://localhost:8080/updateprofile`, user, config)
                    .then(res => {
                        console.log(res);
                        notify("Profile Updated")
                        setupdate(!update)
                    }).catch(e => { notify("Unable to Update") })
            })
            .catch(e => console.log(e))
    }
    return (
        <>
            {
                loggeddata.role === "USER" &&
                <div className='container-fluid' >
                    <div id="modalfororderdetails"></div>
                    <div className='row' style={{ height: "100vh" }}>
                        <div className='col-sm-4 profileinfocontainer'>
                            <div className='profilecontent lablestyle'><div>Hi, {userdetails.userName}</div></div>
                            <Orders />
                            <Link to="/">
                                <button className='custombutton' onClick={() => { props.userlog(); localStorage.clear() }}>Log Out</button>
                            </Link>
                        </div>
                        <div className='col-sm-8 profileeditcontainer'>
                            <form>
                                <div style={{ paddingTop: "50px", paddingBottom: "50px" }}>
                                    <UserForm formsubmit={formsubmit} details={userdetails} usage={"Update Profile"} updateprofile />
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            }
            {loggeddata.role === "ADMIN" &&
                <div className='bg-warning'>ADMIN does not have this Functionality</div>
            }
        </>


    )
}

export default Profile