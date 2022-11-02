import { useParams } from "react-router-dom";
import { useDocument } from '../../hooks/useDocument';
import MonographList from "./MonographList";
const Substance = () => {
  const { id } = useParams();
  const { error, document } = useDocument("substances", id);
  return (
    <div className="substance-container">
      {!error && (
        <>
      <MonographList document={document} id={id} />
        </>
      )}
    </div>
  );
};

export default Substance;