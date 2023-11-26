import Card from "./Card";
import { useLoaderData, useNavigate } from "react-router-dom"

function ListRecipes (){
    const data = useLoaderData();
    const navigate = useNavigate();
    return(
        <>
            <div className="text-4xl font-semibold mb-6">All Recipes</div>
            <div className="bg-white rounded-xl px-10 py-10 min-h-[calc(100vh-9rem)] drop-shadow-lg">
                <div className="grid grid-cols-3 gap-10">
                    {data.map((item, index) => {
                        return (
                            <Card key={index} item={item} />
                        )
                    })}
                    <div className="w-full h-[24rem] bg-green-100 py-2 px-10 rounded-lg flex flex-col items-center justify-center text-4xl font-semibold text-gray-600" onClick={()=>{
                        navigate(`/admin/recipes/add`);
                    }}>
                        + Add New
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListRecipes;