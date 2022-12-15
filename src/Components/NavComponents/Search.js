import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import ProductCard from '../CommonComponents/ProductCard'
import { Categoriesdata } from '../../App'
import '../CSS/Inputs.css'
import SearchFilters from './SearchFilters'
import Categoriesbar from '../CommonComponents/Categoriesbar'

function ProductSearch(props) {

    const params = useParams()
    const [filteredProducts, setfilteredProducts] = useState([])
    const [status, setstatus] = useState("Loading")
    const [search, setsearch] = useState("")

    const [filters, setfilters] = useState({
        category: "",
        subCategory: "",
        minPrice: "0",
        maxPrice: "100"
    })
    const updatefilters = (category, subCategory, minPrice, maxPrice) => {
        setfilters({
            category: category,
            subCategory: subCategory,
            minPrice: minPrice,
            maxPrice: maxPrice
        }
        )
    }
    useEffect(() => {
        setstatus("Loading")
        console.log(filters)
        if (search === params.search) {
            axios.post(`http://localhost:8080/products/getFilteredProducts`, { ...filters, productName: params.search })
                .then((response) => {
                    setfilteredProducts(response.data)
                    console.log(response.data)
                    setstatus("done")
                }
                )
                .catch(e => {
                    console.log(e)
                })
        }
        else {
            updatefilters("","",0,100)
            axios.post(`http://localhost:8080/products/getFilteredProducts`, {
                category: "",
                subCategory: "",
                minPrice: "0",
                maxPrice: "100", 
                productName: params.search
            })
                .then((response) => {
                    setsearch(params.search)
                    setfilteredProducts(response.data)
                    console.log(response.data)
                    setstatus("done")
                }
                )
                .catch(e => {
                    console.log(e)
                })
        }


    }, [params.search, filters])
    return (
        <>
            <Categoriesdata.Consumer>{
                data => {
                    return <Categoriesbar categories={data} />
                }
            }
            </Categoriesdata.Consumer>
            {status === "Loading" &&
                <div className='bg-warning'>Loading .. </div>}
            {status === "done" &&
                <div className='container-fluid row '>
                    <div className='col-sm-3 productFilter justify-content-center'>
                        <SearchFilters updatefilters={updatefilters} filters={filters} />
                    </div>
                    <div className='col-sm-8 row productContainer'>
                        {filteredProducts.length === 0 ?
                            < div className='fluid-container bg-warning text-center'>No Results for your Filters on Search</div>
                            :
                            filteredProducts.map(product => <ProductCard ProductName={product.productName} url={product.url}
                                key={product.productId} Id={product.productId}
                                category={product.productCategory}
                                subCategory={product.productSubCategory} Price={product.productPrice} />)
                        }
                    </div>
                </div>}
        </>
    )
}

export default ProductSearch