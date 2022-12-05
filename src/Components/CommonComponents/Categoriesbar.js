import React from 'react'
import Category from './Category'
import {Link} from 'react-router-dom'


function Categoriesbar(props) {

    return (

        <div className='container-fluid bg-light p-0 d-flex ' style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}>
            {
                props.categories.
                map(category =>
                                <Link to={`/browseproducts/${category.category}/subcategory `} style={{textDecoration : "none"}} className="col-sm-2" key={category.category}>
                                    <Category Categoryname={category.category}
                                        url={category.url}  />
                                </Link>
                )
            }
        </div>
    )
}

export default Categoriesbar