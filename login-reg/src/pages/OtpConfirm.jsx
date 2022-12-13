import React, { useState } from "react";
import  '../App.css'
import axios from "axios";
import configdata from "../config.json"

export const OtpConfirm = () => {

    const [otp, setOtp] = useState('');

    const sendotp = (e) => {
        e.preventDefault()
        axios.post(configdata.SERVER_URL+"/confirmotp",{
        OTP: otp
        }).then(result =>{
            if (result.status === 200){
                window.location.href='/passreset'
            }
        })
    }

    return (
        <div className="App">
            <div className="auth-form-container">
                <h4 className="otpConfirm-text">Enter OTP sent to your email:</h4>
                <form className="otp-form" onSubmit={sendotp}>
                    <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="otp" placeholder="OTP" id="otp" name="otp"/>
                    <button className="otpButton" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )
}