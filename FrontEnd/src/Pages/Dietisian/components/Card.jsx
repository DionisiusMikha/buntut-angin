import {useNavigate} from "react-router-dom";

function Card({item, index}) {
    const navigate = useNavigate();
    const url = "http://localhost:3000" + item.image
    return (
        <>
            {index == 0 && <div>
                nomor 1
            </div>}
        </>
    )
}

export default Card;