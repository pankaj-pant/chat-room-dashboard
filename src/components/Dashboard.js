import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UserForm from "./UserForm";
import DisplayCounters from "./DisplayCounters";
import DashboardTable from "./DashboardTable";
import logo from '../assets/frame_basic.png'
import './Logo.css'

const Dashboard = () => {
  const [chatData, setChatData] = useState({});
  return (
    <div style={{flexGrow: 1}}>
      <AppBar position="sticky" style={{ backgroundColor: "#7357FF" }}>
        <Toolbar variant="dense">
          <Grid
            justify="space-between"
            container 
            spacing={24}
          >
            <Grid item>
            <img src={logo} className="logo" alt="giosg logo" />
            </Grid>
            <Grid item>
              <Button color="inherit" href="https://github.com/pankaj-pant/chat-room-dashboard#dashboard-application" target="_blank">Help?</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <UserForm setChatData={setChatData} />
      <DisplayCounters chatData={chatData} />
      <DashboardTable chatData={chatData.by_date} />
    </div>
  );
};

export default Dashboard;
