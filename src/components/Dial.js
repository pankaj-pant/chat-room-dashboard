import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const Dial = ({maxValue, value, currentValueText}) => {
  return (
    <ReactSpeedometer
      maxValue={maxValue}
      value={value}
      maxSegmentLabels={5}
      segments={500}
      needleHeightRatio={0.7}
      needleTransitionDuration={4000}
      needleTransition="easeElastic"
      currentValueText={currentValueText}
      startColor="#F79A4C"
      endColor="#9450FF"
      height={200}
    />
  );
};

export default Dial;