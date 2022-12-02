import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'


ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
    <React.StrictMode>
        <RouterProvider router={ router } />
    </React.StrictMode>
)
