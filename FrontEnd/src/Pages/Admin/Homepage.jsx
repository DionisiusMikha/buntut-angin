import SideNavbar from "./Component/SideNavbar";
import { Outlet, useNavigate } from "react-router-dom";

function Homepage () {
  return <>
        <div className="w-full h-screen flex flex-row justify-between overflow-y-auto bg-gray-200 ">
            {/* side navbar */}
            <div className="w-2/12 fixed">
              <SideNavbar hovered="home"></SideNavbar>
            </div>
            <div className="w-2/12"></div>
            <div className="w-10/12">
                <Outlet/>
            </div>
        </div>
    </>
}

export default Homepage;