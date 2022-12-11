import React from "react";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import CourseHome from "./pages/CourseHome";
import CourseAnmt from "./pages/CourseAnmt";
import CourseAssignments from "./pages/CourseAssignments";
import { Otp } from "./pages/Otp";
import { OtpConfirm } from "./pages/OtpConfirm";
import { PassReset } from "./pages/PassReset";
import { Dashboard } from "./pages/Dashboard";
import {Chat} from "./pages/Chat";
import { AdminDashboard } from "./pages/admindashboard";
import {CourseCalendar} from "./pages/CourseCalendar";
import {AssignmentPost} from "./pages/AssignmentPost";
import {AssignmentPage} from "./pages/AssignmentPage";
import { EditCourseHome } from "./pages/EditCourseHome";
import { Route, Routes} from "react-router-dom";
import io from 'socket.io-client';
import { AnnouncementPost } from "./pages/AnnouncementPost";
import {Grading} from "./pages/Grading";
import {StudentGrading} from "./pages/StudentGrading";
const socket = io.connect("http://localhost:3001");

function App() {  
    return (
      <Routes>
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Otp" element= { <Otp/> } />
        <Route path="/Otpconfirm" element = { <OtpConfirm/> } />
        <Route path="/Passreset" element = { <PassReset/> } />
        <Route path="/Dashboard" element={ <Dashboard/> } />
        <Route path="/:course/coursehome" element = { <CourseHome/> } />
        <Route path="/:course/courseanmt" element = { <CourseAnmt/> } />
        <Route path="/:course/courseassignments" element = { <CourseAssignments/> } />
        <Route path="/admindashboard" element = { <AdminDashboard/> } />
        <Route path="/:course/chat" element = { <Chat socket={socket}/> } />
        <Route path="/CourseCalendar" element = { <CourseCalendar/> } />
        <Route path="/:course/AssignmentPost" element = { <AssignmentPost/> } />
        <Route path="/:course/:assignmentid/grading" element = { <StudentGrading/> } />
        <Route path="/:course/grading" element = { <Grading/> } />
        <Route path="/:course/:assignmentid" element = { <AssignmentPage/> } />
        <Route path="/:course/EditCourseHome" element = { <EditCourseHome/> } />
        <Route path="/:course/AnnouncementPost" element = { <AnnouncementPost/> } />
        <Route path="*" element={<Login/>} />
      </Routes>
  );
  }


export default App;
