import { useEffect,useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import Projectspreview from './projectspreview';

const ProjectDashboard = () => {
const [assignmentDocID,setAssignmentDocID] =useState('')
const { arrayOfDocID, error } = useCollection("assignments");
    return (
<div>
{(error)?<h3 className='error'>{error}</h3>:<h1> hI Hihsh isdfhs </h1>}
{arrayOfDocID.length>0 &&
 arrayOfDocID.map((id,index)=>(
<div key={index}>
<Projectspreview assignmentDocID={id}/>
</div>
))}
</div>
    );
};

export default ProjectDashboard;