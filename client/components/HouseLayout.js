import React, { useEffect, useState } from "react";
import { Layer, Rect, Stage, Text, Circle } from "react-konva";
import HouseStore from "../stores/HouseStore";
import Legend from "./Legend";
import ProfileStore from "../stores/ProfileStore";
import RunningStateStore from "../stores/RunningStateStore";

export default function HouseLayout() {
  const { currentHouse, windows, triggerRender } = HouseStore();
  const { profiles } = ProfileStore();
  const { currentState } = RunningStateStore();
  const [roomElements, setRoomElements] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const renderRooms = () => {
      const elements = [];
      const { houseCoor: components } = currentHouse;
      for (const roomName in components) {
        const subComp = components[roomName];
        let width = 50;
        let height = 50;
        let shapeColor = null;
        let textY = 30;
        let textX = 30;
        let fontSize = 7;
        const shiftFactorX = 0.5;

        switch (roomName) {
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
              key={subComp[i].name ? subComp[i].name : roomName + i}
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
                  (subComp[i].name ? subComp[i].name : roomName + i.toString())
                }
                x={subComp[i].x + textX}
                y={subComp[i].y + textY}
                text={subComp[i].name}
                fontSize={fontSize}
              />
            );
          }

          if (roomName === "windows") {
            elements.push(
              <Circle
                key={"block-" + subComp[i].name}
                x={subComp[i].x + width * 0.5}
                y={subComp[i].y}
                visible={
                  windows !== undefined
                    ? windows.get(
                        subComp[i].name.substr(0, subComp[i].name.indexOf("-w"))
                      )
                    : false
                }
                radius={4}
                fill={"red"}
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

      let personAlreadyOutside = 0;
      for (const profile of profiles) {
        const { location, name } = profile;
        if (location.toString() === "outside") {
          personAlreadyOutside++;
          elements.push(
            <Text
              key={"profile-" + "outside" + name}
              x={0}
              y={160 + personAlreadyOutside * 5}
              text={name}
              fontSize={4}
              fill="orange"
            />
          );
        }
      }
      return elements;
    };

    if (currentHouse !== undefined) {
      setRoomElements(renderRooms());
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
  }, [currentHouse, profiles, triggerRender, windows]);

  return (
    <Stage
      width={0.7 * windowWidth}
      height={0.6 * windowHeight}
      opacity={currentState ? 1 : 0.2}
    >
      <Layer scaleX={2.5} scaleY={2.5} x={50} y={50}>
        {roomElements}
      </Layer>
      {roomElements.length ? <Legend /> : false}
    </Stage>
  );
}
