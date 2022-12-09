import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { log } from '../../App'

function Orderbilling(props) {
    //user context
    const loggeddata = useContext(log)
    //userdetails
    const [user, setuser] = useState({})
    // fetch user details by axios call
    useEffect(() => {
        let subscribed = true
        const controller = new AbortController();

        (async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                signal: controller.signal
            }
            if (subscribed) {
                await axios.get(`http://localhost:8080/getprofile/${loggeddata.id}`, config)
                    .then(Response => { setuser(Response.data); console.log(Response) }
                    )
                    .catch(error => {
                        if (error.request.status === 0) {
                            if (error.code === "ERR_CANCELED") { console.log("aborted") }
                            else { notify("server not responding") }
                        }
                        else { notify("unable to fetch Cart") }
                    });
            }
        })();

        return () => {
            subscribed = false
            console.log("Orderbiling Unmounted")
            controller.abort()
        }
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
                            const config = {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            }

                            axios.get(`http://localhost:8080/order/${loggeddata.id}/createorder`, config)
                                .then(response => { notify("order placed"); props.closebilling(); props.updatefunction(); console.log(response) })
                                .catch(error => { notify("Unable to place Order") })
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