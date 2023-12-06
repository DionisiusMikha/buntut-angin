import {Outlet} from "react-router-dom";

function Recipes() {
    return (
        <>
           <div className="mx-10 pt-10 pb-6">
                <Outlet></Outlet>
           </div>
        </>
    )
}

export default Recipes;