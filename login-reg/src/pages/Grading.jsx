import React from "react";
import SideBar from "../components/SideBar";
import MainSideBar from "../components/MainSideBar";
import GradingTable from "../components/gradingtable";

export function Grading(){
    if(localStorage.getItem('userid')){
        return(
            <MainSideBar>
                <SideBar>
                <GradingTable/>
                </SideBar>
            </MainSideBar>
        );
    }
}