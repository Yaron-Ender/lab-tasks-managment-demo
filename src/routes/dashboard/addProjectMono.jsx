import { useDocument } from "../../hooks/useDocument";

export default function AddProjectMono({ projName }) {
const { error, document } = useDocument("substances", projName);
console.log(error, document);
  return (
      <div>
    {projName&&<h2>{projName}</h2>}
    {document && Object.keys(document).map()}
      {error && <p>{error}</p>}
    </div>
  );
}