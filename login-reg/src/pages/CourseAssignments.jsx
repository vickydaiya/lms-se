import React, {useState, useEffect} from "react";
import { CurrAss } from "../components/CurrAss";
import { DueAss } from "../components/DueAss";
import { FaPlus } from "react-icons/fa"
import SideBar from "../components/SideBar";
import MainSideBar from "../components/MainSideBar";
import "../App.css"
import { useParams } from "react-router-dom";
import axios from "axios"

function CourseAssignments() {
    let params = useParams();
    const [isTeacher, setIsTeacher] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        axios.post("http://localhost:4000/isteacher",{
          user: localStorage.getItem('userid'),
          course: params.course
          }).then(result =>{
              console.log(result.data[0])
              setIsTeacher(result.data[0].role  === 'teacher' ? true : false)
          })
      }
      fetchData()
  }, [params.course])

    if(localStorage.getItem('userid')){
        return(
          <MainSideBar>
            <SideBar>
                {isTeacher ? <button className="ancPost" onClick={event => window.location.href = "/"+params.course+'/AssignmentPost'}> <FaPlus className="plusIcon"/> Assignment </button> : null}
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