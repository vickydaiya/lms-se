import React, { useState } from 'react';
import {FaCalendarAlt}from "react-icons/fa";
import {GoDashboard} from "react-icons/go";
import { NavLink } from 'react-router-dom';


export const MainSideBar = ({children}) => {
    const [isOpen,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (isOpen);
    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon: <GoDashboard/>
        },
        {
            path:"/CourseCalendar",
            name:"Calendar",
            icon:<FaCalendarAlt/>
        }
    ]
    return (
        <div className="main_container">
           <div style={{width: isOpen ? "80px" : "80px"}} className="main_sidebar">
               <div className="main_top_section">
                   <div style={{display: isOpen ? "block" : "none"}} className="main_logo"></div>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="main_bars">
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="main_link" activeclassname="main_active">
                           <div className="main_icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="main_link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main className='mainBar_contents'>{children}</main>
        </div>   
    );
};

export default MainSideBar;