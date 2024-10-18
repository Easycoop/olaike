import "./no-result.css";
import image from "../../../assets/images/main/not-found.jpg";

function NoResult({
  header = "No Results Found", //default value
  content = "No results were found for this content", //default value
}) {
  return (
    <div className="no__result">
      <img src={image} alt="not found" />
      <h1>{header}</h1>
      <p>{content}</p>
    </div>
  );
}

export default NoResult;
