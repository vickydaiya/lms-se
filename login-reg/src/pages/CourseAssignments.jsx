import React from "react";
import { CurrAss } from "../components/CurrAss";
import { DueAss } from "../components/DueAss";
import { FaPlus } from "react-icons/fa"
import SideBar from "../components/SideBar";
import MainSideBar from "../components/MainSideBar";
import "../App.css"
import { useParams } from "react-router-dom";

function CourseAssignments() {
    let params = useParams();

    if(localStorage.getItem('userid')){
        return(
          <MainSideBar>
            <SideBar>
                <button className="ancPost" onClick={event => window.location.href = "/"+params.course+'/AssignmentPost'}> <FaPlus className="plusIcon"/> Assignment </button>
                <h2 className="assTitle">Upcoming Assignments:</h2>
                <CurrAss/>
                <h2 className="assTitle">Past Due Assignments:</h2>
                <DueAss/>
            </SideBar>
          </MainSideBar>
        );
      }
      else{
        window.location.href = "/login"
      }
}
export default CourseAssignments;