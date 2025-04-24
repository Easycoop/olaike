import "./signup-complete.css";
import { useNavigate } from "react-router-dom";
import signupComplete from "../../../assets/images/auth/signup-complete.png";
import logo from "../../../assets/icons/logo-secondary-color1.png";
import Button from "../../../components/ui/button/Button";

function SignupComplete() {
  const navigate = useNavigate();

  return (
    <div className="signup">
      <div className="signup__complete__start">
        <img src={signupComplete} className="" />
        <h4>Registration request sent</h4>
        <p>Your membership ID will be sent within 24hrs</p>
        <Button
          type="button"
          typeOf="primary"
          onClick={() => navigate("/")}
          style={{ wemailth: "100%", marginTop:"20px" }}
        
        >
          Proceed to login
        </Button>
      </div>
      <div className="signup__complete__end">
        <img src={logo} alt="logo" />
        <h5>TRANSFORMING LIVES</h5>
      </div>
    </div>
  );
}

export default SignupComplete;
