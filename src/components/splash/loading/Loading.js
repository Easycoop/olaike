import "./loading.css";
import { ClipLoader } from "react-spinners";

function Loading() {
  return (
    <div className="loading">
      <ClipLoader color="#669933" size={30} />
    </div>
  );
}

export default Loading;
