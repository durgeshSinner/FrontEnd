import axios from 'axios'
import React, { useEffect, useState } from 'react'


function Orders() {
    const [orders, setorders] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8080/order/${localStorage.getItem("Id")}/getorders`)
        .then(response => {
            console.log(response)
            // setorders([...response.data])
        }).catch(error => console.log(error))
    },[])
    console.log(orders)
  return (
    <div>Orders</div>
  )
}

export default Orders