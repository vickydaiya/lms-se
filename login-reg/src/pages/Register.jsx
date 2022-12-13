import React, { useState } from "react";    
import axios from "axios";
import configdata from "../config.json"

export const Register = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passC, setPassC] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const register = (e) => {
        window.location.href='/login'
        e.preventDefault()
        axios.post(configdata.SERVER_URL+"/register",{
        User_Email:email,
        User_FirstName:firstName,
        User_LastName:lastName,
        User_Password:pass
        }).then(result =>{
            console.log(result)
        })
    }

    return (
        <div className="App">
            <div className="auth-form-container">
                <h2 className="title">Register</h2>
                    <form className="register-form" onSubmit={register}>
                        <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="firstName" placeholder="First Name" id="firstName" name="firstName"/>
                        <input value={lastName} onChange={(e)=>setLastName(e.target.value)} type="lastName" placeholder="Last Name" id="lastName" name="lastName"/>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"/>            
                        <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
                        <input value={passC} onChange={(e)=>setPassC(e.target.value)} type="password" placeholder="Confirm password" id="cpassword" name="cpassword"/>
                        <button type="submit" className="bubble-button">Register</button>
                    </form>
                <button className="logHere" onClick={event => window.location.href='/login'}>Already have an account? Login here.</button>
            </div>
        </div>
    )
}