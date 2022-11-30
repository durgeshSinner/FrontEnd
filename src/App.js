import { Routes, Route } from 'react-router-dom'
import Aboutus from './Components/Aboutus';
import Home from './Components/Home';
import Products from './Components/Products';
import Nav from './Components/Nav'
import Cart from './Components/Cart';
import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Profile from './Components/Profile';
import Categorydata from './Components/Categorydata';
import axios from 'axios'
import Search from './Components/Search';
import CategorizedProducts from './Components/CategorizedProducts';
import Orders from './Components/Orders';


export const log = React.createContext();
export const Categoriesdata = React.createContext();

function App() {

  const [categories, Setcategories] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8080/products/Getcategories')
      .then(res => { console.log(res); Setcategories([...res.data]) })
      .catch(e => console.log(e))
  }, [])


  const [userLogged, setuserLogged] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('Id') == undefined) {
      setuserLogged(false)
      console.log("effect in app")
    }
    else {
      console.log("effect in app")
      setuserLogged(true)
    }
  }, [])
  console.log("app")
  const LoggedIn = () => {
    setuserLogged(true)
    console.log("Logged In")
  }
  const Loggedout = () => {
    setuserLogged(false)
    console.log("Logged Out")
  }

  return (
    <div >
      <Categoriesdata.Provider value={categories}>
          <log.Provider value={userLogged}>
            <Nav userlogged={userLogged} loggedin={LoggedIn} loggedout={Loggedout} ></Nav>
            {/* {displayfilters && <Filtersbar categories={categories} filters={filters} setfilters={setfilters} />} */}

            <ToastContainer />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products/:category/:subcategory/:Id' element={<Products />} />
              <Route path='/products/:search' element={<Search/>} />
              <Route path='/categories' element={<Categorydata />} />
              <Route path='/browseproducts/:category/:subcategory' element={<CategorizedProducts/>}/>
              <Route path='/aboutus' element={<Aboutus />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/orders' element={<Orders/>}/>
              <Route path='/profile' element={<Profile userlog={Loggedout} />} />
            </Routes>
          </log.Provider>
      </Categoriesdata.Provider>
    </div>
  );
}

export default App;
