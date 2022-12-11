import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import MainSideBar from "../components/MainSideBar";
import parse from "html-react-parser";
import * as ReactBootStrap from "react-bootstrap";

export function StudentGrading(){

    let params = useParams();
    var course = params.course;
    const [requestsData, setRequestsData] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            axios.post("http://localhost:4000/studentgrading",{
              coursename: course
            }).then(result =>{
              console.log(result.data)
              setRequestsData(result.data)
            })
        }
        fetchData()
    }, [course])
    return(
        <MainSideBar>
            <SideBar>
            <ReactBootStrap.Table striped>
            <thead>
                <tr>
                    <th>User_id</th>
                    <th>User_name</th>
                    <th>Grades</th>
                </tr>
            </thead>
            <tbody>
            {requestsData.map((requestsData, k) => (
                    <tr key={k}>
                    <td>{requestsData.userid}</td>
                    <td>{requestsData.firstname}</td>
                    <td><input type = "text" onChange = {(e) => setText(e.target.value)} style    = {{width: `${text.length}ch`}}></input></td>
                </tr>
                ))}
            </tbody>
            </ReactBootStrap.Table>
            </SideBar>
        </MainSideBar>
    )
}