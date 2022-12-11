import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import MainSideBar from "../components/MainSideBar";
import '../App.css'
import { FaEdit } from "react-icons/fa";
import parse from "html-react-parser";

function CourseHome() {
    let params = useParams();

    const [homepage, sethomepage] = useState([]);
    const [isTeacher, setIsTeacher] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        axios.post("http://localhost:4000/gethomepage",{
          user: localStorage.getItem('userid'),
          course: params.course
          }).then(result =>{
              console.log(result.data[0])
              setIsTeacher(result.data[0].role  === 'teacher' ? true : false)
              sethomepage(result.data[0])
          })
      }
      fetchData()
  }, [params.course])
  if(localStorage.getItem('userid')){
    return(
      <MainSideBar>
      <SideBar>
      {isTeacher ? <button className="ancPost" onClick={event => window.location.href = "/"+params.course+'/editcoursehome'}> <FaEdit className="plusIcon"/> Edit </button> : null}
      {homepage.home_title == null ? null : <h1>{homepage.home_title}</h1>}
      {homepage.home_description == null ? null : <div>{parse(homepage.home_description)}</div>}  
      </SideBar>
      </MainSideBar>
      
  );
  }
  else{
    window.location.href = "/login"
  }
    
}
export default CourseHome;