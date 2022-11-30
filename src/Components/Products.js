import { Link, useParams } from 'react-router-dom'
import './CSS/Navbar.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Custombutton from './Custombutton'
import Addtocart from './Addtocart'
import Categoriesbar from './Categoriesbar'
import {Categoriesdata} from '../App'



function Products() {
  const params = useParams()
  const Id = params.Id
  const [product, setproduct] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:8080/products/getById/${Id}`)
      .then(response => setproduct(response.data))
      .catch(error => console.log(error))
  }, [])

  return (
    <div style={{ backgroundColor: "rgb(250, 243, 234)", height: "100vh" }}>
      <Categoriesdata.Consumer>{
        data => {
          return <Categoriesbar categories={data} />
        }
      }
      </Categoriesdata.Consumer>
      <div className='container-fluid m-3 '>
        <div className='row mt-4'>
          <div className='col-sm-5 productimage mt-3' style={{ backgroundImage: `url(${product.url})` }}></div>
          <div className='col-sm-7 mt-3'>
            <div className='productdetails' style={{ marginLeft: "15%" }}>
              <div style={{ marginTop: "25px" }}>
                <div style={{ fontSize: "22px" }}>Product Name : {product.productName}</div>
              </div>
              <div style={{ marginTop: "25px" }}>
                <div>Product Category : {product.productCategory}</div>
              </div>
              <div style={{ marginTop: "25px" }}>
                <div>Product Detials : {product.productDetails}</div>
              </div>
              <div style={{ marginTop: "25px" }}>
                <div>Product Price : {product.productPrice}</div>
              </div>
            </div>

          </div>
        </div>
        <div className='row'>
          <div className='d-flex justify-content-between col-sm-5 mt-3' >
            <Custombutton className="col-sm-3" message="Buy Now" />
            <Addtocart ProductId={Id} />
          </div>
          <div className='col-sm-7' style={{ paddingLeft: "15%" }}>
            <Link to="/categories"><Custombutton className="col-sm-3" message="....Back To Categories...." /></Link>

          </div>
        </div>
      </div>

    </div>

  )
}

export default Products