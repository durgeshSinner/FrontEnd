import React, { useEffect, useState } from 'react'
import './CSS/Fortune.css'
import Spinbutton from './Spinbutton'
function WheelofFortune() {
    const [offer, setoffer] = useState("")
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
    const getoffer = (offernumber) => {
        let offer = ""
        if (0 <= offernumber && offernumber < 45) { offer = "ajsncij" }
        else if (45 <= offernumber && offernumber < 90) { offer = "Buy 1 Get 1" }
        else if (90 <= offernumber && offernumber < 135) { offer = "Flat 20% off" }
        else if (135 <= offernumber && offernumber < 225) { offer = "Better Luck Next Time" }
        else if (225 <= offernumber && offernumber < 270) { offer = "Free Delivery" }
        else if (270 <= offernumber && offernumber < 315) { offer = "Buy 2 Get 1" }
        else if (315 <= offernumber && offernumber < 360) { offer = "Upto 50% off" }
        return offer;
    }
    const spinthewheel = () => {
        const randomnumber = Math.random() * 5000
        setpointer({ ...pointer, transition: "transform 3s ease-out", transform: `rotate(${randomnumber}deg)` })
        setTimeout(reset, 3000)
        let offernumber = [(randomnumber / 360) - Math.floor(randomnumber / 360)] * 360
        setoffer(getoffer(offernumber))
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
                {spin &&
                    <div className= "col-sm-4 sucesstext">Congratulations !!! You have WON {offer}</div>
                }
                 
                {!spin && <div style={{height : "210px"}}></div>}
                <div style={{height : "10px"}}></div>
                <Spinbutton onclick={spinthewheel} />

            </div>



        </>
    )
}

export default WheelofFortune