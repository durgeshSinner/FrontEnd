import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import ProductCard from '../CommonComponents/ProductCard'
import { Categoriesdata } from '../../App'
import '../CSS/Inputs.css'
import SearchFilters from './SearchFilters'
import Categoriesbar from '../CommonComponents/Categoriesbar'
import { useLocation } from "react-router-dom";

function ProductSearch(props) {
    const history = useLocation();

    const params = useParams()
    const [Search, setSearch] = useState()
    const [status, setstatus] = useState()
    const SearchedProducts = useRef([])
    const updateSearchedproducts = (response) => {
        SearchedProducts.current = response
        console.log(response)
    }
    const [filteredProducts, setfilteredProducts] = useState([])

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
        })
    }
    const updateproducts = async (products) => {
        await axios.post(`http://localhost:8080/products/getFilteredProducts`, {
            category: filters.category,
            subCategory: filters.subCategory,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            products: SearchedProducts.current

        }).then((response) => {
            if (response.status === 200) {
                setfilteredProducts([...response.data]);
                return Promise.resolve("Search Products updated");
            }
            else if (response.status === 204) {
                setfilteredProducts([]);
                return Promise.resolve("Search Products null");
            }
        })
    }
    console.log(SearchedProducts.current.length)
    console.log(history.pathname.substring(10))
    useEffect(() => {
        let filtersearch = true;
        (async () => {
            setstatus("loading")
            if (Search !== history.pathname.substring(10)) {
                updatefilters("", "", 0, 100)
                setSearch(params.search)
                await axios.get(`http://localhost:8080/products/search/${params.search}`)
                    .then((response) => {
                        console.log("inside")
                        if (response.status === 200) {
                            let products = response.data
                            updateSearchedproducts(products)
                            products = [...response.data]
                            console.log(response.data)
                            return Promise.resolve("sucess")
                        }
                        else if (response.status === 204) {
                            updateSearchedproducts([])
                            return Promise.resolve("sucess");
                        }
                    }
                    )
                    .catch(e => {
                        console.log(e)
                    })
            }
            else {
                return Promise.reject("in the same search")
            }
        })()
            .then(() => {
                if (filtersearch) {
                    console.log(SearchedProducts)
                    if (SearchedProducts.current.length === 0) { console.log("none"); setstatus("none") }
                    else {
                        updateproducts(SearchedProducts).then(() => {
                            console.log("update status");
                            setstatus("done")
                        })
                    }
                }
                else { console.log("something went wrong") }
            })
            .catch(() => {
                if (filtersearch) {
                    if (SearchedProducts.length === 0) { console.log("none"); setstatus("none") }
                    else {
                        updateproducts(SearchedProducts).then(() => {
                            console.log("update status");
                            setstatus("done")
                        })
                    }
                }
                else { console.log("something went wrong") }
            })

        return () => {
            console.log("unmounted")
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

            <div className='container-fluid row '>
                <div className='col-sm-3 productFilter justify-content-center'>
                    <SearchFilters updatefilters={updatefilters} filters={filters} />
                </div>
                {status === "loading" &&
                    <div className='col-sm-8 text-center bg-warning'>Loading ...</div>}
                {status === "done" &&
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
                }
                {status == "none" &&
                    <div className='col-sm-8 text-center bg-danger'>No Products related to your search</div>
                }
            </div>
        </>
    )
}

export default ProductSearch