import "./not-found.css";
import image from "../../../assets/images/main/8030430_3828537.jpg";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not__found">
      <img src={image} alt="" />
      <h1>404 Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button className="not__found__button" onClick={() => navigate("/")}>
        Sign in
      </button>
    </div>
  );
}

export default NotFound;
