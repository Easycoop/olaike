import { useState } from "react";
import "./login.css";
import login_image from "../../../assets/images/auth/login-image-1.png";
import logo from "../../../assets/icons/logo.png";
import Input from "../../../components/ui/form-elements/input";
import Button from "../../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../redux/actions/authActions";
import toastManager from "../../../components/ui/toast/ToasterManager";

function Login() {
  const login = useLogin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    navigate("/main/dashboard");

    e.preventDefault();

    try {
      const response = await login(formData.email, formData.password);
      if (response.status === true || response.status === "success") {
        setErrorMessage("");

        toastManager.addToast({
          message: "Successful login",
          type: "success",
        });
        navigate("/main/dashboard");
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    }
  };

  return (
    <div className="login">
      <section className="login__main">
        <div className="login__main__start">
          <div className="login__main__start__wrap">
            <img src={logo} alt="logo" />
            <h3>Sign in</h3>
            {/* <h5>to accesss dashboard</h5> */}
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                label="Application/Membership Number"
                name="id"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="login__main__start__switch">
                <p>
                  Don't have an account?{" "}
                  <b onClick={() => navigate("signup")}>Signup</b>
                </p>
                <p>
                  <b>Forgotten password</b>
                </p>
              </span>
              <Button type="submit" typeOf="success" style={{ width: "100%" }}>
                Sign me in
              </Button>
            </form>
          </div>
        </div>
        <div className="login__main__end">
          <img src={login_image} alt="inovation, empowerment and equality" />
          <div className="login__main__end__info">
            <h4>Six GEO-POLITICAL Zones and Code</h4>
            <span className="login__main__end__info__text__wrap">
              <span>OIOC 01 - North Central</span>
              <span>0IOC 02 - South West</span>
              <span>OIOC 03 - North North</span>
              <span>0IOC 04 - South East</span>
              <span>OIOC 05 - North East</span>
              <span>0IOC 06 - South South</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
