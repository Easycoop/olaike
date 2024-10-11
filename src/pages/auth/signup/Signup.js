import { useState } from "react";
import "./signup.css";
import logo from "../../../assets/icons/logo-secondary-color1.png";
import Input from "../../../components/ui/form-elements/input";
import Button from "../../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../../redux/actions/authActions";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { ClipLoader } from "react-spinners";
import Select from "../../../components/ui/form-elements/select";

function Signup() {
  const register = useRegister();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [societies, setSocieties] = useState([
    { value: null, label: "Select a society" },
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    group: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await register(formData);

      if (response?.status === 200 || response?.status === "success") {
        setErrorMessage("");
        toastManager.addToast({
          message: `Succesful registration`,
          type: "success",
        });
        navigate("/signup-complete");
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup__start">
        <div className="signup__start__wrap">
          <h3>Sign up</h3>
          <form onSubmit={handleSubmit}>
            <Input
              required
              className="signup__input"
              type="text"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              required
              className="signup__input"
              type="text"
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
            <Input
              required
              className="signup__input"
              type="text"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input
              required
              className="signup__input"
              type="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              required
              className="signup__input"
              type="number"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Select
              required
              label="Society"
              name="group"
              className="signup__input"
              options={societies}
              onChange={handleChange}
            />
            <Input
              required
              className="signup__input"
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              required
              className="signup__input"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <p className="signup__error">{errorMessage}</p>
            <span className="signup__start__switch">
              <p>
                Already have an account?
                <b className="ml-1" onClick={() => navigate("/")}>
                  Login
                </b>
              </p>
            </span>

            <Button
              type="submit"
              typeOf="success"
              className="signup__create__button"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </div>
      </div>
      <div className="signup__end">
        <img src={logo} alt="logo" />
        <h5>TRANSFORMING LIVES</h5>
      </div>
    </div>
  );
}

export default Signup;
