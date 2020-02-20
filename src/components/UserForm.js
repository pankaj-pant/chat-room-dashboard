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
import "./UserForm.css";

const UserForm = ({ setChatData }) => {
  /* Setting state with either data in localstorage or hardcoded data */
  const [startDate, setStartDate] = useState(
    localStorage.getItem("startDateInLocalStorage") || "2017-05-01"
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem("endDateInLocalStorage") || "2017-05-15"
  );
  const [token, setToken] = useState(
    localStorage.getItem("tokenInLocalStorage") || ""
  );
  /* Popup state */
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: ""
  });

  /* Every time state changes, it is saved to localstorage as well */
  useEffect(() => {
    localStorage.setItem("startDateInLocalStorage", startDate);
    localStorage.setItem("endDateInLocalStorage", endDate);
    localStorage.setItem("tokenInLocalStorage", token);
  }, [startDate, endDate, token]);

  /* Functions for setting state */
  const handleStartDateChange = date => {
    setStartDate(moment(date).format("YYYY-MM-DD"));
  };

  const handleEndDateChange = date => {
    setEndDate(moment(date).format("YYYY-MM-DD"));
  };

  const handleTokenChange = event => {
    setToken(event.target.value);
  };

  /* API url */
  const url = `https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${startDate}&end_date=${endDate}`;

  /* Function for when 'Fetch Data' button is pressed by user,
     also checks for whether access token was provided.
  */
  const handleFormSubmit = event => {
    event.preventDefault();
    if (token) {
      fetchData();
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Please provide access token!"
      });
    }
  };

  /* Function for fetching data from API; also creates popup notification
     for 3 different cases. 
     1) Data fetched successfully, but chat rooms were empty,
     2) Data fetched successfully, and
     3) Data not fetched due to authentication error.
  */
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
      if (result.data.total_conversation_count === 0) {
        setPopup({
          open: true,
          severity: "warning",
          message: "Oops, data was fetched but it seems like the chat rooms were empty that day!"
        });
      } else {
        setPopup({
          open: true,
          severity: "success",
          message: "Data fetched successfully!"
        });
      }
    } catch (error) {
      setPopup({
        open: true,
        severity: "error",
        message: `Oops, seems like the access token is incorrect!`
      });
    }
  };

  /* Function for closing popup alert */
  const handleAlertClose = event => {
    setPopup(false);
  };

  return (
    <div className="form">
      {/* Date Fields */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <>
          {/* Start Date Field - range is limited between 01.05.2017 - 15.06.2017 for demo purposes*/}
          <DatePicker
            disableToolbar
            format="yyyy/MM/dd"
            margin="normal"
            id="startDate-picker"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            minDate="2017-05-01"
            maxDate="2017-06-15"
          />{" "}
          {/* End Date Field - range is limited between 01.05.2017 - 15.06.2017 for demo purposes */}
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
      {/* Access Token Field */}
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
      {/* Fetch Data button */}
      <Button
        style={{ marginTop: "26px", marginBottom: "8px", marginLeft: "8px", backgroundColor: "#7357FF" }}
        variant="contained"
        color="primary"
        onClick={handleFormSubmit}
      >
        Fetch data
      </Button>
      {/* Popup */}
      <Snackbar
        open={popup.open}
        autoHideDuration={5000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={popup.severity}>
          {popup.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserForm;
