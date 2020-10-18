import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import HouseStore from "../stores/HouseStore";
import Legend from "./Legend";

export default function HouseLayout() {
  const { currentHouse } = HouseStore();
  const [roomElements, setRoomElements] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const renderRooms = () => {
      const elements = [];
      const components = currentHouse.houseCoor;
      for (const data in components) {
        const subComp = components[data];
        var width = 50;
        var height = 50;
        var shapeColor = null;
        var textY = 30;
        var textX = 30;
        var fontSize = 7;
        const shiftFactorX = 0.5;

        switch (data) {
          case "bathrooms":
            width = 20;
            textX = width / 2;
            textY = 20;
            break;
          case "bedrooms":
            width = 50;
            textX = (shiftFactorX * width) / 2;
            textY = 20;
            break;
          case "kitchen":
            width = 80;
            textX = (shiftFactorX * width) / 2;
            textY = 20;
            break;
          case "living":
            width = 100;
            textX = (shiftFactorX * width) / 2;
            textY = 20;
            break;
          case "dining":
            width = 120;
            textX = (shiftFactorX * width) / 2;
            textY = 20;
            break;
          case "doors":
            width = 5;
            height = 10;
            shapeColor = "brown";
            break;
          case "windows":
            width = 20;
            height = 5;
            textY = 6;
            textX = -5;
            fontSize = 6;
            shapeColor = "#00D2FF";
            break;
          case "garage":
            width = 80;
            height = 60;
            textX = (shiftFactorX * width) / 2;
            textY = 25;
            break;
          case "deck":
            width = 120;
            height = 30;
            textX = (shiftFactorX * width) / 2;
            textY = 10;
            break;
          case "entrance":
            width = 50;
            height = 20;
            textX = (shiftFactorX * width) / 2;
            textY = 5;
            break;
        }
        for (var i = 0; i < subComp.length; i++) {
          elements.push(
            <Rect
              key={subComp[i].name ? subComp[i].name : data + i}
              x={subComp[i].x}
              y={subComp[i].y}
              width={width}
              height={height}
              fill={shapeColor}
              stroke="black"
            />
          );

          if (subComp[i].name !== null) {
            elements.push(
              <Text
                key={"name-" + (subComp[i].name ? subComp[i].name : data + i)}
                x={subComp[i].x + textX}
                y={subComp[i].y + textY}
                text={subComp[i].name}
                fontSize={fontSize}
              />
            );
          }
        }
      }

      return elements;
    };

    if (currentHouse !== undefined) {
      setRoomElements(renderRooms());
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
  }, [currentHouse]);

  return (
    <Stage width={0.7 * windowWidth} height={0.6 * windowHeight}>
      <Layer scaleX={2} scaleY={2} x={50} y={50}>
        {roomElements}
      </Layer>
      {roomElements.length ? <Legend /> : false}
    </Stage>
  );
}
