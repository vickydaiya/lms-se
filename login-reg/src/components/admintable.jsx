import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios"

const AdminTable = () =>{
	
	// const data=[
	// 	{id: '1',type: 'instructor', description: 'instruct course', action:<div><button className="adminApprove">Approve</button ><button className="adminDeny">Deny</button></div>},
    //     {id: '1',type: 'instructor', description: 'instruct course', action:<div><button className="adminApprove">Approve</button ><button className="adminDeny">Deny</button></div>},
    //     {id: '1',type: 'instructor', description: 'instruct course', action:<div><button className="adminApprove">Approve</button ><button className="adminDeny">Deny</button></div>}
	// ]

    // const renderData = (data, index) => {
    //     return(
    //         <tr key={index}>
    //             <td>{data.id}</td>
    //             <td>{data.type}</td>
    //             <td>{data.description}</td>
    //             <td>{data.action}</td>
    //         </tr>
    //         )
    // }

    const [requestsData, setRequestsData] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
        axios.get("http://localhost:4000/adminrequests").then(result =>{
            console.log(result.data)
            setRequestsData(result.data)
        })
    }
    fetchData()
}, [])

	return(
        <ReactBootStrap.Table striped>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>User ID</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {requestsData.map((requestsData, k) => (
                    <tr key={k}>
                    <td>{requestsData.requestid}</td>
                    <td>{requestsData.userid}</td>
                    <td>{requestsData.description}</td>
                    <td><div><button className="adminApprove">Approve</button ><button className="adminDeny">Deny</button></div></td>
                </tr>
                ))}
        </tbody>
      </ReactBootStrap.Table>
	);
    }

export default AdminTable;