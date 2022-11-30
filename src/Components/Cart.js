import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartproductCard from './CartproductCard'
import './CSS/Inputs.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import OrderSummary from './OrderSummary'

function Cart() {
  const [cartItems, setcartItems] = useState([])
  const [displayordermodal , setdisplayordermodal] = useState(false)
  useEffect(() => {
    axios.get(`http://localhost:8080/cart/${localStorage.getItem("Id")}/getCart`)
      .then(res => {
        setcartItems([...res.data.products])
      })
      .catch(e => console.log(e))
  }, [])
  const notify = (message) => {
    toast(message);
  }
  const closeorders =() =>{
    setdisplayordermodal(false)
  }

  return (

    <>
      <OrderSummary displayordermodal={displayordermodal} closeorders={closeorders}/>
      <div className='container' >
        <div className='cartheader'>CART</div>
        <div className='row'>
          {
            cartItems.map(cartitem =>
              <CartproductCard ProductName={cartitem.product.productName} category={cartitem.product.productCategory} subCategory={cartitem.product.productSubCategory}
                Price={cartitem.product.productPrice} key={cartitem.product.productId} Id={cartitem.product.productId}
                url={cartitem.product.url} Quantity={cartitem.quantity} />
            )
          }
        </div>
        <div className='cartheader' style={{ backgroundColor: "white" }}><button className='custombutton'
          onClick={() => {setdisplayordermodal(true)}}
          style={{ backgroundColor: "#2EE59D", width: "300px", height: "45px" }}> PLACE ORDER</button> </div>

      </div>
    </>
  )
}

export default Cart
// onClick={() => {
  // axios.get(`http://localhost:8080/order/${localStorage.getItem("Id")}/createorder`)
    // .then(response => { notify("order placed"); console.log(response) })
    // .catch(error => { console.log(error) })
// }}