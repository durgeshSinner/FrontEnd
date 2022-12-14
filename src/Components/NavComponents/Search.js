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
    const [status, setstatus] = useState()
    const [submitfilters, setsubmitfilters] = useState(false)
    const SearchedProducts = useRef([])
    const Search = useRef("")
    console.log(Search.current)
    const updateSearchedproducts = (response) => {
        SearchedProducts.current = response
    }
    const [filteredProducts, setfilteredProducts] = useState([])

    const filters = useRef({
        category: "",
        subCategory: "",
        minPrice: "0",
        maxPrice: "100"
    })
    const updatefilters = (category, subCategory, minPrice, maxPrice) => {
        filters.current = {
            category: category,
            subCategory: subCategory,
            minPrice: minPrice,
            maxPrice: maxPrice
        }

    }
    const onsubmitfilters = () => {
        setsubmitfilters(!submitfilters)
    }
    const updateproducts = async (products) => {
        await axios.post(`http://localhost:8080/products/getFilteredProducts`, {
            category: filters.current.category,
            subCategory: filters.current.subCategory,
            minPrice: filters.current.minPrice,
            maxPrice: filters.current.maxPrice,
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

    useEffect(() => {
        console.log("effect")
        let filtersearch = true;
        (async () => {
            setstatus("loading")
            if (Search.current === "" || Search.current !== params.search) {
                console.log("called")
                updatefilters("", "", 0, 100)
                await axios.get(`http://localhost:8080/products/search/${params.search}`)
                    .then((response) => {
                        Search.current = params.search
                        if (response.status === 200) {
                            let products = response.data
                            updateSearchedproducts(products)
                            products = [...response.data]
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
                console.log("error")
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
            .catch((e) => {
                console.log(e)
                if (filtersearch) {
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

        return () => {
            console.log(status)
            console.log("unmounted")
        }
    }, [params.search, submitfilters])
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
                    {status === "done" &&
                        <SearchFilters updatefilters={updatefilters} onsubmitfilters={onsubmitfilters} filters={filters} />
                    }
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