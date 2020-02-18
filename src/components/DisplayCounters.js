import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactSpeedometer from "react-d3-speedometer";
import Media from "react-media";

const DisplayCounters = ({ chatData }) => {
  return (
    <div>
      <Media queries={{ laptop: { minWidth: 960 } }}>
        {matches =>
          matches.laptop ? (
            <div
              style={{
                margin: "20px auto 0px auto",
                padding: "10px 0",
                display: "flex",
                alignItems: "stretch",
                justifyContent: "space-around",
                width: "95%",
                /* border: "1px solid red" */
              }}
            >
              <ReactSpeedometer
                maxValue={400}
                value={
                  chatData.total_conversation_count
                    ? chatData.total_conversation_count
                    : 68
                }
                maxSegmentLabels={5}
                segments={500}
                needleHeightRatio={0.7}
                needleTransitionDuration={4000}
                needleTransition="easeElastic"
                currentValueText="Total conversation count: ${value}"
                startColor="#F79A4C"
                endColor="#9450FF"
                height={200}
              />

              <ReactSpeedometer
                maxValue={3000}
                value={
                  chatData.total_user_message_count
                    ? chatData.total_user_message_count
                    : 559
                }
                maxSegmentLabels={5}
                segments={500}
                needleHeightRatio={0.7}
                needleTransitionDuration={4000}
                needleTransition="easeElastic"
                currentValueText="Total user message count: ${value}"
                startColor="#F79A4C"
                endColor="#9450FF"
                height={200}
              />

              <ReactSpeedometer
                maxValue={3000}
                value={
                  chatData.total_visitor_message_count
                    ? chatData.total_visitor_message_count
                    : 555
                }
                maxSegmentLabels={5}
                segments={500}
                needleHeightRatio={0.7}
                needleTransitionDuration={4000}
                needleTransition="easeElastic"
                currentValueText="Total visitor message count: ${value}"
                startColor="#F79A4C"
                endColor="#9450FF"
                height={200}
              />
            </div>
          ) : (
            <div
              style={{
                margin: "20px auto",
                padding: "10px 0",
                display: "flex",
                alignItems: "stretch",
                justifyContent: "space-around",
                width: "95%",
                border: "1px solid red"
              }}
            >
              <Card variant="outlined">
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h5" color="textSecondary" gutterBottom>
                    {chatData.total_conversation_count
                      ? chatData.total_conversation_count
                      : 68}
                  </Typography>
                  <Typography>Total conversation count</Typography>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h5" color="textSecondary" gutterBottom>
                    {chatData.total_user_message_count
                      ? chatData.total_user_message_count
                      : 559}
                  </Typography>
                  <Typography>Total user message count</Typography>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h5" color="textSecondary" gutterBottom>
                    {chatData.total_visitor_message_count
                      ? chatData.total_visitor_message_count
                      : 555}
                  </Typography>
                  <Typography>Total visitor message count</Typography>
                </CardContent>
              </Card>
            </div>
          )
        }
      </Media>
    </div>
  );
};

export default DisplayCounters;
