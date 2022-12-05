import React, { useState } from 'react';
import {FaBars,}from "react-icons/fa";
import { NavLink, useParams } from 'react-router-dom';
import "../SideBar.css"

const SideBar = ({children}) => {
    let params = useParams()
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/"+params.course+"/coursehome",
            name:"Home",
        },
        {
            path:"/"+params.course+"/courseanmt",
            name:"Announcements",
        },
        {
            path:"/"+params.course+"/courseassignments",
            name:"Assignments",
        },
        {
            path:"/"+params.course+"/chat",
            name:"Chat"
        }
    ]
    return (
    <div>
        <div className="course-page-head">
            <div style={{marginLeft: isOpen ? "0px" : "0px" }} className="bars">
                       <FaBars onClick={toggle}/>
            </div>
            <h2 className='course-title'>{params.course}</h2>
        </div>       
        <hr></hr>
        <div className="container">
           <div style={{width: isOpen ? "200px" : "0px"}} className="sidebar">
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>  
    </div>     
    );
};

export default SideBar;