import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from "axios";
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import ProductDetails from './components/ProductDetails'
import CategoryProducts from './components/CategoryProducts'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ProfilePage from './components/ProfilePage'
import Cart from './components/Cart'
import OldOrders from './components/OldOrders'
import Order from './components/Order'
import OrderDetails from './components/OrderDetails'

import { useGlobalState } from './state/provider'


import { domain, usertoken, header } from './env'

const App = () => {
  const [{ profile, pagereload},dispatch] = useGlobalState()
  const userToken = window.localStorage.getItem("token")
  useEffect(() => {
    if (userToken !== null) {
      const getdata = async () => {
        await Axios({
          // Check ở trong env.js
          method: "get",
          url: `${domain}/api/profile/`,
          headers: {
            Authorization: `token ${usertoken}`
          }
        }).then(response => {
          let user = response.data['data']
          // console.log(response["data"],"$$$$user Profile data");
          dispatch({
            type: "ADD_PROFILE",
            profile: user
          })
        })
      }
      getdata()
    }
  }, [pagereload])



  useEffect(() => {
    const getcart = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/cart/`,
        headers: header
      }).then(response => {
        {
          const all_data = []
          response?.data.map(data => {
            if (data.complit) {
              all_data.push(data)
              dispatch({
                type: "ADD_CARTCOMPLIT",
                cartcomplit: all_data
              })
            }
            else {
              dispatch({
                type: "ADD_CARTUNCOMPLIT",
                cartuncomplit: data
              })
            }
          })
        }
      })
    }
    getcart()
  }, [])



  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/category/:id" component={CategoryProducts} />
        {
          profile !== null ? (
            <>
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/oldorders" component={OldOrders} />
              <Route exact path="/order" component={Order} />
              <Route exact path="/orderdetails/:id" component={OrderDetails} />
            </>
          ) : (
            <>
              <Route exact path="/login" component={LoginPage} />
            </>
          )
        }
        <Route exact component={HomePage} />
      </Switch>
    </BrowserRouter>

  )
}

export default App