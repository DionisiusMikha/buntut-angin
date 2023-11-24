import SideNavbar from './components/SideNavbar';
import { Outlet } from 'react-router-dom';

function Homepage () {
    return (
        <div className="w-full h-screen flex flex-row justify-between overflow-y-auto bg-gray-200 ">
            {/* side navbar */}
            <div className="w-2/12 fixed">
              <SideNavbar hovered="home"></SideNavbar>
            </div>
            <div className="w-2/12"></div>
            {/* chart */}
            <div className="w-10/12">
                <Outlet/>
            </div>
        </div>
    );
}

export default Homepage;