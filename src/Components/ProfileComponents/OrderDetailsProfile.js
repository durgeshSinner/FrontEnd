import React from 'react'
import '../CSS/OrderModals.css'
import ReactDom from 'react-dom'
function Orderprofilemodal(props) {
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
            {props.displayordersummary &&
                < div className='ordermodalbackground'>
                    <div className='ordermodalcontainer'>
                        <div className='ordercontainertitle' style={{ position: "relative" }}>Order Summary</div>
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
                                    props.orderdetails.orderedProducts.map(item => {
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
                            <button className='custombutton' style={{ width: "100px" }} onClick={() => { props.setdisplayordersummary(false) }}>Close</button>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

function OrderDetailsProfile(props) {
    return (
        <>
            {
                ReactDom.createPortal(<Orderprofilemodal displayordersummary={props.displayordersummary}
                    orderdetails={props.orderdetails}
                    setdisplayordersummary={props.setdisplayordersummary} />
                    , document.getElementById('modalfororderdetails'))
            }
        </>
    )
}

export default OrderDetailsProfile