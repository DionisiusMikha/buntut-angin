import SideNavbar from "../../Component/SideNavbar";
import menu from "/icon/menu.png";
import DietisianService from "../../Services/Dietisian/dietisian";
import { useEffect } from "react";
import { useJwt } from "react-jwt";

function Homepage () {
  const cariUser = async() => {
    const token = localStorage.getItem("token");
    // console.log(token)
    if(!token){
      window.location.href = "/login";
    } else {
      try {
        // console.log("token");
        const res = await DietisianService.getUserById(token);
        // console.log(res);
      } catch (error) {
        // console.log(error);
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
                <div className="border border-gray-400 rounded-full p-4">
                  <img src={menu} width="30px" alt="" />
                </div>
              </div>
                
            </div>
        </div>
    </>
}
export default Homepage;