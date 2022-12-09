import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import CartproductCard from './CartproductCard'
import '../CSS/Inputs.css'
import OrderSummary from './OrderSummary'
import Orderbilling from './Orderbilling';
import { log } from '../../App'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {

  const navigate = useNavigate()
  const loggeddata = useContext(log)
  //Context of User details 
  //loggeddata.logged bolean value if a user if logged or not
  //loggeddata.Id  | if logged users Id  else ""
  //loggeddata.Role | if logged users Role  else ""

  //Items log
  const [cartItems, setcartItems] = useState([])
  //states for displaying modals
  const [displayordermodal, setdisplayordermodal] = useState(false)
  const [displayorderbilling, setdisplayorderbilling] = useState(false)

  //flag to make render wait until the states ae updated
  const [update, setupdate] = useState(false)

  //just to make  state updated
  const updatefunction = () => {
    if (update) { setupdate(false) }
    else { setupdate(true) }
  }

  const notify = (message) => {
    toast(message); //toastify alert
  }
  //checks user loggged or not
  const validuser = () => {
    console.log(loggeddata)
    if (!loggeddata.logged) {
      return Promise.reject("User Not Logged")
    }
    else {
      return Promise.resolve("User Logged")
    }
  }
  //checks users Role
  const validpageuser = () => {
    console.log(loggeddata.role)
    if (loggeddata.role === "USER") { return Promise.resolve("USER ROLE") }
    else { return Promise.reject("ADMIN ROLE") }
  }
  useEffect(() => {

    const controller = new AbortController();
    let subscribed = true
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      signal: controller.signal
    }
    validuser().then(() => {
      // setdisplay(false);
      validpageuser().then(() => {
        if (subscribed) {
          axios.get(`http://localhost:8080/cart/${loggeddata.id}/getCart`, config)
            .then(res => {
              if (res.status === 200) { setcartItems([...res.data.products]) }
              else if (res.status === 204) { setcartItems([]); }
            })
            // .then(() => { setdisplay(true)})
            .catch(e => {
              if (e.request.status === 0) { notify("server not responding") }
              else { notify("unable to fetch Cart") }
              console.log(e)
            })
        }
      })
        .catch(() => {
          notify("Can not perform USER actions")
          navigate("/")
        })
    }).catch(() => {
      notify("please log in")
      navigate("/")
    })

    return () => {
      subscribed = false
      console.log("Cart Component unmounted");
      controller.abort();

    }
  }, [update])

  //modal open and close functions
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
      <>{
        loggeddata.role === "USER" &&
        <>
          < OrderSummary displayordermodal={displayordermodal} closeorders={closeorders} openbilling={openbilling} cartItems={cartItems} />
          <Orderbilling closebilling={closebilling} displayorderbilling={displayorderbilling} openorders={openorders} updatefunction={updatefunction} />
          <div className='container' >
            <div className='cartheader'>CART</div>
            <div className='cartcontent row d-flex justify-content-around'>
              {
                cartItems.length === 0 ?
                  <>
                    <div className='bg-warning text-center'>Empty Cart !!!! Feels Bad...</div>
                    <div className='cartheader' style={{ backgroundColor: "white" }}><button className='custombutton'
                      onClick={() => { navigate("/categories") }}
                      style={{ backgroundColor: "#2EE59D", width: "300px", height: "45px" }}>GO SHOP</button> </div>
                  </>
                  :
                  <>
                    {
                      cartItems.map(cartitem =>
                        <CartproductCard ProductName={cartitem.product.productName} category={cartitem.product.productCategory} subCategory={cartitem.product.productSubCategory}
                          Price={cartitem.product.productPrice} key={cartitem.product.productId} Id={cartitem.product.productId}
                          url={cartitem.product.url} Quantity={cartitem.quantity} updatefunction={updatefunction} />
                      )
                    }
                    <div className='cartheader' style={{ backgroundColor: "white" }}><button className='custombutton'
                      onClick={() => { setdisplayordermodal(true) }}
                      style={{ backgroundColor: "#2EE59D", width: "300px", height: "45px" }}> PLACE ORDER</button> </div>

                  </>
              }
            </div>

          </div>
        </>

      }
      </>
    </>
  )
}

export default Cart
