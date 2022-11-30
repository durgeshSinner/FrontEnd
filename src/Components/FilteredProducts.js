import axios from 'axios'
import ProductCard from './ProductCard'
import React, { useEffect, useState } from 'react'
import './CSS/Dropdown.css'

function FilteredProducts(props) {
    const [rangedisplay, setrangedisplay] = useState(true)
    const [FilteredProducts, setFilteredProducts] = useState([])
    console.log(props.category)
    // const [displayraw, setdisplayraw] = useState(true)
    // const [displaysorted, setdisplaysorted] = useState(false)
    useEffect(() => {
        axios.post(`http://localhost:8080/products/getFilteredProducts`, {
            category: props.category,
            subCategory: props.subCategory,
            minPrice: props.minPrice,
            maxPrice: props.maxPrice,
            products: [...props.SearchedProducts]
        }).then(response => { console.log(response); setFilteredProducts(response.data) })
            .catch(e => { console.log(e) })
    }, [])
    // const SorthightoLow = () => {
    //     setdisplayraw(false)
    //     setdisplaysorted(true)
    // }
    return (
        <div className='container-fluid m-3'>
            <div className='row'>
                <div className='col-sm-3 productFilter justify-content-center'>
                    <div className='m-3'><button onClick={(event) => {
                        event.preventDefault();
                        if (rangedisplay == true) { setrangedisplay(false) }
                        else { setrangedisplay(true) };
                    }} style={{ border: "none" }}>"CLICK HERE"</button></div>
                    <div>
                        <form >
                            <div style={{ position: "relative" }}>
                                {rangedisplay ?
                                    <>
                                        <label>Min Price :</label>
                                        <input type="range" className='filterrange m-2' name="vol" min="0" max="100" style={{ position: "absolute", zIndex: "1", Color: "#d3d3d3" }}></input>
                                        <input type="range" className='filterrange m-2' name="vol" min="0" max="100" style={{ position: "absolute", backgroundColor: "#d3d3d3" }}></input>
                                    </>
                                    :
                                    <>
                                        <label>Max Price :</label>
                                        <input type="range" className='filterrange m-2' name="vol" min="0" max="100" style={{ position: "absolute", backgroundColor: "#d3d3d3" }}></input>
                                        <input type="range" className='filterrange m-2' name="vol" min="0" max="100" style={{ position: "absolute", zIndex: "1", backgroundColor: "#d3d3d3" }}></input>
                                    </>
                                }</div>
                            <div className='m-3'>
                                <button type="submit" onClick={(event) => {
                                    event.preventDefault();
                                    console.log(event)
                                    props.setfilters({ ...props.filters, minPrice: event.target.form[0].value, maxPrice: event.target.form[1].value })
                                }}>Apply filter</button>
                                {/* <button onClick={SorthightoLow}>Sort</button> */}
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-sm-8 row productContainer'>
                    {
                        FilteredProducts
                            .map(product => <ProductCard ProductName={product.productName} url={product.url}
                                key={product.productId} Id={product.productId}
                                category={product.productCategory}
                                subCategory={product.productSubCategory} Price={product.productPrice} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default FilteredProducts