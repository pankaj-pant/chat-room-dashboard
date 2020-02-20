import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const Dial = ({ maxValue, value, currentValueText }) => {
  return (
    <ReactSpeedometer
      maxValue={maxValue}
      value={value}
      maxSegmentLabels={5}
      segments={500}
      needleHeightRatio={0.7}
      needleTransitionDuration={4000}
      needleTransition="easeElastic"
      needleColor="#7357FF"
      currentValueText={currentValueText}
      startColor="#FF9A4C"
      endColor="#9450FF"
      height={200}
    />
  );
};

export default Dial;
