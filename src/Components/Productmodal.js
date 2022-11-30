import React from 'react'
import './CSS/Modal.css'

function Productmodal(props) {
    return (
        <>
            <div className='modalBackground'>
                <div className='modalContainer'>
                    <div className='titleCloseBtn'><button onClick={() => { props.closemodal() }}>X</button></div>

                    <div className='title'>
                        Log In
                    </div>
                    <div className='body' >
                       product
                    </div>

                </div>

            </div>
        </>
    )
}

export default Productmodal