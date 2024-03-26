import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import  firebaseApp  from "../src/Firebase/Firebaseconfig.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index path='/' element={<App />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
