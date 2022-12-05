import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../CommonComponents/ProductCard'
import '../CSS/Dropdown.css'
import Filters from './Filters'
import { Categoriesdata } from '../../App'
import Categoriesbar from '../CommonComponents/Categoriesbar'


function CategorizedProducts() {
    const params = useParams()
    const Category = params.category
    let SubCategory
    const [products, setproducts] = useState([])
    const [filters, setfilters] = useState({
        category: Category,
        subCategory: "",
        minPrice: "0",
        maxPrice: "100"
    })
    useEffect(() => {
        setfilters({
            ...filters, category : Category, subCategory : ""
        })
    }, [Category])
    useEffect(() => {
        if (params.subcategory === "subcategory" && filters.subCategory === "") { SubCategory = "" }
        else if (params.subcategory === "subcategory" && filters.subCategory !== "") { SubCategory = filters.subCategory }
        else { SubCategory = params.subcategory }
        axios.post(`http://localhost:8080/products/getFilteredProducts`, {
            category: Category,
            subCategory: SubCategory,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            products: []
        }).then(response => {
            setproducts(response.data)
        })
            .catch(e => { console.log(e) })
    }, [filters])

    return (
        <>
            <Categoriesdata.Consumer>{
                data => {
                    return <Categoriesbar categories={data} />
                }
            }
            </Categoriesdata.Consumer>
            <div className='container-fluid row justify-content-center '>
                <div className='col-sm-3 productFilter justify-content-center'>
                    <Filters category={params.category} setfilters={setfilters} />
                </div>
                <div className='col-sm-8 row productContainer'>
                    {
                        products
                            .map(product => <ProductCard ProductName={product.productName} url={product.url}
                                key={product.productId} Id={product.productId}
                                category={product.productCategory}
                                subCategory={product.productSubCategory} Price={product.productPrice} />)
                    }
                </div>
            </div>
        </>
    )
}

export default CategorizedProducts