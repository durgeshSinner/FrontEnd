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
  //state for getting categories
  const [categories, Setcategories] = useState([])

  // flag to ensure useeffect runs before rendering
  const [flag, setflag] = useState(false)

  //axios call to get category and subcategory info
  useEffect(() => {
    axios.get('http://localhost:8080/products/Getcategories')
      .then(res => { Setcategories([...res.data]) })
      .catch(e => console.log(e))
  }, [])

  //toastify 
  const notify = (message) => {
    toast(message);
  }
  
  //function to determine current user
  const userlogged = () => {
    if (localStorage.getItem('token') == null) {
      return false
    }
    else {
      return true
    }
  }

  //state declaration of logged user details
  const [userLogged, setuserLogged] = useState({
    logged: userlogged(),
    id: "",
    role: ""
  });

  //to get the info of current user and sets flag to true
  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
      if (!userLogged.logged) {
        setflag(true)
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
            notify("Please log In Session Expired")
            localStorage.clear();
            setuserLogged({
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
  const Loggedin = (id, role) => {
    setuserLogged({
      logged: true,
      id: id,
      role: role
    })
    console.log("Logged In")
  }

  return (
    <div >
      {flag &&
        <Categoriesdata.Provider value={categories}>
          <log.Provider value={userLogged}>
            <Nav Loggedin={Loggedin} Loggedout={Loggedout}></Nav>

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
