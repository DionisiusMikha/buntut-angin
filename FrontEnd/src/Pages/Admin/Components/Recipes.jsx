import {Outlet} from "react-router-dom";

function Recipes() {
    return (
        <>
           <div className="mx-10 my-10">
                <Outlet></Outlet>
           </div>
        </>
    )
}

export default Recipes;