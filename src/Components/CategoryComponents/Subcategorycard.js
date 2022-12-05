import React from 'react'
import { Link } from 'react-router-dom'

function Subcategorycard(props) {

    const categoryimage = {
        width: "auto",
        height: "100px",
        backgroundImage: "",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0px bottom"

    }
    categoryimage.backgroundImage = `${props.url}`
    return (
        <>
            <div className='col-sm-4 subcategorycard' onClick={props.displayproducts}>
                <div>{props.subcategories}</div>
                <div style={categoryimage}></div>
            </div>
            <div className='col-sm-4 subcategorycard d-flex align-items-center'>
                <Link to={`/browseproducts/${props.category}/${props.subcategories} `} style={{ textDecoration: "none", color: "white" }}>
                    <button className='custombutton'>Shop Here</button>
                </Link>
            </div>

        </>

    )
}

export default Subcategorycard