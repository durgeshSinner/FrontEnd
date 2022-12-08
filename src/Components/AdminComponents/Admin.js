import React, { useState, useContext, useEffect } from 'react'
import { Categoriesdata } from '../../App'
import '../CSS/Inputs.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { log } from '../../App'
import { useNavigate } from 'react-router-dom'

function Admin() {
    //component only for ADMIN ROLE

    const navigate = useNavigate()
    const loggeddata = useContext(log) 
    //Context of User details 
    //loggeddata.logged bolean value if a user if logged or not
    //loggeddata.Id  | if logged users Id  else ""
    //loggeddata.Role | if logged users Role  else ""

    const notify = (message) => {
        toast(message); //toastify alert
    }

    //checks user loggged or not
    const validuser = () => {
        console.log(loggeddata)
        if (!loggeddata.logged) {
            return Promise.reject("User Not Logged")
        }
        else {
            return Promise.resolve("User Logged")
        }
    }
    //checks users Role
    const validpageuser = () => {
        if (loggeddata.role === "ADMIN") { return Promise.resolve("ADMIN ROLE") }
        else { return Promise.reject("USER ROLE") }
    }
    useEffect(() => {

        validuser().then(() => {
            validpageuser().then().catch(() => {
                notify("Can not perform ADMIN actions")
                navigate("/")
            })
        })
            .catch(() => {
                notify("please log in")
                navigate("/")
            })
    }, [])

    //states used for getting subcategories of slelected category
    const [addcategory, setaddcategory] = useState("")
    const [modcategory, setmodcategory] = useState("")

    const formvalidation = (e) => {
        if (e.target.form[0].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately") }
        else if (e.target.form[1].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
        else if (e.target.form[2].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
        else if (e.target.form[3].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
        else if (e.target.form[4].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
        else if (e.target.form[5].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
        else if (e.target.form[6].value === "") { notify("Please fill the details appropriately"); return Promise.reject("Please fill the details appropriately"); }
        else {
            return Promise.resolve("Filled")
        }
    }

    return (
        <>{
            loggeddata.role === "ADMIN" &&
            <div className='container-fluid'>
                <div className='row text-center'>
                    <div className='col-sm-6 profileinfocontainer'>
                        <div>Add Products</div>
                        <form>
                            <div className='d-flex justify-content-around m-3'>
                                <input placeholder='Id' style={{ visibility: "hidden" }} defaultValue="Id"></input>
                                <input placeholder='Product Name'></input>
                            </div>
                            <div className='d-flex justify-content-around m-3'>
                                <input placeholder='Product Price'></input>
                                <input placeholder='Product Details'></input>
                            </div>
                            <div className='d-flex justify-content-around m-3'>
                                <label  >Category:</label>
                                <select name="Category" onChange={(event) => {
                                    event.preventDefault();
                                    setaddcategory(event.target.value)
                                }}>
                                    <option value=""></option>
                                    <Categoriesdata.Consumer>{
                                        data => { return data.map(category => <option value={category.category} key={category.category} >{category.category}</option>) }
                                    }
                                    </Categoriesdata.Consumer>
                                </select>
                            </div>
                            <div className='d-flex justify-content-around  m-3'>
                                {addcategory !== "" &&
                                    <>
                                        <label  >SubCategory:</label>
                                        <select name="SubCategory" >
                                            <option value=""></option>
                                            <Categoriesdata.Consumer>{
                                                data => {
                                                    const array = data.filter(item => {
                                                        if (item.category === addcategory) { return true }
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
                            <div className='d-flex justify-content-around m-3'>
                                <input placeholder='image url'></input>
                            </div>
                            <div className='m-3'><button className='custombutton ' onClick={(event) => {
                                const config = {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("token")}`
                                    }
                                }
                                event.preventDefault();
                                formvalidation(event)
                                    .then(() => {
                                        axios.post(`http://localhost:8080/products/addProduct`, {
                                            productName: event.target.form[1].value,
                                            productPrice: event.target.form[2].value,
                                            productDetails: event.target.form[3].value,
                                            productCategory: event.target.form[4].value,
                                            productSubCategory: event.target.form[5].value,
                                            url: event.target.form[6].value
                                        }, config).then(() => notify("Product Added Sucessfully"))
                                    })
                                    .catch(() => { notify("Product unable to Add")})


                            }}> Submit</button></div>
                        </form>

                    </div >
                    <div className='col-sm-6 profileeditcontainer'>
                        <div>Modify Products</div>
                        <form>
                            <div className='d-flex justify-content-around m-3'>
                                <input placeholder='Id'></input>
                                <input placeholder='Product Name'></input>
                            </div>
                            <div className='d-flex justify-content-around m-3'>
                                <input placeholder='Product Price'></input>
                                <input placeholder='Product Details'></input>
                            </div>
                            <div className='d-flex justify-content-around m-3'>
                                <label  >Category:</label>
                                <select name="Category" onChange={(event) => {
                                    event.preventDefault();
                                    setmodcategory(event.target.value)
                                }}>
                                    <option value=""></option>
                                    <Categoriesdata.Consumer>{
                                        data => { return data.map(category => <option value={category.category} key={category.category} >{category.category}</option>) }
                                    }
                                    </Categoriesdata.Consumer>
                                </select>
                            </div>
                            <div className='d-flex justify-content-around m-3'>
                                {modcategory !== "" &&
                                    <>
                                        <label  >SubCategory:</label>
                                        <select name="SubCategory" >
                                            <option value=""></option>
                                            <Categoriesdata.Consumer>{
                                                data => {
                                                    const array = data.filter(item => {
                                                        if (item.category === modcategory) { return true }
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
                            <div className='d-flex justify-content-around m-3'>
                                <input placeholder='image url'></input>
                            </div>
                            <div className='m-3'><button className='custombutton' type='submit' onClick={(event) => {
                                const config = {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("token")}`
                                    }
                                }
                                event.preventDefault();
                                formvalidation(event)
                                    .then(() => {
                                        axios.post(`http://localhost:8080/products/update`, {
                                            productId: event.target.form[0].value,
                                            productName: event.target.form[1].value,
                                            productPrice: event.target.form[2].value,
                                            productDetails: event.target.form[3].value,
                                            productCategory: event.target.form[4].value,
                                            productSubCategory: event.target.form[5].value,
                                            url: event.target.form[6].value
                                        }, config).then(() => notify("Product Updated Sucessfully"))
                                    })
                                    .catch((e) => { notify("Unable to Update Product") })


                            }}> Submit</button></div>
                        </form>
                    </div>

                </div >

            </div >
        }

        </>
    )

}

export default Admin