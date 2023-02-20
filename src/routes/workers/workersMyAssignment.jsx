import { useEffect,useState,useRef } from "react";
import { useDocument } from "../../hooks/useDocument";
const WorkersMyAssignment = ({myAssignmentID,profession,userID,myAssignmentsLength,orderByDateFunction }) => {
const { document } =useDocument('assignments',myAssignmentID);
const [,setRerender]=useState('');
const [restricUseEffectIteration,setRestrictUseEffectIteration]=useState(1)
const myAssignmentObj = useRef({projectName:'',profession,test:[],monograph:''}).current
// console.log(myAssignmentID, myAssignmentsLength,document);


useEffect(()=>{
if(document&&restricUseEffectIteration<=myAssignmentsLength){
  for (let i = 0; i <= myAssignmentsLength; i++) {
    setRestrictUseEffectIteration((prev) => ++prev);
  }
  myAssignmentObj.projectName = Object.keys(document)[0];
  
  const monographSet = new Set(Object.keys(document[Object.keys(document)]));
 
  // console.log(document)
  // console.log(monographSet)
  //iterate ['usa','eur',jp]
  for(let mono of monographSet){
    //eleminate empty monograph, if there is one
    if(document[myAssignmentObj.projectName][mono]){
      //continue only with monograph with the same profesion
      // console.log(mono,document[myAssignmentObj.projectName][mono][profession]);
      if(document[myAssignmentObj.projectName][mono][profession]){
        let map = new Map(Object.entries(document[myAssignmentObj.projectName][mono][profession]));
        //  console.log(map)
        myAssignmentObj.test=[];
        myAssignmentObj.monograph='';
      map.forEach((value, key, map)=>{
        value.workers.forEach((worker)=>{
      if(worker.workerID===userID){
      myAssignmentObj.monograph = mono;
      myAssignmentObj.test = [...myAssignmentObj.test,[key, value]];
      
    }
  })
});
orderByDateFunction(myAssignmentObj);
}
}
}

  //{projectName: 'substance A', profession: 'HPLC', test: Array(2), monograph: 'usa'}
  // test: (2) [Array(2), Array(2)]
  // 0: (2) ['assay + imp', {…}]
  // 1: (2) ['organic purity', {…}]

  // Object.values(Object.values(document)).forEach((monographesObj) => {
  //   // console.log(monographesObj)
  //   //{usa: {…}, eur: {…}, jp: ''}
  //   Object.entries(monographesObj).forEach((monoPlusTechArr) => {
  //     //  console.log(myAssignmentObj.test)
  //     myAssignmentObj.test = [];
  //     //check if there a value in the monograph property
  //     // console.log(monoPlusTechArr)
  //     //['eur', {…}]
  //     if (monoPlusTechArr[1]) {
  //       myAssignmentObj.monograph = monoPlusTechArr[0];
  //       //array of test's name and details of the same technilogy
  //       Object.entries(monoPlusTechArr[1][profession]).forEach((arr) => {
  //         // console.log(arr)
  //         //['assay + imp', {…}], ['organic purity', {…}]
  //         arr[1]["workers"].forEach((worker) => {
  //           if (worker.workerID === userID) {
  //             myAssignmentObj.test = [...myAssignmentObj.test, arr];
  //             //rerender state is for make the comp rerender
  //             setRerender(arr[0]);
  //           }
  //         });
  //       });
  //     }
  //     console.log(myAssignmentObj);
  //     orderByDateFunction(myAssignmentObj);
  //   });
  // });
}
},[document])
};

export default WorkersMyAssignment;