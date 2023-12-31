import {useState, useEffect} from 'react';
import Card from "./Card";
import { useLoaderData, useNavigate } from "react-router-dom"
import adminService from '../../../Services/Admin/admin';
import { useDispatch, useSelector } from "react-redux"
import { reset } from "../../../Redux/recipesSlice";

function ListRecipes (){
    const dispatch = useDispatch();
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    const getAllRecipes = async () =>{
        const allRecipes = await adminService.getAllRecipes(limit, search);
        setRecipes(allRecipes.data)
    }

    useEffect(()=>{
        getAllRecipes()
    }, [limit, search])
    return(
        <>
            <div className="text-4xl font-semibold mb-6">All Recipes</div>
            <div className="flex flex-row justify-between items-center">
                <div className="rounded-lg py-2 px-4 mb-4 text-xl font-semibold flex items-center justify-center">
                    <span className="me-3">Show</span>
                        <select className="bg-gray-200" onChange={(e)=>{
                            setLimit(e.target.value)
                        }}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="">all</option>
                        </select>
                    <span className="ms-3">Entries</span>
                </div>
                <div className="text-xl font-semibold">
                    <label className="me-3">Search : </label>
                    <input type="text" className="py-2 px-2 rounded" onChange={(e)=>{
                        setSearch(e.target.value)
                    }}/>
                </div>
            </div>
            <div className="bg-white rounded-xl px-10 py-10 min-h-[calc(100vh-13rem)] drop-shadow-lg">
                <div className="grid grid-cols-3 gap-10">
                    {recipes.map((item, index) => {
                        return (
                            <Card key={index} item={item} />
                        )
                    })}
                    <div className="w-full h-[24rem] bg-green-100 py-2 px-10 rounded-lg flex flex-col items-center justify-center text-4xl font-semibold text-gray-600" onClick={()=>{
                        try{
                            navigate(`/admin/recipes/add`);
                            dispatch(reset());
                        } catch(err){
                            console.log(err);
                        }
                    }}>
                        + Add New
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListRecipes;