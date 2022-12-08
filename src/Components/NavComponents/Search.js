import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import SearchProducts from './SearchProducts'

function Search() {
    //to get the path params
    const params = useParams()
    //search word from path is extracted and assigned 
    const [Search, setSearch]= useState(params.search)

    //Search related Products
    const [SearchedProducts, setSearchedProducts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/products/search/${params.search}`)
            .then((response) => {
                if(response.status===200){setSearchedProducts([...response.data])}
                else if(response.status===204){setSearchedProducts([])}
                setSearch(params.search)
            }
            )
    }, [params.search])
    console.log(Search)
    return (
        <div>
            {SearchedProducts.length===0 ?
                <div className='fluid-container bg-warning text-center'>No Results for your Search</div>
                :
                <SearchProducts SearchedProducts={SearchedProducts} Search={Search}/>
            }
        </div>
    )
}

export default Search