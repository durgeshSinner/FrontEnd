import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import '../CSS/Orders.css'
import { log } from '../../App'
import OrderDetailsProfile from './OrderDetailsProfile'

function Orders() {
  //user context
  const loggeddata = useContext(log)
  // Order details of the order to be displayed on clicking the display order button
  const [Order, setOrder] = useState([])
  //details of all the orders
  const [orders, setorders] = useState([])
  //order details modal display controller
  const [displayordersummary, setdisplayordersummary] = useState(false)
  //fetch of orders 
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    axios.get(`http://localhost:8080/order/${loggeddata.id}/getorders`, config)
      .then(response => {
        console.log(response)
        setorders([...response.data])
      }).catch(error => console.log(error))
  }, [])
  return (

    <div className='order container-fluid'>Orders
      {orders.length !== 0 &&
        <>
          <div className='ordercontent row d-flex justify-content-around'>
            <div className='col-sm-4'>Order Id</div>
            <div className='col-sm-4'>Ordered Time</div>
            <div className='col-sm-4'></div>
          </div>
          <div>

            {//mapping of each order to a component
              orders.map(order => {

                return <div className='ordercontent row d-flex justify-content-around' key={order.orderId}>
                  <OrderDetailsProfile displayordersummary={displayordersummary}
                    setdisplayordersummary={setdisplayordersummary}
                    orderdetails={Order} />
                  <div className='col-sm-4'>{order.orderId}</div>
                  <div className='col-sm-4'>{order.orderedTime}</div>
                  <button className='custombutton col-sm-4' onClick={() => { setOrder(order); setdisplayordersummary(true) }}>Summary</button>
                </div>
              })
            }

          </div>
        </>}
        {orders.length === 0 && <div className='bg-warning'>No orders Yet</div>}

    </div>
  )
}

export default Orders