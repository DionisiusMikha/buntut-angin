import Card from "./Card";
import { useLoaderData } from "react-router-dom"

function ListRecipes (){
    const data = useLoaderData();
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
                </div>
            </div>
        </>
    )
}

export default ListRecipes;