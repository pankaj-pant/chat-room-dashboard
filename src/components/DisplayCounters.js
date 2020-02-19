/* eslint-disable no-template-curly-in-string */
import React from "react";
import Media from "react-media";
import "./DisplayCounters.css";
import Dial from "./Dial";
import Panel from "./Panel";

const DisplayCounters = ({ chatData }) => {
  return (
    <div className="DisplayCounters">
      <Media queries={{ laptop: { minWidth: 960 } }}>
        {matches =>
          matches.laptop ? (
            <div className="laptopScreen">
              <Dial
                maxValue={400}
                value={
                  chatData.total_conversation_count
                    ? chatData.total_conversation_count
                    : 0
                }
                currentValueText="Total conversation count: ${value}"
              />
              <Dial
                maxValue={3000}
                value={
                  chatData.total_user_message_count
                    ? chatData.total_user_message_count
                    : 0
                }
                currentValueText="Total user message count: ${value}"
              />
              <Dial
                maxValue={3000}
                value={
                  chatData.total_visitor_message_count
                    ? chatData.total_visitor_message_count
                    : 0
                }
                currentValueText="Total visitor message count: ${value}"
              />
            </div>
          ) : (
            <div className="smallScreen">
              <Panel
                value={
                  chatData.total_conversation_count
                    ? chatData.total_conversation_count
                    : 0
                }
                text="Total conversation count"
              />
              <Panel
                value={
                  chatData.total_user_message_count
                    ? chatData.total_user_message_count
                    : 0
                }
                text="Total user message count"
              />
              <Panel
                value={
                  chatData.total_visitor_message_count
                    ? chatData.total_visitor_message_count
                    : 0
                }
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
