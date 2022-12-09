import { useDocument } from "../../hooks/useDocument";
import cancel from '../../asstes/cancel.svg';
import AddTest from "./addTest";
import { useEffect,Fragment } from "react";
export default function AddProjectMono({ projName, handleTestFields }) {
  const { error, document } = useDocument("substances", projName);
  useEffect(() => {
    if (document) {
      Object.keys(document).forEach((m) => {
    //handleTestField function is get calles also from AddTest,because that we pass empt string 
       handleTestFields(m,'') 
      });
    }
  }, [document]);
  const handleClick = ()=>{
    
  }
  return (
    <>
    {projName && <h2>{projName}</h2>}
    <div
      className="projName-and-select-mono-container"
      style={{ background: "lightpink" }}
    >
      {document &&
        Object.keys(document).map((monoTitle) => (
          <div
            style={{
              background: "lightgreen",
              padding: "20px 0",
              border: "1px solid black",
            }}
            key={document[monoTitle].id}
            className="assign-mono-box"
          >
      <h3>
        {monoTitle}
        <img className="cancel-icon" width={20} src={cancel} />
      </h3>
      {/* try to add the img as content to h3 */}
      {Object.keys(document[monoTitle].tests).map((tech) => (
        <Fragment key={tech}>
          <h4>h4-{tech}</h4>

          {document[monoTitle].tests[tech].map((test) => (
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
            ))}
          </div>
        ))}
      {error && <p>{error}</p>}
    </div>
    
    </>
  );
}