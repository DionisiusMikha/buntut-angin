import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SendEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function navigateToOtp(e) {
    e.preventDefault();

    if (email) {
      const OTP = Math.floor(Math.random() * 9000) + 1000;
      console.log(OTP);
      axios
        .post("http://localhost:3000/api/users/send_recovery_email", {
          OTP: OTP,
          recipient_email: email,
        })
        .then(() => {
          alert("OTP");
          navigate("/OTPinput", { state: { otp: OTP, email: email } });
        })
        .catch(console.log);
    } else {
      alert("Please enter your email");
    }
  }

  return (
    <div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="text-center lg:text-left">
                    <button
                      type="button"
                      className="inline-block px-7 py-3 bg-green-500 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                    <a
                      onClick={navigateToOtp}
                      className="text-white"
                    >
                      send mail
                    </a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}