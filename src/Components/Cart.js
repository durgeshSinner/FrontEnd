import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartproductCard from './CartproductCard'
import './CSS/Inputs.css'
import OrderSummary from './OrderSummary'
import Orderbilling from './Orderbilling';

function Cart() {
  const [cartItems, setcartItems] = useState([])
  const [displayordermodal, setdisplayordermodal] = useState(false)
  const [displayorderbilling, setdisplayorderbilling] = useState(false)
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    axios.get(`http://localhost:8080/cart/${localStorage.getItem("Id")}/getCart`, config)
      .then(res => {
        setcartItems([...res.data.products])
      })
      .catch(e => console.log(e))
  }, [displayorderbilling])

  const closeorders = () => {
    setdisplayordermodal(false)
  }

  const closebilling = () => {
    setdisplayorderbilling(false)
  }
  const openbilling = () => {
    setdisplayorderbilling(true)
  }
  const openorders = () => {
    setdisplayordermodal(true)
  }
  return (

    <>
      <OrderSummary displayordermodal={displayordermodal} closeorders={closeorders} openbilling={openbilling} />
      <Orderbilling closebilling={closebilling} displayorderbilling={displayorderbilling} openorders={openorders} />
      <div className='container' >
        <div className='cartheader'>CART</div>
        <div className='cartcontent row d-flex justify-content-around'>
          {
            cartItems.length === 0 ?
              <>
                <div className='bg-warning text-center'>Empty Cart !!!! Feels Bad...</div>

              </>
              :
              <>
                {
                  cartItems.map(cartitem =>
                    <CartproductCard ProductName={cartitem.product.productName} category={cartitem.product.productCategory} subCategory={cartitem.product.productSubCategory}
                      Price={cartitem.product.productPrice} key={cartitem.product.productId} Id={cartitem.product.productId}
                      url={cartitem.product.url} Quantity={cartitem.quantity} />
                  )
                }
              </>
          }
        </div>
        <div className='cartheader' style={{ backgroundColor: "white" }}><button className='custombutton'
          onClick={() => { setdisplayordermodal(true) }}
          style={{ backgroundColor: "#2EE59D", width: "300px", height: "45px" }}> PLACE ORDER</button> </div>

      </div>
    </>
  )
}

export default Cart
