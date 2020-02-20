/* eslint-disable no-template-curly-in-string */
import React from "react";
import Media from "react-media";
import "./DisplayCounters.css";
import Dial from "./Dial";
import Panel from "./Panel";

const DisplayCounters = ({ chatData }) => {
  /* Function for checking chat data message counts */
  const checkValue = keyName => {
    return chatData[keyName] ? chatData[keyName] : 0;
  };

  return (
    <div className="DisplayCounters">
      {/* Checking for screen width
          if > 960 pixels then data represented in dials,
          if < 960 pixels then data represented in panels.
      */}
      <Media queries={{ laptop: { minWidth: 960 } }}>
        {matches =>
          matches.laptop ? (
            /* Screen width > 960 pixels */
            <div className="laptopScreen">
              <Dial
                maxValue={400}
                value={checkValue("total_conversation_count")}
                currentValueText="Total conversation count: ${value}"
              />
              <Dial
                maxValue={3000}
                value={checkValue("total_user_message_count")}
                currentValueText="Total user message count: ${value}"
              />
              <Dial
                maxValue={3000}
                value={checkValue("total_visitor_message_count")}
                currentValueText="Total visitor message count: ${value}"
              />
            </div>
          ) : (
            /* Screen width < 960 pixels */
            <div className="smallScreen">
              <Panel
                value={checkValue("total_conversation_count")}
                text="Total conversation count"
              />
              <Panel
                value={checkValue("total_user_message_count")}
                text="Total user message count"
              />
              <Panel
                value={checkValue("total_visitor_message_count")}
                text="Total visitor message count"
              />
            </div>
          )
        }
      </Media>
    </div>
  );
};

export default DisplayCounters;
