import React, { useState } from "react";    
import './Forms.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DateTimePicker from 'react-datetime-picker';
import { TextEditor } from "../components/TextEditor";
import MainSideBar from "../components/MainSideBar";
import SideBar from "../components/SideBar";
import axios from "axios";
import { useParams } from "react-router-dom";

export const AssignmentPost = (props) => {
    const [points, setPoints] = useState('');
    // const [textEntry, setTextEntry] = useState('');
    // const [fileUploads, setFileUploads] = useState('');
    // const [mediaRec, setMediaRec] = useState('');
    const [assignmentName, setAssignmentName] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [availableTillDate, setAvailableTillDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [isFileUpload, setIsFileUpload] = useState(false);
    const [isTextEntry, setIsTextEntry] = useState(false);
    let params = useParams();
    const createAssignment = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:4000/createassignment",{
        assignment_name:assignmentName,
        points:points,
        due_date: dueDate.toLocaleString(),
        release_date: releaseDate.toLocaleString(),
        available_till_date: availableTillDate.toLocaleString(),
        course: params.course,
        description: description,
        isFileUpload: isFileUpload,
        isTextEntry: isTextEntry
        }).then(result =>{
            console.log(result.status)
            if(result.status === 200){
                window.location.href = "/"+params.course+"/courseassignments"
                alert("Assignment created!!")
            }
        })
    }
    const changeState = (e) => {
        setDescription(e);
    }
    
    return (
        <MainSideBar>
            <SideBar>
        <form onSubmit={createAssignment}>
        <div className="assTitle">
            <label>Assignment Name</label>
            <input className="titleInput" value={assignmentName} onChange={(e)=>setAssignmentName(e.target.value)} placeholder="Assignment Name" type="AssName" id="AssName" name="AssName"/>
        </div>
        <TextEditor changeState={changeState}></TextEditor>
        <div className="point">
            <label className="pointLabel">Points</label>
            <input className="pointInput" value={points} onChange={(e)=>setPoints(e.target.value)} type="points" id="points" name="points"/>
        </div>

        <label className="boxLabel1">Submission entry options</label>
            <div className="form_box">
                <label className="checkLabel">Text entry</label>
                <input type="checkbox" className="checkbox" onChange={(e) => setIsTextEntry(e.target.checked)}></input>
                <label className="checkLabel">File uploads</label>
                <input type="checkbox" className="checkbox" onChange={(e) => setIsFileUpload(e.target.checked)}></input>
                <label className="checkLabel">Media recordings</label>
                <input type="checkbox" className="checkbox"></input>
            </div>
        
        <label className="boxLabel2">Submission Attempts</label>
            <div className="form_box">
                Allowed Attempts
                <DropdownButton id="dropdown-basic-button" title="Unlimited" variant="light">
                <Dropdown.Item href="#/action-1">Unlimited</Dropdown.Item>
                <Dropdown.Item href="#/action-2">1</Dropdown.Item>
                <Dropdown.Item href="#/action-3">2</Dropdown.Item>
                <Dropdown.Item href="#/action-4">3</Dropdown.Item>
                </DropdownButton>
            </div>

        <label className="boxLabel3">Assign</label>
            <div className="form_box">
            
            <label className="dateLabel">Due</label>
            <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={(date) => setDueDate(date)}
            secondAriaLabel="Second"
            value={dueDate}
            yearAriaLabel="Year"
          />   
            <label className="dateLabel">Available from</label>
            <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={(date) => setReleaseDate(date)}
            secondAriaLabel="Second"
            value={releaseDate}
            yearAriaLabel="Year"
          />
            <label className="dateLabel">Until</label>
            <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={(date) => setAvailableTillDate(date)}
            secondAriaLabel="Second"
            value={availableTillDate}
            yearAriaLabel="Year"
          />
            </div>
            <hr></hr>
        <button type="submit" className="assPost">Publish</button>
    </form>
    </SideBar>
    </MainSideBar>
    )
}