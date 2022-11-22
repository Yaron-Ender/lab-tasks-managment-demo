import React from 'react';
import { useDocument } from '../../hooks/useDocument';
import Select from 'react-select';
import { useRef } from 'react';
const AddTest = ({ test,substanceDoc,tech }) => {
const projRefobj = useRef(null)
const { document:professionDoc,error } =useDocument('profession',tech)
projRefobj.current={
tech:{tech}

}
console.log(professionDoc)  
return (
  <ul>
<li>
{test}
{professionDoc&&
<>
< Select
className="select"
options={professionDoc[tech]}
isMulti 
/>
<label>
<span>add comment...</span>
<textarea>
</textarea>
</label>
  <label>
<span>Set due date:</span>
<input
  type="date"
/>
 </label>
</>
}
</li>
{!professionDoc&&
<span>no workers are registered</span>
}
</ul>
);
};

export default AddTest;