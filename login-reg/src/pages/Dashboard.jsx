import React from "react";
import Cards from "../components/cards";
import Courses from "../components/Courses";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainSideBar from "../components/MainSideBar";

export const Dashboard = () =>
{
  const logout = () => {
    localStorage.removeItem('userid')
    window.location.href = '/login'
}
    
    if(localStorage.getItem('userid')){
      return (
        
        <MainSideBar>
          <div id="dashboard_header_container" className="ic-Dashboard-header">
            <h1 className="ic-Dashboard-header__title hidden-phone">
              Dashboard
            </h1>
            <button className="dashboard-button" onClick={() => logout()}>Logout</button>
          </div>
          <Cards/>
          <br/>
          <h1 className="ic-Dashboard-header__title hidden-phone">
              Available Courses
            </h1>
          <Courses/>
        </MainSideBar>
        
      );
    }
    else{
      window.location.href = "/login"
    }
      
}