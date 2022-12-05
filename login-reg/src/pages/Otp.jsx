import React, { useState } from "react";
import  '../App.css'
import axios from "axios";

export const Otp = () => {

    const [email, setEmail] = useState('');

    const sendmail = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/sendotp",{
        Email:email
        }).then(result =>{
            window.location.href='/otpconfirm'
        })
    }

    return (
        <div className="App">
            <div className="auth-form-container">
            <h2 className="otpTitle">Password reset</h2>
                <form className="otp-form" onSubmit={sendmail}>
                    <text className="otpText">Please enter your email:</text>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"/>
                    <button className="otpButton" type="submit">Confirm</button>
                </form>
        </div>
    </div>
    )   
}
