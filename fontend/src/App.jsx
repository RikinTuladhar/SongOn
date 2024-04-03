import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import Layout from './pages/Layout';
import About from './pages/About';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children :[
        {
          path: "/",
          element:<HomePage/>
        },
        {
          path: "/about",
          element:<About/>
        }
      ]
    }
    
  ])

  // console.log(router)


  return (
    <>
      <RouterProvider router={router} /> 


    </>
  )
}

export default App
