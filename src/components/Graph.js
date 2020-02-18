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

const Graph = ({graphData}) => {
    console.log("Graph rows", graphData)

    const graphDataOne = () => {
       return graphData.map(d => ({x: d.date, y: d.conversation_count}))
    }
    const graphDataTwo = () => {
        return graphData.map(d => ({x: d.date, y: d.missed_chat_count}))
    }
    const graphDataThree = () => {
        return graphData.map(d => ({x: d.date, y: d.visitors_with_conversation_count}))
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
          data={graphDataOne()}
          
        />
        <VerticalBarSeries
          data={graphDataTwo()}
       
        />
        <VerticalBarSeries
          data={graphDataThree()}
    
        />
      </FlexibleWidthXYPlot>
    </div>
  );
};

export default Graph;
