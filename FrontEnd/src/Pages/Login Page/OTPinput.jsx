import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function OTPInput() {
  const location = useLocation();
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (location.state) {
        const { otp, email } = location.state;
        setEmail(email);
        setOTP(otp);
      }
    };
  
    fetchData();
  }, [location.state]);

  function resendOTP() {
    const newOTP = Math.floor(Math.random() * 9000) + 1000;
    setOTP(newOTP);
    setDisable(true);

    axios
      .post("http://localhost:3000/api/users/send_recovery_email", {
        OTP: newOTP,
        recipient_email: email,
      })
      .then(() => alert("A new OTP has successfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verifyOTP() {
    const enteredOTP = OTPinput.join("");
    if (enteredOTP === otp) {
      alert("OTP is correct");
      window.location.href = "/resetpassword";
    } else {
      alert("OTP is incorrect");
      alert(enteredOTP);
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="w-16 h-16">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-green-600"
                      type="text"
                      id="OTPinput"
                      value={OTPinput[index]}
                      onChange={(e) => {
                        const newOTPinput = [...OTPinput];
                        newOTPinput[index] = e.target.value;
                        setOTPinput(newOTPinput);
                        e.target.value = e.target.value.slice(-1);
                      }}
                    />
                  </div>
                ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <a
                      onClick={() => verifyOTP()}
                      className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-green-600 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </a>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{" "}
                    <a
                      className="flex flex-row items-center"
                      style={{
                        color: disable ? "gray" : "green",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={() => resendOTP()}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
