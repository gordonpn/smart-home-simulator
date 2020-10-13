import React from 'react';
import {processFile} from '../src/ReadFile'
import Dashboard from "../components/Dashboard";

export default function Index() {
  return <Dashboard />;
  //   return (
//     <div>
//       {/* <input type='file' accept='.txt' onChange={(e)=>{processFile(e)}}/> */}
//     </div>
//   );

}
