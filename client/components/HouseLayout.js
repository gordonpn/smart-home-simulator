import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text} from 'react-konva'
import HouseStore from '../stores/HouseStore'
import Legend from './Legend';

export default function houseLayout() {
    const { currentHouse } = HouseStore();
    const [roomElements, setRoomElements] = useState([]);
    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)


    useEffect(() => {
        if (currentHouse != undefined) {
            setRoomElements(renderRooms())
        }

    }, [currentHouse])
    useEffect(() => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }, [])

    const renderRooms = () => {

        const elements = []
        const components = currentHouse.houseCoor
        for (const data in components) {
            const subComp = components[data]
            const width = 50
            const height = 50
            const shapeColor = null;

            switch (data) {
                case "bathrooms":
                    width = 20
                    break
                case "bedrooms":
                    width = 50
                    break
                case "kitchen":
                    width = 80
                    break
                case "living":
                    width = 100
                    break
                case "dining":
                    width = 120
                    break
                case "doors":
                    width = 5
                    height = 10
                    shapeColor = "brown"
                    break
                case "windows":
                    width = 20
                    height = 5
                    shapeColor = "#00D2FF"
                    break
                case "garage":
                    width = 80
                    height = 60
                    break
                case "deck":
                    width = 120
                    height = 30
                    break
                case "entrance":
                    width = 50
                    height = 10
                    break

            }
            for (var i = 0; i < subComp.length; i++) {
                elements.push(<Rect
                    key={subComp[i].name ? subComp[i].name : data + i}
                    x={subComp[i].x}
                    y={subComp[i].y}
                    width={width}
                    height={height}
                    fill={shapeColor}
                    stroke="black"
                />)

                if (subComp[i].name !== null) {
                    elements.push(<Text
                        key={"name-" + (subComp[i].name ? subComp[i].name : data + i)}
                        x={subComp[i].x + 5}
                        y={subComp[i].y + 10}
                        text={subComp[i].name}
                        fontSize={7}

                    />)

                }

            }
        }

        return elements
    }

    return (
            <Stage width={0.7*windowWidth} height={0.6*windowHeight} >
               
                <Layer scaleX={2} scaleY={2} x={50} y={50}>
                    {roomElements}

                </Layer>
                {roomElements.length?<Legend/>:false}
                
            </Stage>
    );
}