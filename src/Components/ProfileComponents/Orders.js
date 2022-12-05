import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../CSS/Orders.css'
import OrderDetailsProfile from './OrderDetailsProfile'

function Orders() {
  const [Order, setOrder] = useState([])
  const [orders, setorders] = useState([])
  const [displayordersummary, setdisplayordersummary] = useState(false)
  useEffect(() => {
    const config = {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
      }
  }
    axios.get(`http://localhost:8080/order/${localStorage.getItem("Id")}/getorders`,config)
      .then(response => {
        console.log(response)
        setorders([...response.data])
      }).catch(error => console.log(error))
  }, [])
  console.log(orders)
  return (
    <div className='order container-fluid'>Orders
      <div className='ordercontent row d-flex justify-content-around'>
        <div className='col-sm-4'>Order Id</div>
        <div className='col-sm-4'>Ordered Time</div>
        <div className='col-sm-4'></div>
      </div>
      <div>

        {
          orders.map(order => {

            return <div className='ordercontent row d-flex justify-content-around'>
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

    </div>
  )
}

export default Orders