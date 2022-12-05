import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css'
import '../CSS/Inputs.css'
import '../CSS/Modal.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { log } from '../../App'
import 'react-toastify/dist/ReactToastify.css';

function CartproductCard(props) {
    const loggeddata = useContext(log)
    const [Quantity, setQuantity] = useState(0)
    const productimage = {
        backgroundImage: "",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100px",
        width: "auto"
    }
    productimage.backgroundImage = `url(${props.url})`
    useEffect(() => {
        setQuantity(props.Quantity)
    }, [])
    const notify = (message) => {
        toast(message);
    }
    const updatequantity = (e) => {
        e.preventDefault()
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        console.log(e.target.form[0].value)
        axios.post(`http://localhost:8080/cart/${loggeddata.id}/changequantity/${props.Id}`,
            { quantity: `${e.target.form[0].value}` }, config
        )
            .then(res => { notify("Quantity updated") })
            .catch(e => { console.log(e) })

    }


    const deleteItem = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        axios.get(`http://localhost:8080/cart/${loggeddata.id}/remove/${props.Id}`, config)
            .then(res => {
                console.log(res)
                notify("Item Deleted");
                props.updatefunction();
            })
            .catch(e => { console.log(e); notify("Item Not able to be Removed") })
    }

    return (

        <>
            <div className={`col-sm-3 productcard `} style={{ margin: "5px" }}>
                <div style={productimage}>
                </div>

                <div >
                    <Link to={`/products/${props.category}/${props.subCategory}/${props.Id}`} className='producttext' >
                        <div className='text-center ' style={{ fontSize: "20px", borderBottom: "1px solid rgb(252, 185, 185)" }}>{props.ProductName}</div>
                        <div className='text-center'>Category : {props.subCategory}</div>
                        <div className='text-center'>Price : {props.Price}</div>
                    </Link>
                    <form >
                        <div className='row d-flex justify-content-start'>
                            <div>
                                <label >Quantity:</label>
                                <select className='selectstyle' id="quantity" name="quantity" defaultValue={Quantity}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <button className='custombutton' type="submit" onClick={updatequantity}>Update</button>
                            </div>
                        </div>
                    </form>
                    <button className='custombutton' onClick={deleteItem}>Delete</button>

                </div>

            </div>
        </>


    )
}

export default CartproductCard