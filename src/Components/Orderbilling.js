import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function Orderbilling(props) {
    const [user, setuser] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8080/getprofile/${localStorage.getItem("Id")}`)
            .then(Response => setuser(Response.data))
            .catch(e => console.log(e))
    }, [])
    const notify = (message) => {
        toast(message);
    }

    return (
        <>{props.displayorderbilling &&
            <div className='ordermodalbackground'>
                <div className='ordermodalcontainer' style={{ height: "450px" }}>
                    <div className='ordercontainertitle' style={{ position: "relative" }}>Order Summary
                        <button className='custombutton' onClick={props.closebilling} style={{ position: "absolute", right: "20px", top: "0" }}>X</button >
                    </div>
                    <div className='ordercontainerbody'>
                        <div className='usercred text-start'>Delivery To :
                            <div className='text-center'>{user.userName}</div>
                            <div className='text-center'>{user.userEmail}</div>
                            <div className='text-center'>{user.userPhone}</div>
                        </div>
                        <div className='delivryadress text-start'>Delivery Here :
                            <div className='text-center'>{user.userAddress.street}</div>
                            <div className='text-center'>{user.userAddress.city}</div>
                            <div className='text-center'>{user.userAddress.state}</div>
                        </div>


                    </div>
                    <div className='m-4 ordercontainerfooter d-flex justify-content-center'>
                        <button className='custombutton' style={{ width: "200px" }} onClick={() => {
                            axios.get(`http://localhost:8080/order/${localStorage.getItem("Id")}/createorder`)
                                .then(response => { notify("order placed"); props.closebilling(); console.log(response) })
                                .catch(error => { console.log(error) })
                        }} >PLACE ORDER</button>
                    </div>
                    <div className='m-4 ordercontainerfooter d-flex justify-content-between'>
                        <button className='custombutton' style={{ width: "auto" }} onClick={() => {
                            props.closebilling();
                            props.openorders();
                        }} >Back</button>
                        <Link to='/profile'><button className='custombutton' style={{ width: "auto" }} >Update Profile</button></Link>
                    </div>
                </div>
            </div>
        }</>
    )
}

export default Orderbilling