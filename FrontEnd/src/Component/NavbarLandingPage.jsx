import { useRef, useState } from "react";
import "./navstyle.css";
import logo2  from "/img/Logo-lebar 1.png"
import burger from "/img/burger.png"

function Navbar (){
  const [navClick, setNavClick] = useState(false);

  function navClickHandler(){
    setNavClick(!navClick)
  }


  return(
    <>
      <div className="flex flex-row pt-5 h-36 text-2xl navbar w-full justify-between">
        <div className="ms-16">
          <img src={logo2} alt="" width="250px"/>
        </div>
        <div className="lg:block hidden">
          <div className="flex flex-row items-center align-middle w-full justify-between">
            <div className="text-center py-5 px-10 hover:underline underline-offset-8 decoration-gray-400 hover:font-semibold"><a href="./">Home</a></div>
            <div className="text-center py-5 px-10 hover:underline underline-offset-8 decoration-gray-400 hover:font-semibold"><a href="#aboutus">About Us</a></div>
            <div className="flex flex-row justify-center mx-10 ">
            <a href="/login" className="text-center rounded-2xl bg-gradient-to-r from-green-500 to-lime-200 text-white py-3 px-8 font-bold text-2xl hover:bg-gradient-to-r hover:from-green-600 hover:to-lime-300">
                Log In
            </a>
          </div>
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