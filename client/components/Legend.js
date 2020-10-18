import React from "react";
import { Layer, Rect, Text } from "react-konva";

export default function Legend() {
  const shapeX = 300;
  const textX = 350;
  return (
    <Layer scaleX={2} scaleY={2} x={shapeX} y={0}>
      <Text x={shapeX} y={0} text={"Legend"} fontStyle={"bold"} />
      <Rect
        x={shapeX}
        y={20}
        width={20}
        height={5}
        fill="#00D2FF"
        stroke="black"
      />
      <Text x={textX} y={20} text={"Window"} />
      <Rect
        x={shapeX}
        y={40}
        width={5}
        height={10}
        fill="brown"
        stroke="black"
      />
      <Text x={textX} y={40} text={"Door"} />
    </Layer>
  );
}
