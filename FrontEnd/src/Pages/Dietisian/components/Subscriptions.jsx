import { useEffect, useState } from "react";
import client from "../../../Services/Dietisian/client";
import DietisianService from "../../../Services/Dietisian/dietisian";

function Subscriptions(){
    const [user, setUser] = useState({});
    const [dob, setdob] = useState("");
    const cariUser = async () => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        } else {
            try {
              const res = await DietisianService.getUserLogin(token);
              if (res.status == 200){
                  console.log(res.data.data)
                  setUser(res.data.data);
                  let tgl = new Date(res.data.data.birthdate)
                  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                  let hasil = `${tgl.getDate()} ${months[tgl.getMonth()]} ${tgl.getFullYear()}`;
                  setdob(hasil)
              } else {
                  navigate("/login");
              }
            } catch (error) {
              console.log(error);
            }
        }
      }
    
    useEffect(() => {
        cariUser();
    }, [])

    const gantiStatus = async (id, status) =>{
        
        const res2 = await DietisianService.changeStatusSubscription(id, status);
        console.log(res2);
    }

    const beliSubs = async () => {
        client.post(`/subscription/${user.username}`, {}, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((res)=>{
            // Midtrans
            console.log(res.data.data)
            window.snap.pay(res.data.midtrans.token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    alert("Payment success!");
                    console.log(result);
                    let status = "Success";
                    gantiStatus(res.data.data.id, status);
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    alert("Waiting for your payment!");
                    console.log(result);
                    let status = "Pending";
                    gantiStatus(res.data.data.id, status);
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    alert("Payment failed!");
                    console.log(result);
                    let status = "Canceled";
                    gantiStatus(res.data.data.id, status);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert('You closed the popup without finishing the payment');let status = "Canceled";
                    gantiStatus(res.data.data.id, status);
                }
            });
        }).catch(err=>console.log(err))
    }

    return(
        <div>
            <h1>Subscriptions</h1>
            {/* <h1>{user.username}</h1> */}
            <button onClick={()=>{
                beliSubs();
            }}>Beli</button>
        </div>
    )
}

export default Subscriptions;