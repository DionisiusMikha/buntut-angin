import { useEffect, useState } from "react";
import client from "../../../Services/Dietisian/client";
import DietisianService from "../../../Services/Dietisian/dietisian";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faFileInvoice, faUsers } from "@fortawesome/free-solid-svg-icons";
import gbrDokter from "/img/gbr-landingPage.png"

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
    }

    const beliSubs = async () => {
        client.post(`/subscription/${user.username}`, {}, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((res)=>{
            console.log(res.data.data)
            window.snap.pay(res.data.midtrans.token, {
                onSuccess: function (result) {
                    alert("Payment success!");
                    console.log(result);
                    let status = "Success";
                    gantiStatus(res.data.data.id, status);
                },
                onPending: function (result) {
                    alert("Waiting for your payment!");
                    console.log(result);
                    let status = "Pending";
                    gantiStatus(res.data.data.id, status);
                },
                onError: function (result) {
                    alert("Payment failed!");
                    console.log(result);
                    let status = "Canceled";
                    gantiStatus(res.data.data.id, status);
                },
                onClose: function () {
                    alert('You closed the popup without finishing the payment');let status = "Canceled";
                    gantiStatus(res.data.data.id, status);
                }
            });
        }).catch(err=>console.log(err))
    }

    return(
        <div className="mx-10 my-10 bg-white rounded-3xl drop-shadow-xl min-h-[calc(100vh-5rem)] w-3/3 p-5">
            <div className="w-4/5 m-auto">
                <div className="flex flex-col justify-center items-center py-10">
                    <div className="text-4xl font-semibold py-6">Why Must Premium?</div>
                    <div className="grid gap-8 grid-cols-4">
                        <div className="flex flex-col items-center justify-center mx-5">
                            <FontAwesomeIcon icon={faThumbsUp} className="bg-gray-200 p-7 my-5" style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                            }}/>
                            <div className="text-center text-xl font-semibold">Diet recommendation access</div>
                        </div>
                        <div className="flex flex-col items-center justify-center mx-5">
                            <FontAwesomeIcon icon={faCommentDots} className="bg-gray-200 p-7 my-5" style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                            }}/>
                            <div className="text-center text-xl font-semibold">Online consultation appointment agreement</div>
                        </div>
                        <div className="flex flex-col items-center justify-center mx-5">
                            <FontAwesomeIcon icon={faUsers} className="bg-gray-200 p-7 my-5" style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                            }}/>
                            <div className="text-center text-xl font-semibold">Unlimited community access</div>
                        </div>
                        <div className="flex flex-col items-center justify-center mx-5">
                            <FontAwesomeIcon icon={faFileInvoice} className="bg-gray-200 p-7 my-5" style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                            }}/>
                            <div className="text-center text-xl font-semibold">Unlimited daily calories report</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-4/5 m-auto">
                <div className="flex flex-row">
                    <div className="w-2/3 flex flex-col justify-center mx-10">
                        <div className="text-3xl font-bold my-5">Rp 85,000 for 1 months of Premium</div>
                        <div className="text-xl font-semibold">Enjoy your healtier life and unlock your true self with Lifelose Premium!</div>
                        <button className="bg-green-200 hover:bg-green-400 w-fit py-2 px-6 rounded-full my-4 text-xl font-semibold" onClick={()=>{
                            beliSubs();
                        }}>Join Now!</button>
                    </div>
                    <div className="w-1/3">
                        <img src={gbrDokter} alt="" />
                    </div>
                </div>
            </div>           
        </div>
    )
}

export default Subscriptions;