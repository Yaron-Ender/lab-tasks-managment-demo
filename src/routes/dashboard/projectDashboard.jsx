import { useEffect } from 'react';
import { Fragment,useState,useCallback} from 'react';
import { useCollection } from '../../hooks/useCollection';
import Projectspreview from './projectspreview';

const ProjectDashboard = ({ projWasDeleted }) => {
const [counter,setCounter] =useState(0)
const { arrayOfDocID, error } = useCollection("assignments");

useEffect(()=>{
setCounter((prev)=>(arrayOfDocID.length))
},[arrayOfDocID])
    return (
<div className='project-dashboard'>
{(error)?<h3 className='error'>{error}</h3>:<h2> you have {counter} project runing</h2>}
<div className='projects-preview-container'>
{arrayOfDocID.length>0 &&
 arrayOfDocID.sort().map((id,index)=>(
<Fragment key={index}>
<Projectspreview assignmentDocID={id} />
</Fragment>
))}
</div>
</div>
    );
};

export default ProjectDashboard;