function AddIngredients(){
    return(
        <div className="container flex flex-row mt-5">
            <input type="text" className="bg-gray-200 py-2 px-3 rounded-lg text-lg me-5 w-3/5" />
            <input type="number" className="bg-gray-200 py-2 px-3 rounded-lg text-lg me-5" />
            <input type="text" className="bg-gray-200 py-2 px-3 rounded-lg text-lg me-5" />
            <button className="bg-red-300 py-2 px-4 rounded-lg">Delete</button>
        </div>
    )
}

export default AddIngredients;