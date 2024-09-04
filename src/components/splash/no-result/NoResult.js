import "./no-result.css";

function NoResult({
  header = "No Results Found", //default value
  content = "No results were found for this content", //default value
}) {
  return (
    <div className="no__result">
      <h1>{header}</h1>
      <p>{content}</p>
    </div>
  );
}

export default NoResult;
