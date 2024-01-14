import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AddCash from './Pages/AddCash.jsx'
import GetCash from './Pages/GetCash.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/getcash",
    element: <GetCash/>,
  },
  {
    path: "/addcash",
    element: <AddCash/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
