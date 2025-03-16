import "./signup-complete.css";
import { useNavigate, Link } from "react-router-dom";
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
        <p>Proceed to KYC to generate your membership ID</p>
        {/* <Link to="" >Proceed to KYC</Link> */}
        <Button
          type="button"
          typeOf="primary"
          onClick={() => navigate("/kyc")}
          style={{ wemailth: "100%", marginTop:"20px" }}
        
        >
          Proceed to KYC
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
