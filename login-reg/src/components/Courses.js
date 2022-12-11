import axios from "axios"
import React, { useEffect, useState } from "react";
import Pagination from "./pagination";

const Courses = () =>{

    const [coursesData, setCoursesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const indexOfLastPage = currentPage * postsPerPage;
    const indexOfFirstPage = indexOfLastPage - postsPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        const fetchData = async () => {
            axios.get("http://localhost:4000/courses").then(result =>{
                setCoursesData(result.data)
                // console.log(result.data)
            })
        }
        fetchData()
    }, [])
    
    const sendEnrollmentRequest = (course) => {
      axios.post("http://localhost:4000/enrollcourse",{
        course: course,
        type: "enroll"
        }).then(result =>{
          alert("Enrollment request sent for course ("+course+")!Please wait for approval!")
        })
  }

    return (
    <div>
      <div className="mx-20">
        <div className="my-5">
          <div className="input-group relative flex flex-wrap items-stretch w-full">
            <input type="text" className="relative flex-auto min-w-0 block w-full px-3 py-2 text-base font-normal text-gray-700 bg-gray-50 border border-solid border-gray-300" placeholder="Search Course" onChange = { event => {setSearchTerm( event.target.value)}} aria-label="Search" />
          </div>
        </div>
      </div>
      {/* {coursesData.map((coursesData, k) => (
                    <><div className="w-full border-t border-gray-300"/>
                    <h1 className="px-20 text-3xl py-5 font-bold">
                    {coursesData.coursename} <span className="text-gray-600">| CSCI-B 501</span>
  </h1>
            <div className="mx-20 border">
              <div className="flex p-5 bg-gray-50 justify-between">
                  <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                      <h1 className="text-xl font-medium pl-3">0100-LEC (6442)</h1>
                  </div>
                  <div className="flex gap-24 font-medium text-xl">
                      <p>MoWe</p>
                      <p>11:30</p>
                      <p>12:45</p>
                      <p>3</p>
                      <p>In Person</p>
                  </div>
              </div>
              <div className="w-full border-t border-gray-300" />
        <div className="px-5 py-3 text-lg">
          <p className="font-bold">CLASS NOTES</p>
          <p>B 501 : CSCI-C 241 and C 343 recommended</p>
          <button className="dashboard-button" onClick={() => sendEnrollmentRequest(coursesData.coursename)}>Enroll</button>
        </div> 
          </div></>
                ))} */}
      {coursesData.filter((val) =>{
              if(searchTerm === ""){
                return val
              }else if(val.coursename.toLowerCase().includes(searchTerm.toLowerCase())){
                return val
              }
              return false
            }).slice(indexOfFirstPage,indexOfLastPage).map((coursesData,k) => {
              return  <><div className="w-full border-t border-gray-300"/>
              <h1 className="px-20 text-3xl py-5 font-bold">
              {coursesData.coursename} <span className="text-gray-600">| CSCI-B 501</span>
</h1>
      <div className="mx-20 border">
        <div className="flex p-5 bg-gray-50 justify-between">
            <div className="flex">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg> */}
                <h1 className="text-xl font-medium pl-3">0100-LEC (6442)</h1>
            </div>
            <div className="flex gap-24 font-medium text-xl">
                <p>MoWe</p>
                <p>11:30</p>
                <p>12:45</p>
                <p>3</p>
                <p>In Person</p>
            </div>
        </div>
        <div className="w-full border-t border-gray-300" />
  <div className="px-5 py-3 text-lg">
    <p className="font-bold">CLASS NOTES</p>
    <p>B 501 : CSCI-C 241 and C 343 recommended</p>
    <button className="dashboard-button" onClick={() => sendEnrollmentRequest(coursesData.coursename)}>Enroll</button>
  </div>
    </div></>
            })}
      <Pagination postsPerPage={postsPerPage} totalPosts = {coursesData.length} paginate = {paginate}/>
      </div>
      );
}

export default Courses;
