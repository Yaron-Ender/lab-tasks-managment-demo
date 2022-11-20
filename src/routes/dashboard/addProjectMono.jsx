import { useDocument } from "../../hooks/useDocument";
import { useWorkerClassification } from "../../hooks/useWorkerClassification";
import { useEffect,useRef } from "react";
import cancel from '../../asstes/cancel.svg';
import Select from "react-select";

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
    <div style={{background:'lightgreen',padding:'20px 0',border:'1px solid light-gray'}} key={document[monoTitle].id} className="assign-mono-box">
    <h3>{monoTitle}<img className="cancel-icon" width={20} src={cancel}/></h3>
    {/* try to add the img as content to h4   */}
    {Object.keys(document[monoTitle].tests).map((tech)=>(
  <h4 key={tech}>{tech}</h4>
    ))}
    </div>
    ))}
    {error && <p>{error}</p>}
    </div>
  );
}