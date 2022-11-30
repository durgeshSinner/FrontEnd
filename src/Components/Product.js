import './CSS/Navbar.css'
import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';


function Product() {
    const productimage = {
        backgroundImage: "url(https://in.thermaltake.com/media/catalog/product/cache/cc8b24283b13da6bc2ff91682c03b54b/l/2/l20mousepad01.jpg)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat"
    }
    return (
        <div>
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-sm-3" style={productimage}>

                    </div>
                    <div className="col-sm-9">
                        <CardBody>
                            <CardTitle>Product name</CardTitle>
                            <CardSubtitle>Category</CardSubtitle>
                            <CardText>Details</CardText>
                            <div className='d-flex buttonposition'>
                                <Button>Buy now</Button>
                                <Button>Add to cart</Button>
                            </div>
                        </CardBody>

                    </div>
                </div>

            </div>


        </div>
    )
}

export default Product