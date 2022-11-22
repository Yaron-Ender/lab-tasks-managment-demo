import { useDocument } from "../../hooks/useDocument";
import cancel from '../../asstes/cancel.svg';
import AddTest from "./addTest";
export default function AddProjectMono({ projName }) {
const { error, document } = useDocument("substances", projName);
  return (
    <div
      className="projName-and-select-mono-container"
      style={{ background: "lightpink" }}
    >
    {projName && <h2>{projName}</h2>}
    {document &&
    Object.keys(document).map((monoTitle) => (
    <div style={{background:'lightgreen',padding:'20px 0',border:'1px solid black'}} key={document[monoTitle].id} className="assign-mono-box">
    <h3>{monoTitle}<img className="cancel-icon" width={20} src={cancel}/></h3>
    {/* try to add the img as content to h3 */}
    {Object.keys(document[monoTitle].tests).map((tech)=>(
   <>
   <h4 key={Math.random()}>{tech}</h4>
   
    {document[monoTitle].tests[tech].map((test)=>(
      <AddTest
      tech={tech}
      test={test}
      substanceDoc={document}/>
    ))}
   </>
    ))}
    </div>
    ))}
    {error && <p>{error}</p>}
    </div>
  );
}