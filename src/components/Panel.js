import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./DisplayCounters.css";

const Panel = ({ value, text }) => {
  return (
    <Card variant="outlined">
      <CardContent className="cardContent">
        <Typography variant="h5" color="textSecondary" gutterBottom>
          {value}
        </Typography>
        <Typography>{text}</Typography>
      </CardContent>
    </Card>
  );
};

export default Panel;
