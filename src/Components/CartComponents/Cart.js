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
  const [update, setupdate] = useState({
    updated: false,
    display: true
  })
  //just to make  state updated
  const updatefunction = () => {
    if (update.updated) { setupdate({ ...update, updated: false }) }
    else { setupdate({ ...update, updated: true }) }
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
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    validuser().then(() => {
      validpageuser().then(() => {
        axios.get(`http://localhost:8080/cart/${loggeddata.id}/getCart`, config)
          .then(res => {
            setcartItems([...res.data.products])
          }).catch(e => { notify("unable to get Cart") })
      })
        .catch(() => {
          notify("Can not perform USER actions")
          navigate("/")
        })
    }).catch(() => {
      notify("please log in")
      navigate("/")
    })
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
      {update.display &&

        <>{
          loggeddata.role === "USER" &&
          <>
            < OrderSummary displayordermodal={displayordermodal} closeorders={closeorders} openbilling={openbilling} />
            <Orderbilling closebilling={closebilling} displayorderbilling={displayorderbilling} openorders={openorders} updatefunction={updatefunction} />
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
                            url={cartitem.product.url} Quantity={cartitem.quantity} updatefunction={updatefunction} />
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

        }
          {loggeddata.role === "ADMIN" &&
            <div className='bg-warning'>ADMIN does not have this Functionality</div>
          }

        </>
      }
    </>
  )
}

export default Cart
