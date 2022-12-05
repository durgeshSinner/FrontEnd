import React, { useState } from 'react'
import '../CSS/Navbar.css'
import Subcategorycard from './Subcategorycard'
import SubcategoryProducts from './SubcategoryProducts'

function CategoriesCard(props) {
    const categoryimage = {
        width: "auto",
        height: "100px",
        backgroundImage: "",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"

    }
    const [subcategory, setsubcategory] = useState(0)
    const [displaycategory, setdispaycategory] = useState(false)
    const [displaysubcategory, setdisplaysubcategory] = useState(false)



    categoryimage.backgroundImage = `${props.url}`
    const prevsubcategory = () => {
        if (subcategory === 0) {
            setsubcategory(0)
        }
        else {
            setsubcategory(subcategory - 1)
        }
    }
    const nextsubcategory = () => {
        if (subcategory === props.subcategories.length - 1) {
            setsubcategory(props.subcategories.length - 1)
        }
        else {
            setsubcategory(subcategory + 1)
        }
    }
    const showproducts = () => {
        setdisplaysubcategory(true)
        console.log("called")
    }
    const hideproducts = () => {
        setdisplaysubcategory(false)
        console.log("hide")
    }

    return (

        <div className='container-fluid ' id={`${props.Categoryname}`} style={{ width: "75%", marginLeft: "auto", marginRight: "auto", marginTop: "20px", marginBottom: "20px" }} onMouseLeave={() => { setsubcategory(0); hideproducts() }}>
            <div className='row category' onMouseLeave={() => { setdispaycategory(false); }} onMouseEnter={() => { setdispaycategory(true); }}>
                <div className='col-sm-3 categorycard' >
                    <div>{props.Categoryname}</div>
                    <div className='row justify-content-between' style={categoryimage}></div>
                </div>

                {
                    !displaycategory &&
                    <div className='categoryitems col-sm-4 p-2' >
                    </div>}
                {
                    displaycategory && <>
                        <div className='categoryitems row justify-content-end' >
                            <div className='col-sm-9 row justify-content-between p-0'>
                                <div className='col-sm-1 subcategorycard nexticon'
                                    style={{
                                        ...categoryimage, backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Ic_chevron_left_48px.svg/48px-Ic_chevron_left_48px.svg.png?20141023111631)",
                                        backgroundPosition: "center", height: "auto"
                                    }}
                                    onClick={prevsubcategory}>
                                </div>
                                <Subcategorycard url={props.url} subcategories={props.subcategories[subcategory].subcategory} category={props.Categoryname} displayproducts={showproducts} />
                                <div className='col-sm-1 subcategorycard nexticon'
                                    style={{
                                        ...categoryimage, backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ic_chevron_right_48px.svg/1200px-Ic_chevron_right_48px.svg.png)",
                                        backgroundPosition: "center", height: "auto"
                                    }}
                                    onClick={nextsubcategory}>
                                </div>
                            </div>
                        </div>

                    </>
                }


            </div>
            <div className='row'>{
                displaysubcategory &&
                <SubcategoryProducts categoryname={props.Categoryname} subcategory={props.subcategories[subcategory].subcategory} />
            }
            </div>
        </div>

    )
}

export default CategoriesCard