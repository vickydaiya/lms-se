import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MainSideBar from "../components/MainSideBar";
import axios from "axios";
import { useEffect, useState } from "react";
import configdata from "../config.json"


export const CourseCalendar = () =>{

    const [calendarData, setCalendarData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            axios.get(configdata.SERVER_URL+"/calendardata").then(result =>{
                console.log(result.data)
                setCalendarData(result.data)
            })
        }
        fetchData()
    }, []);

    const locales = {
        "en-US": require("date-fns/locale/en-US"),
    }
    
    
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })


    // const events = [
    //     {
    //         title: "Assignment 1",
    //         allDay: true,
    //         start: new Date(2022, 10, 26),
    //         end: new Date(2022, 10, 26),
    //         coursename: "A"
    //     },
    //     {
    //         title: "Assignment 2",
    //         start: new Date(2022, 10, 26),
    //         end: new Date(2022, 10, 26),
    //         coursename: "A"
    //     },
    //     {
    //         title: "Assignment 3",
    //         start: new Date(2022, 10, 28),
    //         end: new Date(2022, 10, 28),
    //         coursename: "B"
    //     },
    // ]

    const event_maker = (jsondata) => {
        var events = []
        var color_mapper = {}
        for(var key in jsondata){
            if (!(jsondata[key].coursename in color_mapper)){
                color_mapper[jsondata[key].coursename] = Math.floor(Math.random()*16777215).toString(16);
            }
            var duedate = jsondata[key].duedate.split("T")[0].split("-")
            var duetime = jsondata[key].duedate.split("T")[1].split(":")
            console.log(duetime)
            events.push({
                title: jsondata[key].assignment_title + " - " + jsondata[key].coursename,
                allDay: true,
                start: new Date(duedate[0], parseInt(duedate[1]) - 1, duedate[2], duetime[0], duetime[1]),
                end: new Date(duedate[0], parseInt(duedate[1]) - 1, duedate[2], duetime[0], duetime[1]),
                color: "#"+color_mapper[jsondata[key].coursename]
            })   
        }
        return events
    }

    const eventPropGetter = (event) => {
    // console.log(event);
    var style = {
        backgroundColor: event.color
    };
    return {
        style: style
    };

    }

    return(
        <div>
        <MainSideBar>
            <Calendar localizer={localizer}
            events={event_maker(calendarData)}
            startAccessor="start"
            endAccessor="end" 
            style={{height: 500, margin: "50px"}}
            eventPropGetter={eventPropGetter}
            />
         </MainSideBar>
         </div>
    );

}