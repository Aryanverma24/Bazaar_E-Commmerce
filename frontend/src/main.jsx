import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../src/index.css"
import { Route, RouterProvider , createRoutesFromElements } from 'react-router'
import { createBrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './redux/store.js'


//private

import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/user/Profile.jsx'

//Auth
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import AdminRoute from './pages/admin/AdminRoute.jsx'
import UserList from './pages/admin/UserList.jsx'
import Category from './pages/admin/Category.jsx'
import ProductList from './pages/admin/ProductList.jsx'
import ProductUpdate from './pages/admin/ProductUpdate.jsx'
import AllProducts from './pages/admin/AllProducts.jsx'
import Home from './Home.jsx'
import Favorites from './pages/Product/Favorites.jsx'
import ProductDetails from './pages/Product/ProductDetails.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >

      {/* Auth routes  */}
        <Route path='/login' element={ <Login />}/>
        <Route path='/register' element={ <Register />}/>
        <Route index={true} path='/' element={<Home />} />
        <Route path='/favourite' element={<Favorites /> } />
        <Route path='/product/:id' element={<ProductDetails /> } />

        {/* private user route */}
      <Route  path='' element={<PrivateRoute />} >
          <Route path='profile' element={<Profile />} />
      </Route>

      {/* admin routes */}

      <Route path='/admin' element={<AdminRoute />}>
        <Route path='userlist' element={<UserList />} />
        <Route path='categorylist' element={<Category />}/>
        <Route path='productlist' element={<ProductList />} />
        <Route path='allproductlist' element={<AllProducts />} />
        <Route path='product/update/:_id' element={<ProductUpdate /> } />
      </Route>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
 <RouterProvider router={router} />
 </Provider>
)