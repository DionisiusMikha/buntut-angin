import SideNavbar from "../../Component/SideNavbar";
import menu from "/icon/menu.png";
import DietisianService from "../../Services/Dietisian/dietisian";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import {useNavigate } from "react-router-dom";
import iconUser from "/icon/user.png";

function Homepage () {
  const navigate = useNavigate ();
  const [user, setUser] = useState ({});
  const cariUser = async() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    } else {
      try {
        const res = await DietisianService.getUserLogin(token);
        if (res.status == 200){
          console.log(res.data.data);
          setUser(res.data.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    cariUser();
  }, [])

  return <>
        <div className="w-full h-screen flex flex-row justify-between overflow-y-auto bg-gray-200 ">
            {/* side navbar */}
            <div className="w-1/4">
            <SideNavbar hovered="home"></SideNavbar>
            </div>

            {/* chart */}
            <div className="w-2/4">
                Chart..
            </div>

            {/* profile */}
            <div className="bg-green-200 w-1/4 py-10 px-3">
              <div className="flex flex-row justify-between items-center mx-8">
                <div className="text-3xl font-semibold">PROFILE</div>
                <button className="border border-gray-500 rounded-full p-2" onClick={()=>{
                  navigate("/dietisian/profile");
                }}>
                  <img src={menu} width="30px" alt="" />
                </button>
              </div>
              {/* profile detail */}
              <div className="w-32 flex flex-col justify-center items-center m-auto pt-10">
                {user.profile_picture ? <img src={user.profile_picture} alt="ADA" /> : <img src={iconUser} alt="KOSONG" />}
              </div>
              <div className="text-center text-xl font-semibold py-3 uppercase">{user.display_name}</div>
              <div className="mx-8">
                <hr className="border border-gray-300 w-full my-6"/>
                <div className="flex flex-row justify-center items-center">
                  <div className="w-1/3 flex flex-col justify-center items-center">
                    <span className="uppercase font-semibold text-black text-xl">{user.weight}KG</span>
                    <span className="uppercase font-semibold text-gray-500">weight</span>
                  </div>
                  <div className="w-1/3 flex flex-col justify-center items-center">
                    <span className="uppercase font-semibold text-black text-xl">{user.height}CM</span>
                    <span className="uppercase font-semibold text-gray-500">height</span>
                  </div>
                  <div className="w-1/3 flex flex-col justify-center items-center">
                    <span className="uppercase font-semibold text-black text-xl">{user.age}</span>
                    <span className="uppercase font-semibold text-gray-500">age</span>
                  </div>
                </div>
                <hr className="border border-gray-300 w-full my-6"/>
              </div>
            </div>
        </div>
    </>
}
export default Homepage;