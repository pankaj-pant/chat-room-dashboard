import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const UserForm = ({ setChatData, setError }) => {
  const [userData, setUserData] = useState({
    startDate: "2017-05-01",
    endDate: "2017-06-15",
    token: ""
  });

  const [open, setOpen] = useState(false);
  console.log("Inside UserForm");

  const url = `https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${userData.startDate}&end_date=${userData.endDate}`;

  const fetchData = async () => {
    setError(false);
    try {
      const result = await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: `Token ${userData.token}`
        }
      });
      setChatData(result.data);
    } catch (error) {
      setError(true);
    }
  };

  const handleChange = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetchData();
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  return (
    <div
      style={{
        margin: "8px auto",
        width: "95%",
        lineHeight: "1%"
       /*  border: "1px solid red" */
      }}
    >
      <form noValidate>
        <TextField
          id="startDate"
          name="startDate"
          label="Start date"
          type="date"
          onChange={handleChange}
          defaultValue="2017-05-01"
          InputLabelProps={{
            shrink: true
          }}
        />{" "}
        <TextField
          id="endDate"
          name="endDate"
          label="End date"
          type="date"
          onChange={handleChange}
          defaultValue="2017-06-15"
          InputLabelProps={{
            shrink: true
          }}
        />{" "}
        <TextField
          id="input-with-icon-textfield"
          name="token"
          label="Access token"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
        />{" "}
        <Button
          style={{ marginTop: "5px" }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Fetch data
        </Button>
      </form>
      {/* Snackbar */}
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserForm;
