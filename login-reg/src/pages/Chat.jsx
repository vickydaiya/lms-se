import React from "react";
import SideBar from "../components/SideBar";
import MainSideBar from "../components/MainSideBar";
import { ChatBox } from "../components/ChatBox";



export function Chat({socket}){           
    
    const username =  localStorage.getItem('userid')
    if(localStorage.getItem('userid')){
        return (
            <MainSideBar>
                <SideBar>
                <ChatBox socket = {socket} username = {username}/>
                </SideBar>
            </MainSideBar>
            
        );
    }
        
}

