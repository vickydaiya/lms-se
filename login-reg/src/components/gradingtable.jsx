import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";


const GradingTable = () => {
    var params = useParams();
    const [requestsData, setRequestsData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            axios.post("http://localhost:4000/gradingtable",{
                coursename: params.course
            }).then(result =>{
                console.log(result.data)
                setRequestsData(result.data)
            })
        }
        fetchData()
    }, [])

    return (
        <ReactBootStrap.Table striped>

            <thead>
                <tr>
                    <th>Assignment Name</th>
                </tr>
            </thead>
            <tbody>
            
            {requestsData.map((requestsData, k) => (
                    <tr key={k}>
                    <td><button className="assButton" onClick={event => window.location.href = "/"+params.course+"/"+ requestsData.id + "/" + "grading"}>{requestsData.assignment_title}</button></td>
                </tr>
                ))}
            </tbody>
        </ReactBootStrap.Table>
    )
}

export default GradingTable;