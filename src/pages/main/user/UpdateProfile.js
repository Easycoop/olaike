import { useEffect, useState, useContext } from "react";
// import "./signup.css";
// import logo from "../../../assets/icons/logo_text.svg";
import Input from "../../../components/ui/form-elements/input";
import Button from "../../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";
import { useUpdateUserProfile } from "../../../redux/actions/userAction";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { ClipLoader } from "react-spinners";
import Select from "../../../components/ui/form-elements/select";
import { ConfigContext } from "../../../context/ConfigProvider";
import {useSelector} from "react-redux";
import {runValidation} from "../../../utils/buchi";
import { genders } from "../../../utils/generic";
import { min } from "moment";




const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const update = useUpdateUserProfile();
  const navigate = useNavigate();
  const { config } = useContext(ConfigContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState();

  
  
  
  const [formData, setFormData] = useState({
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone ? `0${user.phone}` :  "",
    gender: user?.gender ?? "",
    address: user?.address ?? "",
  });

  const validateUpdateForm = async () => {
      const validationData = [
          {
              input: { value: formData.firstName, field: "firstName", type: "text" },
              rules: { required: true },
          },
          {
              input: { value: formData.lastName, field: "lastName", type: "text" },
              rules: { required: true },
          },
          {
              input: { value: formData.gender, field: "gender", type: "text" },
              rules: { required: true },
          },
          {
              input: { value: formData.address, field: "address", type: "text" },
              rules: { required: true, min_length: 10 },
          },
          
      ];
      
          
        const validate = await runValidation(validationData);
        // console.log(validate)
    
        if (validate?.status === false) {
          setValidationErrors(validate.errors);
        } else {
          handleSubmit()
        }
    }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setValidationErrors();
      const response = await update(formData);
      
      if(response.errors ){
        // console.log();
        setValidationErrors(response.errors)
      }
      if (response.payload?.status === 'success') {
        setErrorMessage("");
        toastManager.addToast({
          message: `profile updated`,
          type: "success",
        });
        // navigate("/signup-complete");
        navigate("/main/dashboard");
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
    <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Section (light background, fixed height) */}
      <div className="w-full md:w-[50%] bg-gray-50 relative overflow-hidden">
        {/* Mobile Top Logo */}
        <div className="md:hidden w-full bg-[#003399] py-4  flex justify-center">
          <img
            src={config?.logos?.text_logo_white}
            alt="Logo"
            className="h-8 object-contain"
          />
        </div>
        <hr className="md:hidden border-t border-white w-2/3 mx-auto mt-2" />
      </div>

      {/* Right Section (blue background, fixed height) */}
      <div className="hidden md:flex w-[50%] h-screen bg-[#003399] items-center justify-center p-10 overflow-hidden">
        <div className="w-[34%] ml-[17%] flex justify-center">
          <img
            src={config?.logos?.text_logo_white}
            alt="Logo"
            className="h-8 object-contain ml-5"
          />
        </div>
        
      </div>

      {/* Floating Signup Card (fixed height with scrollbar) */}
      <div className="w-full md:w-[60%] px-4 md:absolute md:left-[8%] md:top-[5%] z-10 scrollable-card" >
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 h-[90vh] lg:overflow-hidden overflow-y-scroll">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003399] mb-6 text-center">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <Input
              required
              important
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"firstName"}
            />
            
            <Input
              required
              important
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"lastName"}
            />

            <Input
              disabled
              readonly
              important
              type="email"
              label="Email Address"
              name="email"
              value={formData.email}
            />
           
            <Input
              disabled
              readonly
              important
              type="tel"
              label="Phone Number"
              name="phone"
              value={formData.phone}
            />
            
            <Select
              required
              important
              label="Gender"
              name="gender"
              options={genders}
              value={formData.gender}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"gender"}
            />

            <Input
              important
              type="text"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"address"}
            />
            

            {/* Error Message */}
            {errorMessage && (
              <div className="col-span-full">
                <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
              </div>
            )}

            {/* Login Switch */}
            <div className="col-span-full text-sm mb-4 text-center">
              Already have an account?{" "}
              <b
                className="text-[#003399] cursor-pointer"
                onClick={() => navigate("/")}
              >
                Login
              </b>
            </div>

            {/* Submit Button */}
            <div className="col-span-full">
              <Button
                type="button"
                className="w-full bg-[#ED6E0A] hover:bg-[#d95c05] text-white py-2 rounded-md transition"
                disabled={loading}
                onClick={validateUpdateForm}
              >
                {loading ? <ClipLoader color="#fff" size={20} /> : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      
    </div>

    
  );

}

export default UpdateProfile;
