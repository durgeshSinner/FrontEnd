import React, { useEffect } from 'react'
import { useState } from 'react'
import { Categoriesdata } from '../App'
import './CSS/Navbar.css'
import './CSS/Inputs.css'
function Filters(props) {
    
    const [rangedisplay, setrangedisplay] = useState(true)
    const [minprice, setminprice] = useState(0)
    const [maxprice, setmaxprice] = useState(100)

    return (
        <div>
            <form >
                <div className=' filterstyle d-flex justify-content-around m-1'>
                    <label  >SubCategory:</label>
                    <select className='filterselectstyle' name="SubCategory" >
                        <option value=""></option>
                        <Categoriesdata.Consumer>{
                            data => {
                                const array = data.filter(item => {
                                    if (item.category == props.category) { return true }
                                    else { return false }
                                });
                                return array[0].subcategory
                                    .map(item => <option value={item.subcategory} key={item.subcategory}>{item.subcategory}</option>)
                            }
                        }
                        </Categoriesdata.Consumer>
                    </select>
                </div>
                <div className='d-flex justify-content-between filterstyle p-4' >
                    <div>{minprice}</div>
                    <div>--Price--</div>
                    <div>{maxprice}</div>
                </div>
                <div style={{ position: "relative" }} className="filterstyle">
                    {rangedisplay ?
                        <>
                            <button className='custombutton' onClick={(event) => {
                                event.preventDefault();
                                if (rangedisplay == true) { setrangedisplay(false) }
                                else { setrangedisplay(true) };
                            }}>Set Min Price</button>
                            <input type="range" className='filterrange m-2' name="vol" defaultValue={0}
                                onChange={(event) => { setminprice(event.target.value) }} min="0" max="100" style={{ position: "absolute", zIndex: "1", Color: "#d3d3d3" }}></input>
                            <input type="range" className='filterrange m-2' name="vol" defaultValue={100}
                                min="0" max="100" style={{ position: "absolute", backgroundColor: "#d3d3d3" }}></input>
                        </>
                        :
                        <>
                            <button className='custombutton' onClick={(event) => {
                                event.preventDefault();
                                if (rangedisplay == true) { setrangedisplay(false) }
                                else { setrangedisplay(true) };
                            }}>Set Max Price</button>
                            <input type="range" className='filterrange m-2' defaultValue={0} name="vol" min="0" max="100" style={{ position: "absolute", backgroundColor: "#d3d3d3" }}></input>
                            <input type="range" className='filterrange m-2' defaultValue={100} name="vol"
                                onChange={(event) => { setmaxprice(event.target.value) }} min="0" max="100" style={{ position: "absolute", zIndex: "1", Color: "#d3d3d3" }}></input>
                        </>
                    }
                </div>
                <div>
                    <button className='custombutton' style={{ width: "100%" }} onClick={(event) => {
                        event.preventDefault();
                        console.log(event)
                        props.setfilters({
                            category: props.category,
                            subCategory: event.target.form[0].value,
                            minPrice: event.target.form[2].value,
                            maxPrice: event.target.form[3].value
                        })
                    }}>Submit</button>
                </div>


            </form>
        </div>
    )
}

export default Filters