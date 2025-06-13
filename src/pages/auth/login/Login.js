import React, { useState, useContext, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import Input from "../../../components/ui/form-elements/input";
import Button from "../../../components/ui/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../../redux/actions/authActions";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { ConfigContext } from "../../../context/ConfigProvider";
import loginImage from "../../../assets/images/auth/login-image-1.png";

export default function Login() {
  const login = useLogin();
  const navigate = useNavigate();
  const { config, fetchConfig } = useContext(ConfigContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleChange = (e) =>
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("Email or password cannot be blank");
      return;
    }
    setLoading(true);
    try {
      const res = await login(formData);
      if (res?.status === true || res?.status === "success") {
        setErrorMessage("");
        toastManager.addToast({ message: "Successful login", type: "success" });
        navigate("/main/dashboard");
      } else {
        setErrorMessage(res?.message);
      }
    } catch (err) {
      setErrorMessage(err.response?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#003399] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Form */}
          <div className="p-6 md:p-10">
            <img
              src={config?.logos?.text_logo_black}
              alt="Logo"
              className="h-6 mb-4 object-contain"
            />
            <h2 className="text-2xl font-semibold text-gray-800 ">Sign in</h2>
            <p className="text-gray-500 mb-4 text-sm">to access dashboard!</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                required
                type="text"
                label="Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="#4fRF DPPN"
              />

              <Input
                required
                type="password"
                label="Password *"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              {errorMessage && (
                <p className="text-red-600 text-xs">{errorMessage}</p>
              )}

              <div className="flex flex-col lg:flex-row justify-between text-sm text-gray-600">
                <span className="whitespace-nowrap">
                  Don’t have an account?{' '}
                  <Link to="/signup" className="text-[#6699FF] hover:underline">
                    Signup
                  </Link>
                </span>
                <span className="whitespace-nowrap">
                  <Link to="/forgot-password" className="text-[#6699FF] hover:underline">
                    Forgotten password
                  </Link>
                </span>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#ED6E0A] hover:bg-[#d95c05] text-white py-2 rounded-md mt-4 text-sm transition"
                disabled={loading}
              >
                {loading ? <ClipLoader color="#fff" size={16} /> : 'Sign me in'}
              </Button>
            </form>
          </div>

          {/* Divider & Right: Image & Info */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gray-50 p-6 md:p-10 space-y-4 border-l border-gray-200">
            <img
              src={loginImage}
              alt="Innovation, Empowerment, Equality"
              className="h-48 object-contain mb-2"
            />
            <h4 className="text-sm font-medium text-gray-800 mb-2">
              Six GEO-POLITICAL Zones and Code
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-[9px]">
              <span className="px-1 py-1 bg-red-500 text-white rounded">01. OIOC 01 – North Central</span>
              <span className="px-1 py-1 bg-[#ED6E0A] text-white rounded">02. OIOC 02 – South West</span>
              <span className="px-1 py-1 bg-[#003399] text-white rounded">03. OIOC 03 – North East</span>
              <span className="px-1 py-1 bg-[#6699FF] text-white rounded">04. OIOC 04 – South East</span>
              <span className="px-1 py-1 bg-[#111827] text-white rounded">05. OIOC 05 – North North</span>
              <span className="px-1 py-1 bg-gray-400 text-white rounded">06. OIOC 06 – South South</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
