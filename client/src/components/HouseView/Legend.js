import React from "react";
import { Layer, Rect, Text, Circle } from "react-konva";

export default function Legend() {
  const shapeX = 310;
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
      <Text x={textX} y={20} text={"Closed Window"} />
      <Rect x={shapeX} y={40} width={20} height={5} stroke="black" />
      <Text x={textX} y={40} text={"Open Window"} />
      <Rect
        x={shapeX}
        y={60}
        width={5}
        height={10}
        fill="brown"
        stroke="black"
      />
      <Text x={textX} y={60} text={"Closed Door"} />
      <Rect x={shapeX} y={80} width={5} height={10} stroke="black" />
      <Text x={textX} y={80} text={"Open Door"} />
      <Rect
        x={shapeX}
        y={100}
        width={5}
        height={10}
        fill="#36CD6C"
        stroke="black"
      />
      <Text x={textX} y={100} text={"Locked Door"} />
      <Circle x={shapeX + 5} y={125} radius={8} fill={"red"} />
      <Text x={textX} y={120} text={"Blocked Window"} />
      <Rect x={shapeX - 2} y={140} width={15} height={15} fill="#F3F686" />
      <Text x={textX} y={140} text={"Lights On"} />
      <Circle x={shapeX + 5} y={168} radius={8} fill={"orange"} />
      <Text x={textX} y={163} text={"Heater On"} />
    </Layer>
  );
}
