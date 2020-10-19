import React, { useEffect, useState } from "react";
import { Layer, Rect, Stage, Text } from "react-konva";
import HouseStore from "../stores/HouseStore";
import Legend from "./Legend";
import ProfileStore from "../stores/ProfileStore";

export default function HouseLayout() {
  const { currentHouse } = HouseStore();
  const { profiles } = ProfileStore();
  const [roomElements, setRoomElements] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const renderRooms = () => {
      const elements = [];
      const { houseCoor: components } = currentHouse;
      for (const data in components) {
        const subComp = components[data];
        let width = 50;
        let height = 50;
        let shapeColor = null;
        let textY = 30;
        let textX = 30;
        let fontSize = 7;
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
        for (let i = 0; i < subComp.length; i++) {
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
                key={
                  "name-" +
                  (subComp[i].name ? subComp[i].name : data + i.toString())
                }
                x={subComp[i].x + textX}
                y={subComp[i].y + textY}
                text={subComp[i].name}
                fontSize={fontSize}
              />
            );
          }

          if (!profiles.length) {
            continue;
          }

          let personAlreadyInRoom = 0;
          for (const profile of profiles) {
            const { location, name } = profile;
            if (subComp[i].name === location.toString()) {
              personAlreadyInRoom++;
              elements.push(
                <Text
                  key={
                    "profile-" +
                    (subComp[i].name
                      ? subComp[i].name + name
                      : name + i.toString())
                  }
                  x={subComp[i].x + textX}
                  y={subComp[i].y + textY + personAlreadyInRoom * 5}
                  text={name}
                  fontSize={4}
                  fill="orange"
                />
              );
            }
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
  }, [currentHouse, profiles]);

  return (
    <Stage width={0.7 * windowWidth} height={0.6 * windowHeight}>
      <Layer scaleX={3} scaleY={3} x={50} y={50}>
        {roomElements}
      </Layer>
      {roomElements.length ? <Legend /> : false}
    </Stage>
  );
}
