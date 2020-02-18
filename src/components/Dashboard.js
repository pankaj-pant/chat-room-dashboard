import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UserForm from "./UserForm";
import DisplayCounters from "./DisplayCounters";
import DashboardTable from "./DashboardTable";

const Dashboard = () => {
  const [chatData, setChatData] = useState({});
  const [error, setError] = useState(false);

  console.log("Inside Dashboard");
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography variant="h6">giosg Dashboard</Typography>
        </Toolbar>
      </AppBar>
      
        {error && <div>Something went wrong...</div>}
        <UserForm setChatData={setChatData} setError={setError} />
        <DisplayCounters chatData={chatData} />
        <DashboardTable chatData={chatData.by_date} />
    
    </div>
  );
};

export default Dashboard;
