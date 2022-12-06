import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../CommonComponents/ProductCard'

function SubcategoryProducts(props) {
    //dynamic styling of backimage object
    const categoryimage = {
        width: "auto",
        height: "100px",
        backgroundImage: "",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"

    }
    //state used for => on hover arrows indicating prev and next will appear
    const [displaynextprev, setdisplaynextprev] = useState(false)

    //axios call of products in a subcategory
    const [Products, setProducts] = useState([])
    useEffect(() => {
        setcurrent(0)
        axios.get(`http://localhost:8080/products/${props.categoryname}/${props.subcategory}`)
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
    }, [props.subcategory])

    //to display only 3 like a carausel display count
    const [current, setcurrent] = useState(0)
    //arrow fnctions
    const previmage = () => {
        if (current === 0) {
            setcurrent(0)
        }
        else {
            setcurrent(current - 1)
        }

    }
    const nextimage = () => {
        if (current === Products.length - 3) {
            setcurrent(Products.length - 3)
        }
        else {
            setcurrent(current + 1)
        }
    }

    return (
        <div className='row d-flex ' style={{ position: "relative", marginTop: "20px" }} onMouseEnter={() => { setdisplaynextprev(true) }} onMouseLeave={() => { setdisplaynextprev(false) }}>
            {displaynextprev &&
                <div style={{
                    ...categoryimage, backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Ic_chevron_left_48px.svg/48px-Ic_chevron_left_48px.svg.png?20141023111631)",
                    position: "absolute", width: "50px", top: "30%", opacity: "50%", left: "0", zIndex: "1"
                }} onClick={previmage}>
                </div>
            }
            <div className='d-flex justify-content-between' >
                {
                    Products.filter(product =>
                        Products.indexOf(product) >= current &&
                        Products.indexOf(product) <= current + 2
                    ).map(product =>
                        <ProductCard ProductName={product.productName} url={product.url} key={product.productId} Id={product.productId} category={product.productCategory} subCategory={product.productSubCategory} Price={product.productPrice} />
                    )
                }
            </div>
            {displaynextprev &&
                <div style={{
                    ...categoryimage, backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ic_chevron_right_48px.svg/1200px-Ic_chevron_right_48px.svg.png)",
                    opacity: "50%", position: "absolute", width: "50px", top: "30%", right: "0"
                }} onClick={nextimage}>
                </div>
            }
        </div>
    )
}

export default SubcategoryProducts