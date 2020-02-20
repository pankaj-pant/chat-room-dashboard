import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import UserForm from "./UserForm";
import DisplayCounters from "./DisplayCounters";
import DashboardTable from "./DashboardTable";
import logo from '../assets/frame_basic.png'
import './Logo.css'

const Dashboard = () => {
  const [chatData, setChatData] = useState({});
  return (
    <div>
      <AppBar position="sticky" style={{ backgroundColor: "#7357FF" }}>
        <Toolbar variant="dense">
          <img src={logo} className="logo" alt="giosg logo" />
        </Toolbar>
      </AppBar>
      <UserForm setChatData={setChatData} />
      <DisplayCounters chatData={chatData} />
      <DashboardTable chatData={chatData.by_date} />
    </div>
  );
};

export default Dashboard;
