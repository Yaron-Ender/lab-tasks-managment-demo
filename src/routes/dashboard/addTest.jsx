import React from 'react';
import { useDocument } from '../../hooks/useDocument';
import Select from 'react-select';
 import { useRef,useState,useEffect } from 'react';
const AddTest = ({ test,tech, monoTitle, handleTestFields }) => {
  const { document: professionDoc, error } = useDocument("profession", tech);
  const [textArea, setTextArea] = useState("");
  const [workers,setWorkers] = useState([])
  const [date,setDate] =useState('')
  const fields = useRef({});
  fields.current = {
    [test]: {
      workers: [],
      comments: "",
      dueDate: "",
    }
  };
  useEffect(() => {
  fields.current[test]['comments']=textArea;
  fields.current[test]['workers']=workers;
  fields.current[test]['dueDate']=date;
  //handleTestField function is get calles also from addProjectMono,because that we pass empty string
  handleTestFields("",fields.current);
  }, [document,textArea,workers,date]);

  const handleDateORcomment = (e) => {  
  const {name,value} = e.target
  switch(name){
 case 'comment':
  setTextArea(value)
  case 'date':
  setDate(value)
  }
  };
  const handleWorkers = (option) => {
    let workersArr = [];
    option.forEach((o) => {
      workersArr.push(o.value);
    setWorkers(workersArr);
    });
     };

  return (
    <ul style={{ border: "2px dashed black", padding: "20px 0" }}>
      <li>
        {test}
        {professionDoc && (
          <>
      <Select
        className="select"
        name='workers'
        onChange={(option) => handleWorkers(option)}
        options={professionDoc[tech]}
        isMulti
      />
      <label>
        <span>add comment...</span>
       <textarea
       name='comment'
        type="text"
        onChange={(e) => handleDateORcomment(e)}
        value={textArea}
       ></textarea>
      </label>
      <label>
        <span>Set due date:</span>
        <input
        name='date'
        type="date"
        onChange={(e) => handleDateORcomment(e)}
        />
      </label>
          </>
        )}
      </li>
      {!professionDoc && <span>no workers are registered</span>}
    </ul>
  );
};

export default AddTest;