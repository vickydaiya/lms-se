import React, { useState } from "react";  
import SideBar from "../components/SideBar";
import MainSideBar from "../components/MainSideBar";
import { TextEditor } from "../components/TextEditor";
import './Forms.css';
import axios from "axios";
import { useParams } from "react-router-dom";


export const AnnouncementPost = (props) => {
  const [topicTitle, setTopicTitle] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const changeState = (e) => {
    setAnnouncement(e);
    }
    let params = useParams();
    const postAnnouncement = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:4000/postannouncement",{
        title:topicTitle,
        description:announcement,
        postdate:new Date().toLocaleString(),
        course:params.course
        }).then(result =>{
            console.log(result.status)
            if(result.status === 200){
                window.location.href = "/"+params.course+"/courseanmt"
                alert("Announcement Posted!!")
            }
        })
    }

    return(

      <MainSideBar>
        <SideBar>
        <form onSubmit={postAnnouncement}>
        <div className="ancTitle">
        <label>Topic Title</label>
        <input className="titleInput" value={topicTitle} onChange={(e)=>setTopicTitle(e.target.value)} placeholder="Topic Title" type="topicTitle" id="topicTitle" name="topicTitle"/>
        </div>
        <TextEditor changeState={changeState} />
        <div className="atchBox">
        <label>Attachment</label>
        <input className="atch" type="file" id="myfile" name="myfile"></input>
        </div>
        <hr></hr>
        <div>
        <button className="assCancelBtn">Cancel</button>
        <button type="submit" className="assPostBtn">Save</button>
        </div>
        </form>
        </SideBar>
      </MainSideBar>
        
    );
}