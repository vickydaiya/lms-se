import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import {FaRocket}from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const CurrAss = () =>{

    var params = useParams()
    const [assignmentData, setAssignmentData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            axios.post("http://localhost:4000/currassignments",{
                course: params.course
            }).then(result =>{
                console.log(result.data)
                setAssignmentData(result.data)
            })
        }
        fetchData()
    }, [])

    const convertdatetime = (sqldatetime) => {
        var month_mapper = {"1":"Jan","2":"Feb","3":"Mar","4":"Apr","5":"May","6":"Jun","7":"Jul","8":"Aug","9":"Sep","10":"Oct","11":"Nov","12":"Dec"}
        var date = sqldatetime.split("T")[0].split("-")
        var day = date[2]
        var month = month_mapper[date[1]]
        var time = sqldatetime.split("T")[1].split(":")
        var hour = time[0]
        var minute = time[1]
        if (parseInt(hour) < 12){
            return month + " " + day + " at " + hour + ":" + minute + "AM"
        }
        else if(parseInt(hour) > 12){
            return month + " " + day + " at " + (parseInt(hour) - 12) + ":" + minute + "PM"
        }
        else{
            return month + " " + day + " at " + hour + ":" + minute + "PM"
        }
        
    }

	return(
        <ReactBootStrap.Table striped>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
            {assignmentData.map((assignmentData, k) => (<tr>
                <td>{<div><FaRocket/><button className="assButton" onClick={event => window.location.href = "/"+params.course+"/"+assignmentData.id}>{assignmentData.assignment_title}</button><div className="assDue">
                    Available until {convertdatetime(assignmentData.availabletilldate)}  |  Due {convertdatetime(assignmentData.duedate)}  |  -/{assignmentData.maxpoints} pts</div></div>}</td>
            </tr>))}
        </tbody>
      </ReactBootStrap.Table>
	);
    }