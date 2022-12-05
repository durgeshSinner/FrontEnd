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
import NoPage from './Components/CommonComponents/NoPage';


export const log = React.createContext();
export const Categoriesdata = React.createContext();

function App() {
  const [categories, Setcategories] = useState([])
  const [flag, setflag] = useState(false)
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

  const [userLogged, setuserLogged] = useState({
    logged: userlogged(),
    id: "",
    role: ""
  });
  console.log(userLogged)

  useEffect(() => {
    (async () => {
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
          setuserLogged({
            logged: true,
            id: res.data[0],
            role: res.data[1]
          })
          setflag(true)
        }
        )
          .catch(e => {
            notify("token Expired"); localStorage.clear(); setuserLogged({
              logged: false,
              id: "",
              role: ""
            })
            setflag(true)
          })
      }
    })()

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
      {flag &&
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
              <Route path="*" element={<NoPage />} />
            </Routes>
          </log.Provider>
        </Categoriesdata.Provider>
      }
    </div>
  );

}
export default App;
