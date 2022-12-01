import React from 'react'
import { Link } from 'react-router-dom';
import Addtocart from './Addtocart';
import './CSS/Navbar.css'

function ProductCard(props) {
    const productimage = {
        backgroundImage: "",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100px",
        width: "auto"
    }

    productimage.backgroundImage = `url(${props.url})`

    return (
        <>
            <div className='col-sm-3 productcard'>
                <Link to={`/products/${props.category}/${props.subCategory}/${props.Id}`} className='producttext'>
                    <div style={productimage}></div>
                    <div className='text-center ' style={{ fontSize: "20px", borderBottom: "1px solid rgb(252, 185, 185)" }}>{props.ProductName}</div>
                    <div className='text-center'>Category : {props.subCategory}</div>
                    <div className='text-center'>Price : {props.Price}</div>
                </Link>
                <div className='d-flex justify-content-center'>
                    {/* <Custombutton message="Buy Now" /> */}
                    <Addtocart ProductId={props.Id} />
                </div>

            </div>
        </>


    )
}

export default ProductCard