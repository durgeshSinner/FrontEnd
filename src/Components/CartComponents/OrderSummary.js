import React from 'react'
import '../CSS/OrderModals.css'
import 'react-toastify/dist/ReactToastify.css';

function OrderSummary(props) {

    // to caluculate price
    let total = 0

    const productimage = {
        backgroundImage: "",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "50px",
        width: "auto"
    }

    return (
        <>
            {props.displayordermodal &&
                <div className='ordermodalbackground'>
                    <div className='ordermodalcontainer'>
                        <div className='ordercontainertitle' style={{ position: "relative" }}>Order Summary
                            <button className='custombutton' onClick={props.closeorders} style={{ position: "absolute", right: "20px", top: "0" }}>X</button >
                        </div>
                        <>
                            <div className='ordercontainerbody'>
                                <div className='row m-2 ordercontent align-items-center justify-content-around'>
                                    <div className='col-sm-4' >
                                        Product
                                    </div>
                                    <div className='col-sm-2' >Quantity</div>
                                    <div className='col-sm-2' >Price</div>
                                    <div className='col-sm-2' >Total</div>
                                </div>
                                <div style={{ height: "300px", overflow: "scroll" }}>
                                    {
                                        props.cartItems.map(item => {
                                            total = total + item.quantity * item.product.productPrice
                                            return <div className='row m-2 ordercontent align-items-center justify-content-around' key={item.product.productId}>
                                                <div className='col-sm-4' >
                                                    <div style={{ ...productimage, backgroundImage: `url(${item.product.url})` }}></div>
                                                    <div className='info'>{item.product.productName}</div>
                                                </div>
                                                <div className='col-sm-2' >{item.quantity}</div>
                                                <div className='col-sm-2' >{item.product.productPrice}</div>
                                                <div className='col-sm-2' >{item.quantity}x{item.product.productPrice}</div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className='ordercontent d-flex justify-content-between' style={{ marginTop: "10px", marginLeft: "15px", marginRight: "15px" }}>
                                <div>Total</div>
                                <div>{total}</div>
                            </div>

                            <div className='m-2 ordercontainerfooter d-flex justify-content-end'>
                                <button className='custombutton' style={{ width: "100px" }} onClick={() => { props.openbilling(); props.closeorders(); }}>Next</button>
                            </div>
                        </>
                    </div>
                </div>
            }
        </>
    )
}

export default OrderSummary