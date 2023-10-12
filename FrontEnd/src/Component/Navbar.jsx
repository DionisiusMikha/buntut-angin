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

  function logoutHandler(){
    sessionStorage.clear()
    window.location.replace("/")
  }
  return(
    <>
      <div className="flex flex-row pt-5 h-36 text-xl navbar w-full">
        <div className="ms-16 w-1/3">
          <img src={logo2} alt="" width="250px"/>
        </div>
        <div className="lg:block hidden w-1/3">
          <div className="flex flex-row items-center align-middle w-full">
            <div className="text-center w-4/12 py-5 hover:underline underline-offset-8 decoration-gray-400 hover:font-semibold"><a href="./">Home</a></div>
            <div className="text-center w-4/12 py-5 hover:underline underline-offset-8 decoration-gray-400 hover:font-semibold"><a href="#">About Us</a></div>
          </div>
        </div>
        <div className="lg:block hidden w-1/3">
          <div className="flex flex-row justify-center me-10 ">
            <div className="text-center py-3 w-3/12 font-semibold">
              <a href="/login" className=" hover:text-blue-500">
                S
                <span className="hover:underline underline-offset-8 hover:decoration-blue-500 ">ign I</span>
                n 
              </a>
            </div>
            <div className="text-center w-3/12 rounded-2xl bg-blue-500 text-white py-3 font-semibold hover:bg-blue-700"><a href="/register">Register</a></div>
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