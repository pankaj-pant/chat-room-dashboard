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

const Graph = ({data}) => {
    const processData = (keyName) => {
      return data.map(d => ({x: d.date, y: d[keyName]}))
    }

  return (
    <div>
    <FlexibleWidthXYPlot height={400} xType="ordinal">
        <HorizontalGridLines />
        <VerticalGridLines />
        <DiscreteColorLegend items={[{title: "conversation_count"}, {title: "missed_chat_count"}, {title: "visitors_with_conversation_count"}]} orientation="horizontal"/>
        <XAxis />
        <YAxis title="Message count" />
        <VerticalBarSeries
          data={processData("conversation_count")}
        />
        <VerticalBarSeries
          data={processData("missed_chat_count")}
        />
        <VerticalBarSeries
          data={processData("visitors_with_conversation_count")}
        />
      </FlexibleWidthXYPlot>
    </div>
  );
};

export default Graph;
