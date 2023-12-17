import { useEffect, useState } from "react";
import dietisianService from "../../../Services/Dietisian/dietisian";
import iconUser from "/icon/user.png";

export default function Comments({comment}) {
    const [user, setUser] = useState({});
    const cariUser = async() =>{
        const res = await dietisianService.getUserByID(comment.user_id);
        setUser(res.data);
    }

    useEffect(() =>{
        cariUser();
    }, [])

    return (
        <>
            <div className="py-3 flex flex-row items-center">
                <div className=" me-5">
                    {user.profile_picture == null ? 
                    <img src={iconUser} alt="profile" style={{
                        borderRadius: "50%",
                        height: "70px",
                        width: "70px",
                    }}/>
                    : 
                    <img src={`http://localhost:3000${user.profile_picture}`} alt="profile" style={{
                        borderRadius: "50%",
                        height: "70px",
                        width: "70px",
                    }}/>
                    }
                </div>
                <div className="text-black">
                    <div className="font-semibold text-xl">@{user.username}</div>
                    <div className="text-lg">
                        {comment.comment == "" ? <p className="text-gray-500 text-md">no comment</p> : comment.comment}
                    </div>
                </div>
            </div>
        </>
    )
}