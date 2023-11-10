import SideNavbar from "../../Component/SideNavbar";
import menu from "/icon/menu.png";

function Homepage () {
    return <>
        <div className="w-full h-screen flex flex-row justify-between overflow-y-auto">
            {/* chart */}
            <div>
                Chart..
            </div>

            {/* profile */}
            <div className="bg-green-200 w-1/4 py-10 px-3">
              <div className="flex flex-row justify-between items-center mx-8">
                <div className="text-3xl font-semibold">PROFILE</div>
                <div className="border border-gray-400 rounded-full p-4"><img src={menu} width="30px" alt="" />
                </div>
              </div>
                
            </div>
        </div>
    </>
}
export default Homepage;