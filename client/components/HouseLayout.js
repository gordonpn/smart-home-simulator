import { object } from 'prop-types';
import React,{ useState, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva'
import HouseStore from '../stores/HouseStore'
export default function houseLayout() {
    const { currentHouse } = HouseStore();
    const [elements, setElements] = useState([]);

    useEffect(()=>{
        if(currentHouse!=undefined){
            setElements(render());
        }
        
    },currentHouse)
    const render = ()=>{
        const bedRooms =currentHouse.houseCoor.bedrooms
        const elements =[]
        //bedrooms
        for(var i=0;i<bedRooms.length;i++) {
            elements.push(<Rect
                x={bedRooms[i].x}
                y={bedRooms[i].y}
                width={50}
                height={50}
                stroke="black"
            />)
        }

        //kitchen
        elements.push(<Rect
            x={currentHouse.houseCoor.kitchen[0].x}
            y={currentHouse.houseCoor.kitchen[0].y}
            width={80}
            height={50}
            stroke="black"
        />)

        //living room
        elements.push(<Rect
            x={currentHouse.houseCoor.living[0].x}
            y={currentHouse.houseCoor.living[0].y}
            width={100}
            height={50}
            stroke="black"
        />)

        //dining room
        elements.push(<Rect
            x={currentHouse.houseCoor.dining[0].x}
            y={currentHouse.houseCoor.dining[0].y}
            width={120}
            height={50}
            stroke="black"
        />)

        
        return elements

    }

    return (

        <Stage width={2000} height={2000}>
            <Layer>
                {elements}
                
                
                {/* <Rect
                    x={100}
                    y={50}
                    width={120}
                    height={50}
                    stroke="black"
                />
                <Rect
                    x={220}
                    y={50}
                    width={80}
                    height={50}
                    stroke="black"
                />
                <Rect
                    x={0}
                    y={50}
                    width={100}
                    height={50}
                    stroke="black"
                />
                <Rect
                    x={25}
                    y={40}
                    width={5}
                    height={10}
                    fill="brown"
                    stroke="black"
                />
                 <Rect
                    x={10}
                    y={0}
                    width={20}
                    height={5}
                    fill="#00D2FF"
                    stroke="black"
                /> */}
                {/* <Rect
            x={100}
            y={50}
            width={120}
            height={50}
            stroke="black"
        /> */}

            </Layer>
        </Stage>
    );
}