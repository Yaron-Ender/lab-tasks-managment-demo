import { Fragment} from 'react';
import { useCollection } from '../../hooks/useCollection';
import Projectspreview from './projectspreview';

const ProjectDashboard = () => {
// const [assignmentDocID,setAssignmentDocID] =useState('')
const { arrayOfDocID, error } = useCollection("assignments");
    return (
<div className='project-dashboard'>
{(error)?<h3 className='error'>{error}</h3>:<h2> you have {arrayOfDocID.length} project runing</h2>}
<div className='projects-preview-container'>
{arrayOfDocID.length>0 &&
 arrayOfDocID.map((id,index)=>(
<Fragment key={index}>
<Projectspreview assignmentDocID={id}/>
</Fragment>
))}
</div>
</div>
    );
};

export default ProjectDashboard;