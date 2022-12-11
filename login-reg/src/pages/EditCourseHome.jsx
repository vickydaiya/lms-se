import React, { useState } from "react";    
import './Forms.css'
import MainSideBar from "../components/MainSideBar";
import SideBar from "../components/SideBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TextEditor } from "../components/TextEditor";
import './Forms.css'

export const EditCourseHome = (props) => {
    const [pageTitle, setPageTitle] = useState('');
    const [description, setDescription] = useState('');
    let params = useParams();
    
    const changeState = (e) => {
        setDescription(e);
    }

    const editcoursehome = (e) => {
        console.log("CHALO")
        axios.post("http://localhost:4000/editcoursehome",{
        title:pageTitle,
        description:description,
        course: params.course,
        }).then(result =>{
            console.log(result.status)
            if(result.status === 200){
                window.location.href = "/"+params.course+"/coursehome"
                alert("Homepage edited!!")
            }
        })
    }
    
    return (
        <MainSideBar>
            <SideBar>
            <form onSubmit={editcoursehome}>
        <div className="assTitle">
        <label>Page Title</label>
        <input className="titleInput" value={pageTitle} onChange={(e)=>setPageTitle(e.target.value)} placeholder="Page Title" type="pageTitle" id="pageTitle" name="pageTitle"/>
        <TextEditor changeState={changeState}/>
        </div>
        <hr></hr>
        <div>
        {/* <button className="assCancelBtn">Cancel</button> */}
        <button type="submit" className="assPostBtn">Save</button>
        </div>
        </form>
            </SideBar>
        </MainSideBar>
    )
}