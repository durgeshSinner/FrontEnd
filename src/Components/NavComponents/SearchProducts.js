import React, { useEffect, useState } from 'react'
import ProductCard from '../CommonComponents/ProductCard'
import axios from 'axios'
import '../CSS/Search.css'
import { Categoriesdata } from '../../App'
import '../CSS/Inputs.css'
import Categoriesbar from '../CommonComponents/Categoriesbar'
import SearchFilters from './SearchFilters'

function SearchProducts(props) {
    //these are the filtered products from search and filters
    const [products, setproducts] = useState([])
    //states for filters
    const [filters, setfilters] = useState({
        category: "",
        subCategory: "",
        minPrice: "0",
        maxPrice: "100"
    })
    //function passed through props
    const updatefilters = (category, subCategory, minPrice, maxPrice) => {
        setfilters({
            category: category,
            subCategory: subCategory,
            minPrice: minPrice,
            maxPrice: maxPrice
        })
    }
    //getting the filtered products from searched products
    useEffect(() => {
        console.log(filters)
        axios.post(`http://localhost:8080/products/getFilteredProducts`, {
            category: filters.category,
            subCategory: filters.subCategory,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            products: [...props.SearchedProducts]
            
        }).then(response => {
            if(response.status===200){setproducts([...response.data])}
            else if(response.status===204){setproducts([])}
            
        })
            .catch(e => { console.log(e) })
    }, [filters, props.SearchedProducts, props.Search])
    useEffect(() => {
        setfilters({
            category: "",
            subCategory: "",
            minPrice: "0",
            maxPrice: "100"
        })
    },[props.Search])

    return (
        <>{props.Search &&
            <>
            <Categoriesdata.Consumer>{
                data => {
                    return <Categoriesbar categories={data} />
                }
            }
            </Categoriesdata.Consumer>

            <div className='container-fluid row '>
                <div className='col-sm-3 productFilter justify-content-center'>
                    <SearchFilters category="" updatefilters={updatefilters} filters={filters} SearchedProducts={props.SearchedProducts} Search={props.Search}/>
                </div>
                <div className='col-sm-8 row productContainer'>
                    {products.length == 0 ?
                        < div className='fluid-container bg-warning text-center'>No Results for your Search</div>
                        :
                        products.map(product => <ProductCard ProductName={product.productName} url={product.url}
                            key={product.productId} Id={product.productId}
                            category={product.productCategory}
                            subCategory={product.productSubCategory} Price={product.productPrice} />)
                    }
                </div>
            </div></>}
        </>
    )
}

export default SearchProducts