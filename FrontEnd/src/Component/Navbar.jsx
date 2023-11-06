import { useRef, useState } from "react";
import "./navstyle.css";
import logo from "/img/Logo-lebar.png"
import logo2  from "/img/Logo-lebar 1.png"
import burger from "/img/burger.png"
import { Avatar } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'

function Navbar (){
  const [navClick, setNavClick] = useState(false);

  function navClickHandler(){
    setNavClick(!navClick)
  }

  return(
    <>
      <div className="flex flex-row pt-5 h-36 justify-between mx-16">
        <div>
          <img src={logo2} alt="" width="250px"/>
        </div>
        <div className="lg:block hidden">
          <div className="flex flex-row items-center">
            <div className="text-2xl py-5 px-10 hover:underline underline-offset-8 decoration-gray-400 hover:font-semibold"><a href="./">Home</a></div>
            <div className="text-2xl py-5 px-10 me-4 hover:underline underline-offset-8 decoration-gray-400 hover:font-semibold"><a href="./#aboutus">About Us</a></div>
          </div>
        </div>
        
        <div className="lg:hidden">
          <button className="btn btn-ghost" onClick={navClickHandler}>
            <img src={burger} alt="" style={{height: "50px"}} />
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar