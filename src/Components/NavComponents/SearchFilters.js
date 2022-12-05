import React, { useEffect } from 'react'
import { useState } from 'react'
import { Categoriesdata } from '../../App'
import '../CSS/Navbar.css'
import '../CSS/Inputs.css'

function SearchFilters(props) {
    const [rangedisplay, setrangedisplay] = useState(true)
    const [minprice, setminprice] = useState(0)
    const [maxprice, setmaxprice] = useState(100)
    const [compcategory, setcompcategory] = useState("")
    const [out , setout] = useState(false)

    useEffect(() => {
        props.setfilters({
            ...props.filters, category: "", subCategory: ""
        })
        timeout();
    }, [props.SearchedProducts])
    const timeout = ()=>{
        setout(false);
        setTimeout(() => {
            setout(true)
        }, 2);
    }


    return (
        <>
        {out &&
        <div>
            <form>
                <div >
                    <div className=' filterstyle d-flex justify-content-around m-1'>
                        <label  >Category:</label>
                        <select className='filterselectstyle' name="Category" defaultValue={props.category} onChange={(event) => {
                            event.preventDefault();
                            setcompcategory(event.target.value)
                        }}>
                            <option value=""></option>
                            <Categoriesdata.Consumer>{
                                data => { return data.map(category => <option value={category.category} key={category.category} >{category.category}</option>) }
                            }
                            </Categoriesdata.Consumer>
                        </select>
                    </div>
                    <div className=' filterstyle d-flex justify-content-around m-1'>
                        {compcategory !== "" &&
                            <>
                                <label  >SubCategory:</label>
                                <select className='filterselectstyle' name="SubCategory" defaultValue={props.filters.subCategory} >
                                    <option value=""></option>
                                    <Categoriesdata.Consumer>{
                                        data => {
                                            const array = data.filter(item => {
                                                if (item.category == compcategory) { return true }
                                                else { return false }
                                            });
                                            return array[0].subcategory.map(item => <option value={item.subcategory} key={item.subcategory}>{item.subcategory}</option>)
                                        }
                                    }
                                    </Categoriesdata.Consumer>
                                </select>
                            </>
                        }
                    </div>
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
                        if (compcategory === "") {
                            props.setfilters({
                                category: compcategory,
                                subCategory: "",
                                minPrice: event.target.form[2].value,
                                maxPrice: event.target.form[3].value
                            })
                        }
                        else {
                            props.setfilters({
                                category: event.target.form[0].value,
                                subCategory: event.target.form[1].value,
                                minPrice: event.target.form[3].value,
                                maxPrice: event.target.form[4].value
                            })

                        }
                    }}>Submit</button>
                </div>

            </form>

        </div>
    }
    </>
    )
}

export default SearchFilters