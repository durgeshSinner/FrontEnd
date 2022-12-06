import React, { useState } from 'react'
import '../CSS/Navbar.css'
import '../CSS/Dropdown.css'
import { Link, useNavigate } from 'react-router-dom'
import SignUpModal from './SignUpModal'
import LoginModal from './LoginModal'
import { log } from '../../App'

function Nav(props) {
    //for display of modal for Signup
    const [Signupmodal, setSignupmodal] = useState(false)
    //for display of modal for login
    const [Loginmodal, setLoginmodal] = useState(false)

    const navigate = useNavigate()

    //functions sent as props
    const opensignup = () => {
        setSignupmodal(true)
    }
    const openlogin = () => {
        setLoginmodal(true)
    }
    const closesignup = () => {
        setSignupmodal(false)
    }
    const closelogin = () => {
        setLoginmodal(false)
    }

    return (
        <>
            {Signupmodal && <SignUpModal closesignup={closesignup} openlogin={openlogin} />}
            {Loginmodal && <LoginModal closelogin={closelogin} opensignup={opensignup} Loggedin={props.Loggedin} />}
            <div className={'container-fluid'} style={{ backgroundColor: "rgb(187, 137, 235)" }} >
                <div className='row d-flex justify-content-between'>
                    <div className="col-sm-4 row ">
                        <div className="col-sm-4 " >
                            <Link to="/" id="home" className={"navbar"}>Home</Link>
                        </div>
                        <div className="col-sm-4">
                            <Link to="/categories" id="categories" className={"navbar"}  >Categories</Link>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className="input-group mb-2 mt-2"  >
                            <form className='d-flex'>
                                <input type="text" className="form-control" placeholder="Search Products" />
                                <button className="input-group-text" onClick={(event) => {
                                    event.preventDefault();
                                    const search = event.target.form[0].value
                                    if (search === "") { return }
                                    else { navigate(`/products/${search}`) }
                                }}>Go</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 row d-flex justify-content-end">
                        <log.Consumer>{
                            log => {
                                if (log.logged && log.role === "ADMIN") {
                                    return <div className="col-sm-4 ">
                                        <Link to="/admin" className={"navbar"}>ADMIN</Link>
                                    </div>
                                }
                                else {
                                    return <></>
                                }
                            }
                        }</log.Consumer>
                        <log.Consumer>{
                            log => {
                                if (log.logged && log.role === "USER") {
                                    return <div className="col-sm-4 ">
                                        <Link to="/cart" className={"navbar"}>Cart</Link>
                                    </div>
                                }
                                else {
                                    return <></>
                                }
                            }
                        }</log.Consumer>
                        <log.Consumer>{
                            log => {
                                if (log.logged && log.role === "USER") {
                                    return <div className="col-sm-4 ">
                                        <Link to="/profile" className={"navbar"}>Profile</Link>
                                    </div>
                                }
                                else {
                                    return <></>
                                }
                            }
                        }</log.Consumer>
                        <log.Consumer>{
                            log => {
                                if (log.logged) {
                                    return <div className="col-sm-4">
                                        <li style={{ listStyle: "none" }}>
                                            <Link to="" id="logout" className={"navbar"} onClick={() => {
                                                localStorage.clear(); props.Loggedout()
                                            }}>Log Out</Link>
                                        </li>
                                    </div>
                                }
                                else {
                                    return <div className="col-sm-4 dropdown" >
                                        <li><Link id="login" className={"navbar"} onClick={() => { setLoginmodal(true) }}>Log in</Link></li>
                                        <div className='dropdown-content' style={{ backgroundColor: "rgb(187, 137, 235)" }}>
                                            <li><Link id="signup" className={"navbar"} onClick={() => { setSignupmodal(true) }}>Sign up</Link></li>
                                        </div>
                                    </div>
                                }
                            }
                        }</log.Consumer>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Nav