// import React, { useEffect, useState } from "react";
import React from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import MainSideBar from "../components/MainSideBar";

function CourseHome() {
    let params = useParams();

  //   const [homepage, sethomepage] = useState([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //         axios.get("http://localhost:4000/gethomepage").then(result =>{
  //             console.log(result.data)
  //             sethomepage(result.data)
  //         })
  //     }
  //     fetchData()
  // }, [])
  if(localStorage.getItem('userid')){
    return(
      <div className="body">
      <MainSideBar>
      <SideBar/>
      </MainSideBar>
      </div>
      
  );
  }
  else{
    window.location.href = "/login"
  }
    
}
export default CourseHome;