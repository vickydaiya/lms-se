import React, { useState } from "react";
import  '../App.css'
import axios from "axios"
import configdata from "../config.json"

export const PassReset = () => {

    const [pass, setPass] = useState('');
    const [passC, setPassC] = useState('');

    const resetpassword = (e) => {
        e.preventDefault()
        if(pass === passC){
            axios.post(configdata.SERVER_URL+"/resetpassword",{
            newpassword: pass
            }).then(result =>{
                window.location.href='/login'
            })
        }
        
    }

    return (
        <div className="App">
            <div className="auth-form-container">
                <h4>Enter new password:</h4>
                <form className="otp-form" onSubmit={resetpassword}>
                    <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="New Password" id="password" name="password"/>
                    <input value={passC} onChange={(e)=>setPassC(e.target.value)} type="password" placeholder="Confirm New password" id="cpassword" name="cpassword"/>
                    <button className="otpButton" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )
}