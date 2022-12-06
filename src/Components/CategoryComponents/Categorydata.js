import React from 'react'
import Categories from './Categories'
import {Categoriesdata} from '../../App'
// '/category' route paarent element
function Categorydata() {
   
    return (
        //context containing information of categories and subcategories and passed as props
        <Categoriesdata.Consumer>{
            data => {return <Categories categories={data}/>}
            }
        
        </Categoriesdata.Consumer>
    )
}

export default Categorydata