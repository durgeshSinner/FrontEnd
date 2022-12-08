import React, { useEffect } from 'react'
import { useState } from 'react'
import { Categoriesdata } from '../../App'
import '../CSS/Navbar.css'
import '../CSS/Inputs.css'

function SearchFilters(props) {
    //to change the range display from setting min price to setting max price
    const [rangedisplay, setrangedisplay] = useState(true)
    // to display range input
    const [minprice, setminprice] = useState(0)
    // to display range input
    const [maxprice, setmaxprice] = useState(100)
    //necessary state declaration for making subcategory visible upon selecting a category
    const [compcategory, setcompcategory] = useState("")
    //to make the component update after useeffect is done
    const [out, setout] = useState(
        false
    )
    //resetting filters on change in Search 
    useEffect(() => {
        (async () => { setcompcategory(""); 
        setmaxprice(100);
        setminprice(0);
        setout(false);
         props.updatefilters("", "", 0, 100) })()
            .then(() => {

                setout(true)
            })

    }, [props.Search])

    return (
        <>{out &&
            <div>
                <form>
                    <div >
                        <div className=' filterstyle d-flex justify-content-around m-1'>
                            <label  >Category:</label>
                            <select className='filterselectstyle' name="Category" onChange={(event) => {
                                event.preventDefault();
                                setcompcategory(event.target.value)
                            }}>
                                <option value={props.category} selected>{props.category}</option>
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
                                                    if (item.category === compcategory) { return true }
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
                                    if (rangedisplay === true) { setrangedisplay(false) }
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
                                    if (rangedisplay === true) { setrangedisplay(false) }
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
                            if (compcategory === "") {
                                props.updatefilters("", "", event.target.form[2].value, event.target.form[3].value)
                            }
                            else {
                                props.updatefilters(event.target.form[0].value, event.target.form[1].value, event.target.form[3].value, event.target.form[4].value)
                            }
                        }}>Submit</button>
                    </div>

                </form>

            </div>

        } </>
    )
}

export default SearchFilters