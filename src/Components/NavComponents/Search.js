import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import SearchProducts from './SearchProducts'

function Search(props) {
    const params = useParams()
    const [Search, setSearch]= useState(params.Search)
    const [SearchedProducts, setSearchedProducts] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/products/search/${params.search}`)
            .then((response) => {
                setSearchedProducts([...response.data])
            }
            )
    }, [params.search])
    console.log(SearchedProducts)
    return (
        <div>
            {SearchedProducts.length==0 ?
                <div className='fluid-container bg-danger text-center'>No Results for your Search</div>
                :
                <SearchProducts SearchedProducts={SearchedProducts} Search={Search}/>
            }
        </div>
    )
}

export default Search