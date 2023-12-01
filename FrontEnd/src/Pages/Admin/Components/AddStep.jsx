import { useState } from "react";

function AddStep(props){
    // console.log(props.steps)
    const [text, setText] = (props.steps != "" ? useState(props.steps): useState(""));

    return(
        <div className="container flex flex-row mt-5 justify-between items-center">
            <div className="text-lg pe-3 font-semibold">{props.id + 1}</div>
            <div className="me-5 w-11/12" onBlur={()=>{
                props.saveAll(props.id, text)
            }}>
                <input type="text" className="bg-gray-200 py-2 px-3 rounded-lg text-lg w-full" placeholder="Step" value={text} onChange={(e)=>{
                    setText(e.target.value)
                }}/>
            </div>
            <button className="bg-red-300 py-2 px-4 rounded-lg w-1/12" onClick={()=>{
                console.log(props.id)
                props.deleteHandler(props.id)
            }}>Delete</button>
        </div>
    )
}

export default AddStep;