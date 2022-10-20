import MonoInput from "../../component/input/MonoInput";
import { useState, useEffect } from "react";
import Button from "../../component/button/button";
import plusSign from "../../asstes/plus.svg"
const SingelTech = ({technology,id,updateTests,monograph}) => {
   const initObj={
      HPLC:[],
      WET:[],
      GC:[]
   }
   const [testList,setTestList]=useState(initObj)
   const [text,setText]=useState('')
useEffect(()=>{
updateTests(id,testList)
},[testList])

const handleClick= (e)=>{
  setTestList((prev) =>({...prev,[technology]:[...prev[technology],text]}));
setText("");
}
   return (
    <div>
   <h3>{technology}</h3>
   <ul>
   {monograph.length>0&&monograph.map(mono=>(
   mono.id==id&&
      mono.tests[technology].map(item=>(
    <li key={item}>{item}</li>         
      ))
   ))
   }
   </ul>
   <div className="test-container">
   <MonoInput type="text" span={"add test"}
   onChange={(e)=>{setText(e.target.value)}}
 value={text}
   />
   <Button type="button" 
   buttontype='addTest' 
    children={<img className="plus-sign" src={plusSign}
     onClick={handleClick}  />}
    />
    </div>
    </div>
    );
};

export default SingelTech;