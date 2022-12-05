import axios from 'axios'
import React, { useState } from 'react'
import '../CSS/Fortune.css'
import Spinbutton from './Spinbutton'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WheelofFortune() {
    const notify = (message) => {
        toast(message);
    }
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }

    const [offer, setoffer] = useState({
        voucher: {},
        existing: false
    })
    const [spin, setspin] = useState(false)
    const [pointer, setpointer] = useState({
        backgroundImage: "url(https://thewheel.com/home-2022/images/wheel-pointer.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: "60%",
        width: "50%",
        position: "absolute",
        top: "18%",
        left: "25%",
        zIndex: "9",
        backgroundPositionY: "30px"
    })
    const reset = () => {
        setpointer({
            backgroundImage: "url(https://thewheel.com/home-2022/images/wheel-pointer.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            height: "60%",
            width: "50%",
            position: "absolute",
            top: "18%",
            left: "25%",
            zIndex: "9",
            backgroundPositionY: "30px"
        })
        setspin(true)
    }
    const getvoucher = (offernumber) => {
        axios.get(`http://localhost:8080/voucher/create/${localStorage.getItem("Id")}/${offernumber}`, config)
            .then(res => { console.log(res); setoffer({ ...offer, voucher: res.data }) })
            .catch(error => setoffer({ voucher: error.response.data, existing: true }))
    }
    const spinthewheel = () => {
        if (localStorage.getItem("Id") === null) { return notify("Please Log IN"); }
        else {
            const randomnumber = Math.random() * 5000
            setpointer({ ...pointer, transition: "transform 3s ease-out", transform: `rotate(${randomnumber}deg)` })
            setTimeout(reset, 3000)
            let offernumber = Math.round([(randomnumber / 360) - Math.floor(randomnumber / 360)] * 360)
            setTimeout(getvoucher(offernumber), 3000)

        }
    }
    console.log(offer)

    return (
        <>
            <div className='container-fluid row bg-light p-0 justify-content-end'
                style={{ width: "75%", marginLeft: "auto", marginRight: "auto", position: "relative" }}>
                {!spin ?
                    <div className='box' style={{ height: "200px", width: "200px" }}>
                        <div className='circle' >
                            <div className="segment1" />
                            <div className="segment2" />
                            <div className="segment3" />
                            <div className="segment4" />
                            <div className="segment5" />
                            <div className="segment6" />
                            <div className="segment7" />
                            <div className="segment8" />
                            <div style={{ ...pointer }}></div>
                        </div>
                    </div>
                    :
                    <div className='box' style={{ height: "200px", width: "200px", left: "15%" }}>
                        <div className='circle' >
                            <div className="segment1" />
                            <div className="segment2" />
                            <div className="segment3" />
                            <div className="segment4" />
                            <div className="segment5" />
                            <div className="segment6" />
                            <div className="segment7" />
                            <div className="segment8" />
                            <div style={{ ...pointer }}></div>
                        </div>
                    </div>
                }
                {(spin && !offer.existing) &&
                    <div className="col-sm-4 sucesstext">Congratulations !!! You have WON {offer.voucher.offer}</div>}
                {(spin && offer.existing) &&
                    <div className="col-sm-4 sucesstext">Already have a voucher in your Account issued at{offer.voucher.issuedTime} {offer.voucher.offer}</div>
                }

                {!spin && <div style={{ height: "210px" }}></div>}
                <div style={{ height: "40px" }}></div>
                {
                    !spin ?
                        <Spinbutton onclick={spinthewheel} />
                        :
                        <Spinbutton style={{ PointerEvent: "none" }} />
                }

            </div>



        </>
    )
}

export default WheelofFortune