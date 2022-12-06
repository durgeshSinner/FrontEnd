import axios from 'axios';
import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import { log } from '../../App'
import 'react-toastify/dist/ReactToastify.css';

function Addtocart(props) {
    //user context
    const loggeddata = useContext(log)
    const notify = (message) => {
        toast(message);
    }

    //validation of user
    const validate = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }

        if (localStorage.getItem('token') == null) {
            notify("Please Log IN")
        }
        else {
            axios.get(`http://localhost:8080/cart/${loggeddata.id}/add/${props.ProductId}`,
                config)
                .then(res => { console.log(res); notify("Item Added") })
                .catch(e => {
                    notify("Unable to Add to Cart") 
                    console.log(e.response.status);
                })

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