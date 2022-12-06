import React from 'react'
import CategoriesCard from './CategoriesCard'
import Categoriesbar from '../CommonComponents/Categoriesbar'


function Categories(props) {
  //each category is mapped to a category card
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