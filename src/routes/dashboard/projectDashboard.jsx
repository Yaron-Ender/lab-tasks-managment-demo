import { useEffect } from 'react';
import { Fragment,useState} from 'react';
import { useCollection } from '../../hooks/useCollection';
import Projectspreview from './projectspreview';
const ProjectDashboard = () => {
const [counter,setCounter] =useState(0);
const { arrayOfDocID, error } = useCollection("assignments");
const { arrayOfDocID:usersCollectionArray } =useCollection("users")

useEffect(()=>{
setCounter((prev)=>(arrayOfDocID.length))
},[arrayOfDocID])

    return (
<div className='project-dashboard'>
{(error)?<h3 className='error'>your projects dashboard is empty</h3>:<h2> you have {counter} project running</h2>}
<div className='projects-preview-container'>
{arrayOfDocID.length>0 && usersCollectionArray.length&&
 arrayOfDocID.sort().map((id,index)=>(
<Fragment key={index}>
<Projectspreview assignmentDocID={id} usersCollectionArray={usersCollectionArray}  />
</Fragment>
))}
</div>
</div>
    );
};

export default ProjectDashboard;