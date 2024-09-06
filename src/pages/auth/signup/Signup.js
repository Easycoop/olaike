import { useState } from "react";
import "./signup.css";
import logo from "../../../assets/icons/logo.png";
import Input from "../../../components/ui/form-elements/input";
import Button from "../../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="signup">
      <div className="signup__start">
        <div className="signup__start__wrap">
          <h3>Sign up</h3>
          <form onSubmit={handleSubmit}>
            <Input
              className="signup__input"
              type="text"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              className="signup__input"
              type="text"
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
            <Input
              className="signup__input"
              type="text"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input
              className="signup__input"
              type="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              className="signup__input"
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              className="signup__input"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
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
            >
              Create account
            </Button>
          </form>
        </div>
      </div>
      <div className="signup__end">
        <h1>OLAIKE</h1>
        <h5>TRANSFORMING LIVES</h5>
      </div>
    </div>
  );
}

export default Signup;
