import React,{useEffect, useState} from 'react'
import { Button } from 'react-native'
import './ChatBox.css'

export function ChatBox({socket,username}){
    const [currentMessage,setCurrentMessage] =  useState("");
    const subject = "Cn";
    const joinSubject = () => {
        if(username !== ""){
          socket.emit("join_subject", subject)
        }
      };
    const [messageList,setMessageList] =  useState([])
    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                subject:subject,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message",messageData);
            setMessageList((list) => [...list,messageData]);
        }
    }
    
    
    useEffect(() => {
        socket.on("receive_message",(data) =>{
                setMessageList((list) => [...list,data]);
        })
    },[socket])
    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Chat with your classmates</p>
            </div>
            <div className='chat-body'>
                {messageList.map((messageContent) => {
                    return <div className='message' id = {username === messageContent.author ? "other": "you"}>
                        <div> 
                            <div className='message-content'>
                                <p>{messageContent.message}</p>
                            </div>
                            <div className='message-meta'>
                            <p id = "time">{messageContent.time}</p>
                            <p id = "author">{messageContent.author}</p>
                            </div>
                        </div>
                         </div>
                })}
            </div>
            <div className='chat-footer'> 
            <input type = "text" placeholder='Hi!' onChange = {(event) => {setCurrentMessage(event.target.value);
    }} onKeyPress = {(event) =>{
        event.key === 'Enter' && sendMessage();
    }}/>
            <button onClick = {sendMessage}>&#9658;</button></div> 
            <button onClick={joinSubject}>Chat</button>
        </div>
        
    )
}