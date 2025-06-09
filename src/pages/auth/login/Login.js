import { useState, useContext, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import "./login.css";
import login_image from "../../../assets/images/auth/login-image-1.png";
// import logo from "../../../assets/icons/logo_icon_main.svg";
import Input from "../../../components/ui/form-elements/input";
import Button from "../../../components/ui/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../../redux/actions/authActions";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { ConfigContext } from "../../../context/ConfigProvider";

function Login() {
  const login = useLogin();
  const navigate = useNavigate();
  const { config, fetchConfig } = useContext(ConfigContext);

  const [formData, setFormData] = useState({
    email: "nnebuchiosigbo340+1000@gmail.com",
    password: "Buchess#2024",
  });
  
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Email or password cannot be blank");
      return;
    }

    try {
      setLoading(true);
      const response = await login({
        email: formData.email,
        password: formData.password,
      });
      if (response?.status === true || response?.status === "success") {
        if(response?.status === 'success' && response.action === 'otp'){
          navigate(`/otp?email=${formData.email}&purpose=login`);
          return
        }
        setErrorMessage("");

        toastManager.addToast({
          message: "Successful login",
          type: "success",
        });
        navigate("/main/dashboard");
        return;
      } else {
        setErrorMessage(response?.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchConfig();
  }, []);

  return (
    <div className="login">
      <section className="login__main">
        <div className="login__main__start">
          <div className="login__main__start__wrap">
            <img src={config?.logos?.main_icon} alt="logo" />
            <h3>Sign in</h3>
            {/* <h5>to accesss dashboard</h5> */}
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                label="Email"
                name="email"
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
              {errorMessage && <p className="error__message">{errorMessage}</p>}
              <span className="login__main__start__switch">
                <p>
                  Don't have an account?{" "}
                  <b onClick={() => navigate("signup")}>Signup</b>
                </p>
                <p>
                  <b><Link to="/forgot-password">Forgot Password</Link></b>
                </p>
              </span>
              <Button
                type="submit"
                typeOf="success"
                disabled={loading}
                style={{ wemailth: "100%" }}
              >
                {loading ? (
                  <ClipLoader color="#fff" size={20} />
                ) : (
                  "Sign me in "
                )}
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
