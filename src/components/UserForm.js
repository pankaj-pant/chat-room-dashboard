import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import "date-fns";
import moment from "moment";
import './UserForm.css'

const UserForm = ({ setChatData }) => {
  const [startDate, setStartDate] = useState(localStorage.getItem('startDateInLocalStorage') || "2017-05-01");
  const [endDate, setEndDate] = useState(localStorage.getItem('endDateInLocalStorage') || "2017-06-15");
  const [token, setToken] = useState(localStorage.getItem('tokenInLocalStorage') || "");
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: ""
  });

  const handleStartDateChange = date => {
    setStartDate(moment(date).format("YYYY-MM-DD"));
  };

  const handleEndDateChange = date => {
    setEndDate(moment(date).format("YYYY-MM-DD"));
  };

  const handleTokenChange = event => {
    setToken(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem('startDateInLocalStorage', startDate);
    localStorage.setItem('endDateInLocalStorage', endDate);
    localStorage.setItem('tokenInLocalStorage', token);
  }, [startDate, endDate, token]);


  const url = `https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${startDate}&end_date=${endDate}`;

  const fetchData = async () => {
    try {
      const result = await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setChatData(result.data);
      if (result.data.total_conversation_count === 0){
        setAlert({
          open: true,
          severity: "warning",
          message: "Oops, seems like the chat rooms were empty that day!"
        });
      } else {
        setAlert({
          open: true,
          severity: "success",
          message: "Data fetched successfully!"
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        message: `Oops, seems like the access token is incorrect!`
      });
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (token) {
      fetchData();
    } else {
      alert("Please provide access token!");
    }
  };

  const handleAlertClose = event => {
    setAlert(false);
  };

  return (
    <div className="form">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <>
          <DatePicker
            disableToolbar
            format="yyyy/MM/dd"
            margin="normal"
            id="startDate-picker"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            minDate="2017-05-01"
            maxDate={endDate}
          />{" "}
          <DatePicker
            disableToolbar
            format="yyyy/MM/dd"
            margin="normal"
            id="endDate-picker"
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            minDate={startDate}
            maxDate="2017-06-15"
          />{" "}
        </>
      </MuiPickersUtilsProvider>
      <TextField
        style={{ marginTop: "16px", marginBottom: "8px" }}
        id="input-with-icon-textfield"
        name="token"
        label="Access token"
        value={token}
        onChange={handleTokenChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          )
        }}
      />{" "}
      <Button
        style={{ marginTop: "26px", marginBottom: "8px", marginLeft: "8px" }}
        variant="contained"
        color="primary"
        onClick={handleFormSubmit}
      >
        Fetch data
      </Button>
      <Snackbar open={alert.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserForm;
