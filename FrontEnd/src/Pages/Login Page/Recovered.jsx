import React from 'react';
import { useEffect, useState } from 'react';

const countDown = () => {
    let timeleft = 5;
    let downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        window.location.href = "/login";
    }
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    timeleft -= 1;
    }
    , 1000);
}

function Recovered() {
    countDown();
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 text-center">
                    <h1>Password Recovered</h1>
                    <i>
                    <p>You will be redirected to login page in <span id="countdown">5 seconds remaining</span></p>
                    </i>
                </div>
            </div>
        </div>
    );
}

export default Recovered;