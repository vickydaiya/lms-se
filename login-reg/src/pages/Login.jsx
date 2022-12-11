import React, { useState } from "react";
import '../App.css';
import axios from "axios";
import { useEffect } from "react";
import jwt_decode from 'jwt-decode';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    


    const login = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/login",{
        User_Email:email,
        User_Password:pass
        }).then(result =>{
            console.log(result.data)
            if(result.data === "correct"){
                localStorage.setItem("userid",email)
                window.location.href='/dashboard'
            }
            else if(result.data === "incorrect"){
                alert("incorrect password")
            }
            else{
                alert("user doesn't exist")
            }
        })
    }

    function handleCallbackResponse(response){
        console.log("Enoded JWT ID Token: " + response.credential)
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        if(response.credential){
            localStorage.setItem("userid",userObject.email)
                window.location.href='/dashboard'
        }
        else{
            alert("incorrect google account")
        }
    }

    useEffect(() => {
        /* global google */
        if(google != null)
        {
            google.accounts.id.initialize({
                client_id : "51681250470-0seqgjodve1mcgkpaphtdmf5it588vpq.apps.googleusercontent.com",
                callback: handleCallbackResponse
    
            });
            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {theme : "outline", size: "large"}
            );
        }
        
    },[]);
    // const UnsuccessfulGoogleLogin = (response) =>{
    //     window.location.href='/unsuccesful'
    // }
    return (
        <div className="App">
            <div className="auth-form-container">
                <h2 className="title">Login</h2>
                    <form className="login-form" onSubmit={login}>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"/>            
                        <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
                        <button type="submit" className="bubble-button">Log in</button>
                        <div id = "signInDiv"></div>
                    </form>
                
                <button className="pass-reset" onClick={event =>  window.location.href='/Otp'}> Forgot your password? </button>
                <button className="regHere" onClick={event => window.location.href='/register'}>Don't have an account? Register here.</button> 
            </div>
        </div>
        
    )
}