import React, { useState } from 'react'
import '../CSS/Navbar.css'
import '../CSS/Dropdown.css'
import { Link } from 'react-router-dom'
import SignUpModal from './SignUpModal'
import LoginModal from './LoginModal'
import { log } from '../../App'

function Nav(props) {
    const [Signupmodal, setSignupmodal] = useState(false)
    const [Loginmodal, setLoginmodal] = useState(false)

    const closesignup = () => {
        setSignupmodal(false)
    }
    const closelogin = () => {
        setLoginmodal(false)
    }
    const [search, setsearch] = useState('')

    return (
        <>
            {Signupmodal && <SignUpModal closemodal={closesignup} loginmodal={setLoginmodal} />}
            {Loginmodal && <LoginModal closemodal={closelogin} signupmodal={setSignupmodal} userlogged={props.userLogged} setuserLogged={props.setuserLogged} />}
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
                                <input type="text" className="form-control" placeholder="Search Products" onChange={(event) => {
                                    console.log(event.target.value)
                                    setsearch(event.target.value)
                                }} />
                                {search === "" ?
                                    <Link to={`/products/${search}`} className="input-group-text" style={{ pointerEvents: "none" }}
                                    >Go</Link>
                                    :
                                    <Link to={`/products/${search}`} className="input-group-text"
                                    >Go</Link>
                                }
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
                                                localStorage.clear(); props.setuserLogged({
                                                    logged: false,
                                                    id: "",
                                                    role: ""
                                                })
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