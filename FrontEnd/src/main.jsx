import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import {Provider} from 'react-redux'
import store from './Redux/Store'
import { ChakraProvider } from '@chakra-ui/react'
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
const materialTheme = materialExtendTheme();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <ChakraProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ChakraProvider>
    </MaterialCssVarsProvider>
  </React.StrictMode>,
)