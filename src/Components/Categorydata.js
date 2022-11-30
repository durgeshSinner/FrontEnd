import React from 'react'
import Categories from './Categories'
import {Categoriesdata} from '../App'

function Categorydata() {
   
    return (
        <Categoriesdata.Consumer>{
            data => {return <Categories categories={data}/>}
            }
        
        </Categoriesdata.Consumer>
    )
}

export default Categorydata