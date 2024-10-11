import "./no-result.css";
import image from "../../../assets/images/38477149_8638996.jpg";

function NoResult({
  header = "No Results Found", //default value
  content = "No results were found for this content", //default value
}) {
  return (
    <div className="no__result">
      <img src={image} />
      <h1>{header}</h1>
      <p>{content}</p>
    </div>
  );
}

export default NoResult;
