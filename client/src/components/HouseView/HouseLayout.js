import React, { useEffect, useState } from "react";
import { Circle, Layer, Rect, Stage, Text } from "react-konva";
import HouseStore from "@/src/stores/HouseStore";
import Legend from "./Legend";
import RunningStateStore from "@/src/stores/RunningStateStore";
import SHHStore from "@/src/stores/SHHStore";

export default function HouseLayout() {
  const {
    currentHouse,
    windows,
    triggerRender,
    doors,
    lights,
    profiles,
  } = HouseStore();
  const { currentState } = RunningStateStore();
  const [roomElements, setRoomElements] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const { roomAC, roomHeater } = SHHStore();

  useEffect(() => {
    const renderRooms = () => {
      const elements = [];
      const { houseCoor: components } = currentHouse;
      const orderedMap = new Map(Object.entries(components));
      const tempArrDoors = orderedMap.get("doors");
      const tempArrWindows = orderedMap.get("windows");
      orderedMap.delete("doors");
      orderedMap.delete("windows");
      orderedMap.set("windows", tempArrWindows);
      orderedMap.set("doors", tempArrDoors);

      const shapeColorState = (componentType, componentName) => {
        if (doors !== undefined && componentType === "doors") {
          if (doors.get(componentName).locked) {
            return "#36CD6C";
          }
          return doors.get(componentName).open ? null : "brown";
        } else if (windows !== undefined && componentType === "windows") {
          return windows.get(componentName) && windows.get(componentName).isOpen
            ? null
            : "#00D2FF";
        } else if (lights !== undefined) {
          return lights.get(componentName + "-l1").isOn ? "#F3F686" : null;
        }
        return null;
      };

      for (const [key, value] of orderedMap.entries()) {
        const subComp = value;
        const roomName = key;
        let width = 50;
        let height = 50;
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
            break;
          case "windows":
            width = 20;
            height = 5;
            textY = 6;
            textX = -5;
            fontSize = 6;
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

        if (roomName !== "lights") {
          for (let i = 0; i < subComp.length; i++) {
            if (roomName !== "lights") {
              elements.push(
                <Rect
                  key={subComp[i].name ? subComp[i].name : roomName + i}
                  x={subComp[i].x}
                  y={subComp[i].y}
                  width={
                    subComp[i].name.toLowerCase().includes("garage")
                      ? 50
                      : width
                  }
                  height={height}
                  fillPriority={"radial-gradient"}
                  fill={shapeColorState(roomName, subComp[i].name)}
                  stroke="black"
                />
              );
            }

            if (
              subComp[i].name !== null &&
              roomName !== "doors" &&
              roomName !== "lights"
            ) {
              elements.push(
                <Text
                  key={
                    "name-" +
                    (subComp[i].name
                      ? subComp[i].name
                      : roomName + i.toString())
                  }
                  x={subComp[i].x + textX}
                  y={subComp[i].y + textY}
                  text={subComp[i].name}
                  fontSize={fontSize}
                />
              );
            }

            if (
              roomName !== "doors" &&
              roomName !== "lights" &&
              roomName !== "windows"
            ) {
              elements.push(
                <Circle
                  key={subComp[i].name + "-AC"}
                  x={subComp[i].x + textX - 5}
                  y={subComp[i].y + textY + 5}
                  radius={3}
                  fill={"#B0EAFC"}
                  visible={roomAC.has(subComp[i].name)}
                />
              );
            }
            if (
              roomName !== "doors" &&
              roomName !== "lights" &&
              roomName !== "windows"
            ) {
              elements.push(
                <Circle
                  key={subComp[i].name + "-Heater"}
                  x={subComp[i].x + textX - 5}
                  y={subComp[i].y + textY + 5}
                  visible={roomHeater.has(subComp[i].name)}
                  radius={3}
                  fill={"orange"}
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
                    windows !== undefined && windows.get(subComp[i].name)
                      ? windows.get(subComp[i].name).blocked
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
              if (subComp[i].name === location.toString().toLowerCase()) {
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
                    fill="red"
                  />
                );
              }
            }
          }
        }
      }

      let personAlreadyOutside = 0;
      for (const profile of profiles) {
        const { location, name } = profile;
        if (location.toString().toLowerCase() === "outside") {
          personAlreadyOutside++;
          elements.push(
            <Text
              key={"profile-" + "outside" + name}
              x={0}
              y={160 + personAlreadyOutside * 5}
              text={name}
              fontSize={4}
              fill="red"
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
  }, [
    currentHouse,
    profiles,
    triggerRender,
    windows,
    doors,
    lights,
    roomAC,
    roomHeater,
  ]);

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
