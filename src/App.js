import { Routes, Route } from 'react-router-dom'
import Home from './Components/HomeComponents/Home';
import Products from './Components/CommonComponents/Products';
import Nav from './Components/NavComponents/Nav'
import Cart from './Components/CartComponents/Cart';
import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Profile from './Components/ProfileComponents/Profile';
import Categorydata from './Components/CategoryComponents/Categorydata';
import axios from 'axios'
import Search from './Components/NavComponents/Search';
import CategorizedProducts from './Components/SearchbyCategory/CategorizedProducts';
import Admin from './Components/AdminComponents/Admin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const log = React.createContext();
export const Categoriesdata = React.createContext();

function App() {
  const [categories, Setcategories] = useState([])
  useEffect(() => {
    console.log("inside")
    axios.get('http://localhost:8080/products/Getcategories')
      .then(res => { Setcategories([...res.data]) })
      .catch(e => console.log(e))
  }, [])
  const notify = (message) => {
    toast(message);
  }

  const userlogged = () => {
    if (localStorage.getItem('token') == undefined) {
      return false
    }
    else {
      return true
    }
  }
  // const UserRole = async () => {
  //   if (localStorage.getItem("token") == undefined) { return "" }
  //   else {
  //     let data
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`
  //       }
  //     }
  //     await axios.get(`http://localhost:8080/token/user`, config)
  //       .then(res => {
  //         localStorage.setItem("Id", res.data[0]);
  //         console.log(res.data[1])
  //         data = res.data[1]
  //       })
  //     return data
  //   }
  // }
  // let data
  // const userdetails = (() => {
  //   
  //   UserRole().then((res) => { data = res })

  //   return (() => { return data })()

  // })();


  const [userLogged, setuserLogged] = useState({
    logged: userlogged(),
    id: "",
    role: ""
  });
  console.log(userLogged)

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    if (!userLogged.logged) {
      return;
    }
    else {
      axios.get(`http://localhost:8080/token/user`, config).then(res => {
        localStorage.setItem("Id", res.data[0]);
        setuserLogged({
          logged: true,
          id: res.data[0],
          role: res.data[1]
        })
      }
      )
        .catch(e => {
          notify("token Expired"); localStorage.clear(); setuserLogged({
            logged: false,
            id: "",
            role: ""
          })
        })
    }

  }, [])

  const Loggedout = () => {
    setuserLogged({
      logged: false,
      id: "",
      role: ""
    })
    console.log("Logged Out")
  }

  return (
    <div >
      <Categoriesdata.Provider value={categories}>
        <log.Provider value={userLogged}>
          <Nav userlogged={userLogged} setuserLogged={setuserLogged} ></Nav>

          <ToastContainer />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:category/:subcategory/:Id' element={<Products />} />
            <Route path='/products/:search' element={<Search />} />
            <Route path='/categories' element={<Categorydata />} />
            <Route path='/browseproducts/:category/:subcategory' element={<CategorizedProducts />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/profile' element={<Profile userlog={Loggedout} />} />
          </Routes>
        </log.Provider>
      </Categoriesdata.Provider>
    </div>
  );

}
export default App;
