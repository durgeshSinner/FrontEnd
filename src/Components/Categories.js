import React, { useEffect, useState } from 'react'
import CategoriesCard from './CategoriesCard'
import Categoriesbar from './Categoriesbar'


function Categories(props) {
  
  return (
    <>
      <Categoriesbar categories={props.categories}/>

      {
        props.categories.map(category => <CategoriesCard Categoryname={category.category} url={category.url} subcategories={category.subcategory} key={category.category} />)
      }




    </>
  )
}

export default Categories