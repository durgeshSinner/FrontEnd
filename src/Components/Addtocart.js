import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addtocart(props) {
    const notify = (message) => {
        toast(message);
    }

    const validate = () => {
        const config = {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        }
        console.log(config)

        if (localStorage.getItem('Id') == undefined) {
            notify("Please Log IN")
            console.log("usernotlogged in")
        }
        else {
            axios.get(`http://localhost:8080/cart/${localStorage.getItem('Id')}/add/${props.ProductId}`,
                config)
                .then(res => {console.log(res);notify("Item Added")})
                .catch(e => { console.log(e); notify("Item Not Added") })
            
            console.log("logged in")
        }
    }
    return (
        <>

            <button className="custombutton" onClick={validate}>Add to cart</button>
        </>
    )
}

export default Addtocart