import React from "react";
import "../../node_modules/react-vis/dist/style.css";
import {
  FlexibleWidthXYPlot,
  VerticalBarSeries,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
  DiscreteColorLegend
} from "react-vis";

const Graph = ({ data }) => {
  /* Function for processing data for individual Bar Series */
  const processData = keyName => {
    return data.map(d => ({ x: d.date, y: d[keyName] }));
  };

  return (
    <div>
      <FlexibleWidthXYPlot height={400} xType="ordinal">
        <HorizontalGridLines />
        <VerticalGridLines />
        <DiscreteColorLegend
          items={[
            { title: "Conversation count", color:"#38D09B" },
            { title: "Missed chat count", color:"#FF9A4C" },
            { title: "Visitors with conversation count", color:"#9450FF" }
          ]}
          orientation="horizontal"
        />
        <XAxis />
        <YAxis title="Message count" />
        <VerticalBarSeries data={processData("conversation_count")} color="#38D09B"/>
        <VerticalBarSeries data={processData("missed_chat_count")} color="#FF9A4C"/>
        <VerticalBarSeries
          data={processData("visitors_with_conversation_count")}
          color="#9450FF"
        />
      </FlexibleWidthXYPlot>
    </div>
  );
};

export default Graph;
