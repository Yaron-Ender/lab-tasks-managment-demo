import { useDocument } from "../../hooks/useDocument";
import cancel from '../../asstes/cancel.svg';
import AddTest from "./addTest";
import { useEffect,Fragment,useState } from "react";
import { useRef } from "react";
export default function AddProjectMono({ projName, handleTestFields, deleteMonograph }) {
  const { error, document } = useDocument("substances",projName);
  const [monographList, setMonograpghList] = useState([]);
  const buildObjBasedDocument =useRef()
  const buildMonographList =()=>{
  const arr=[]
   Object.keys(document).forEach((m) => {
    arr.push(m)
    });
    setMonograpghList(arr)
  }
  
  useEffect(() => {
  if (document) {
  buildObjBasedDocument.current=document;
    setMonograpghList([]);
     buildMonographList();
  Object.keys(document).forEach((m) => {
        //handleTestField function is get calles also from AddTest,because that we pass empt string
    handleTestFields(m, "");
      });
    }
  },[document,projName]);

  const handleClick = (monoTitle) => {
    deleteMonograph( monoTitle);
  setMonograpghList((prev)=>(prev.filter((m)=>m!==monoTitle)))
  };
  return (
    <>

      {projName && <h2>{projName}</h2>}
  <div
    className="projName-and-select-mono-container"
    style={{ background: "lightpink" }}
  >
    {document &&
      // monographList.length > 0 &&
      // Object.keys(document).map((monoTitle)
    monographList.map((monoTitle) => (
    <div
      style={{
        background: "lightgreen",
        padding: "20px 0",
        border: "1px solid black",
      }}
    key={buildObjBasedDocument.current[monoTitle]['id']}
      className="assign-mono-box"
    >
      <h3>
        {monoTitle}
        <img
          className="cancel-icon"
          width={20}
          src={cancel}
          onClick={() => {
            handleClick(monoTitle);
          }}
        />
      </h3>
      {/* try to add the img as content to h3 */}

      {
      Object.keys(buildObjBasedDocument.current[monoTitle].tests).map((tech) => (
    <Fragment key={tech}>
      <h4>h4-{tech}</h4>

      {buildObjBasedDocument.current[monoTitle].tests[tech].map((test) => (
        <AddTest
          // key={Math.random()}
          handleTestFields={handleTestFields}
          monoTitle={monoTitle}
          tech={tech}
          test={test}
          substanceDoc={document}
        />
      ))}
    </Fragment>
      )
      )}
    </div>
      ))}
    {error && <p>{error}</p>}
  </div>
    </>
  );
}