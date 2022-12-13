import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import MainSideBar from "../components/MainSideBar";
import parse from "html-react-parser";
import { TextEditor } from "../components/TextEditor";
import { FileUpload } from "../components/FileUpload";
import configdata from "../config.json"

export function AssignmentPage() {
    let params = useParams();
    var assingment_id = params.assignmentid
    const [assingmentinfo, setassignmentinfo] = useState("");
    const [isTextEntry, setIsTextEntry] = useState(false);
    const [isFileUpload, setIsFileUpload] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
          axios.post(configdata.SERVER_URL+"/getassignmentinfo",{
            id: assingment_id
          }).then(result =>{
            console.log(result.data[0])
            setIsTextEntry(result.data[0].isTextEntry  === 0 ? false : true)
            setIsFileUpload(result.data[0].isFileUpload  === 0 ? false : true)
            setassignmentinfo(result.data[0].description)
          })
      }
      fetchData()
  }, [assingment_id])
  console.log(isFileUpload)
  if(localStorage.getItem('userid')){
    return(
      <div className="body">
      <MainSideBar>
      <SideBar>
      <div>{parse(assingmentinfo)}</div>
      {isTextEntry ? <TextEditor></TextEditor> : null}
      {isFileUpload ? <FileUpload></FileUpload> : null}
      </SideBar>
      </MainSideBar>
      </div>
      
  );
  }
  else{
    window.location.href = "/login"
  }
    
}