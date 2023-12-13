import {useState, useEffect} from 'react';
import Card from "./Card";
import { useLoaderData, useNavigate } from "react-router-dom"
import adminService from '../../../Services/Admin/admin';
import kuro from '/img/kuro.png';

function ListRecipes (){
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
           <div className='px-10 py-10 w-full'>
            <div className="w-full h-full bg-green-200 rounded-3xl flex px-16 py-10">
                <div className="w-3/4 flex flex-col items-start justify-center px-8 gap-y-8">
                    <h1 className="text-7xl font-semibold">Cook New Dishes</h1>
                    <h1 className="text-5xl">Like Never Before</h1>
                </div>
                <div className="w-1/2  h-full flex justify-center items-center">
                    <img src={kuro} width={"65%"}/>
                </div>
            </div>
            <div className='flex'>

            </div>
           </div>
        </>
    )
}

export default ListRecipes;