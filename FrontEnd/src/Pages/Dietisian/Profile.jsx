import SideNavbar from "../../Component/SideNavbar";

function Profile(){
    return(
        <div className="w-full h-screen flex flex-row justify-between overflow-y-auto bg-gray-200 ">
            <div className="w-1/4">
            <SideNavbar hovered="home"></SideNavbar>
            </div>
        </div>
    )
}

export default Profile;