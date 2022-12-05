import axios from 'axios';
import React,{useContext} from 'react'
import { toast } from 'react-toastify';
import { log } from '../../App'
import 'react-toastify/dist/ReactToastify.css';

function Addtocart(props) {
    const loggeddata = useContext(log)
    const notify = (message) => {
        toast(message);
    }

    const validate = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }
        console.log(config)

        if (localStorage.getItem('token') == undefined) {
            notify("Please Log IN")
            console.log("usernotlogged in")
        }
        else {
            console.log(loggeddata.id)
            axios.get(`http://localhost:8080/cart/${loggeddata.id}/add/${props.ProductId}`,
                config)
                .then(res => { console.log(res); notify("Item Added") })
                .catch(e => { console.log(e); notify("Item Already in Cart") })

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