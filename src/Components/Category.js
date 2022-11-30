import React from 'react'
import './CSS/Navbar.css'


function Category(props) {
    const handleclick = () => {
        var element = document.getElementById(`${props.Categoryname}`);
        element.scrollIntoView();
    }
    const categoryimage = {
        width: "auto",
        height: "50px",
        backgroundImage: "",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"

    }
    categoryimage.backgroundImage = `${props.url}`

    return (
        <div className='m-0 category '>
            <div style={categoryimage}></div>
            <div className='categorytext' >{props.Categoryname}</div>
        </div>
    )
}

export default Category