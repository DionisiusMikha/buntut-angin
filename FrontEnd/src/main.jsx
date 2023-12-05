import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import {Provider} from 'react-redux'
import store from './Redux/Store'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
)
