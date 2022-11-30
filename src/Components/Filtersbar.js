import React, {  useState } from 'react'
import './CSS/Dropdown.css'
import { Categoriesdata } from '../App'


function Filtersbar(props) {
    const [compcategory, setcompcategory] = useState("")

    const submitfilter = (event) => {
        event.preventDefault();
        console.log(event)
        props.setfilters({ ...props.filters, category: event.target.form[0].value, subCategory: event.target.form[1].value })
    }
    console.log(props.filters)

    return (
        <div className='filters'>

            <div className='row'>
                <form>
                        <div className=' filterstyle d-flex justify-content-around m-1'>
                            <label  >Category:</label>
                            <select className='filterstyle' name="Category" defaultValue={props.filters.category} onChange={(event) => { event.preventDefault(); 
                                // props.setfilters({ ...props.filters, category: event.target.value, subCategory: "" }) 
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
                                    <select className='filterstyle' name="SubCategory" defaultValue={props.filters.subCategory} >
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
                    <div className='col-sm-4'>
                        <button type="submit" onClick={submitfilter}>Apply filter</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Filtersbar