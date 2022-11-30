import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addtocart(props) {
    const notify = (message) => {
        toast(message);
    }

    const validate = () => {

        if (localStorage.getItem('Id') == undefined) {
            notify("Please Log IN")
            console.log("usernotlogged in")
        }
        else {
            axios.get(`http://localhost:8080/cart/${localStorage.getItem('Id')}/add/${props.ProductId}`)
            .then(res => console.log(res))
            .catch(e => {console.log(e)})
            notify("Item Added")
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