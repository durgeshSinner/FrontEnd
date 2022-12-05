import React, { useEffect, useState } from 'react'
import ProductCard from '../CommonComponents/ProductCard'
import axios from 'axios'
import '../CSS/Search.css'
import { Categoriesdata } from '../../App'
import '../CSS/Inputs.css'
import Categoriesbar from '../CommonComponents/Categoriesbar'
import SearchFilters from './SearchFilters'

function SearchProducts(props) {
    const [products, setproducts] = useState([])
    const [filters, setfilters] = useState({
        category: "",
        subCategory: "",
        minPrice: "0",
        maxPrice: "100"
    })
    useEffect(() => {

        axios.post(`http://localhost:8080/products/getFilteredProducts`, {
            category: filters.category,
            subCategory: filters.subCategory,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            products: [...props.SearchedProducts]
        }).then(response => {
            setproducts(response.data)
        })
            .catch(e => { console.log(e) })
    }, [filters, props.SearchedProducts,props.Search])

    return (
        <>
            <Categoriesdata.Consumer>{
                data => {
                    return <Categoriesbar categories={data} />
                }
            }
            </Categoriesdata.Consumer>

            <div className='container-fluid row '>
                <div className='col-sm-3 productFilter justify-content-center'>
                    <SearchFilters category="" setfilters={setfilters} filters={filters} SearchedProducts={props.SearchedProducts}/>
                </div>
                <div className='col-sm-8 row productContainer'>
                    {products.length == 0 ?
                        < div className='fluid-container bg-danger text-center'>No Results for your Search</div>
                        :
                        products.map(product => <ProductCard ProductName={product.productName} url={product.url}
                            key={product.productId} Id={product.productId}
                            category={product.productCategory}
                            subCategory={product.productSubCategory} Price={product.productPrice} />)
                    }
                </div>
            </div>
        </>
    )
}

export default SearchProducts