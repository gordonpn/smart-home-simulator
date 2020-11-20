import React, {useEffect, useState} from 'react'
import {Select, FormControl, InputLabel, MenuItem} from "@material-ui/core"
export default function SeasonRange(){
    // const [months, setMonths] =useState()
    const [winterStart, setWinterStart] = useState("");
    const [winterEnd, setWinterEnd] = useState("");


    const months = [1,2,3,4,5,6,7,8,9,10,11,12]
  
    const handleWinterStart=(event)=>{
        setWinterStart(event.target.value)

    }
    const handleWinterEnd=(event)=>{
        setWinterEnd(event.target.value)

    }

    
    return ( 
        <>
        <p>Winter</p>
        <FormControl>
            <InputLabel id="winterStart">
            Start
            </InputLabel>
            <Select labelId="winterStart" value={winterStart} onChange={handleWinterStart}>
    {months.map((month)=>(<MenuItem key={"winterStart-"+month} value={month}>{month}</MenuItem>))}
            </Select>

        </FormControl>
        <FormControl>
            <InputLabel id="winterEnd">
            End
            </InputLabel>
            <Select labelId="winterEnd" value={winterEnd} onChange={handleWinterEnd}>
    {months.map((month)=>(<MenuItem key={"winterEnd-"+month} value={month}>{month}</MenuItem>))}
            </Select>

        </FormControl>
        
        </>
   );
}