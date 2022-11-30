import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

function SubcategoryProducts(props) {
    const categoryimage = {
        width: "auto",
        height: "100px",
        backgroundImage: "",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"

    }
    const [displaynextprev, setdisplaynextprev] = useState(false)

    let products = []
    const [Products, setProducts] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/products/${props.categoryname}/${props.subcategory}`)
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
    }, [props.subcategory])
    products = [...Products]

    const [current, setcurrent] = useState(0)

    const previmage = () => {
        if (current === 0) {
            setcurrent(0)
        }
        else {
            setcurrent(current - 1)
        }

    }
    const nextimage = () => {
        if (current === products.length - 3) {
            setcurrent(products.length - 3)
        }
        else {
            setcurrent(current + 1)
        }
    }

    return (
        <div className='row d-flex ' style={{ position: "relative", marginTop : "20px" }} onMouseEnter={() => { setdisplaynextprev(true) }} onMouseLeave={() => { setdisplaynextprev(false) }}>
            {displaynextprev &&
                <div style={{
                    ...categoryimage, backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Ic_chevron_left_48px.svg/48px-Ic_chevron_left_48px.svg.png?20141023111631)",
                    position: "absolute", width: "50px", top: "30%",opacity : "50%", left : "0", zIndex : "1"
                }} onClick={previmage}>
                </div>
            }
            <div className='d-flex justify-content-between' >
                {
                    Products.filter(product =>
                        products.indexOf(product) >= current &&
                        products.indexOf(product) <= current + 2
                    ).map(product =>
                        <ProductCard ProductName={product.productName} url={product.url} key={product.productId} Id={product.productId} category={product.productCategory} subCategory={product.productSubCategory} Price={product.productPrice}/>
                    )
                }
            </div>
            {displaynextprev &&
                <div style={{
                    ...categoryimage, backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ic_chevron_right_48px.svg/1200px-Ic_chevron_right_48px.svg.png)",
                    opacity : "50%", position: "absolute", width: "50px", top: "30%", right : "0"
                }} onClick={nextimage}>
                </div>
            }
        </div>
    )
}

export default SubcategoryProducts