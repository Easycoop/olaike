import { useState } from "react";
import Switch from "react-switch";
import image1 from "../../../assets/images/main/profile-image.jpg";
import { useNavigate } from "react-router-dom";
import "./loan.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {
  useGetLoanApplication,
  useSaveChanges,
  useSubmitLoan,
} from "../../../redux/actions/loanAction";
import { ClipLoader } from "react-spinners";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { useDispatch, useSelector } from "react-redux";

function Loan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const getLoanApplication = useGetLoanApplication();
  const submitLoan = useSubmitLoan();
  const saveChanges = useSaveChanges();
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState("");

  const [formData, setFormData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    gender: null,
    dob: null,
    address: null,
    employmentStatus: null,
    employerName: null,
    jobTitle: null,
    employmentAddress: null,
    nokFirstName: null,
    nokLastName: null,
    nokEmail: null,
    nokPhone: null,
    nokRelationship: null,
    bvn: null,
    verificationDocument: null,
    guarantorFirstName: null,
    guarantorLastName: null,
    guarantorEmail: null,
    guarantorPhone: null,
    guarantorOccupation: null,
    guarantorOfficeAddress: null,
    guarantorHomeAddress: null,
    userId: user.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [select, setSelect] = useState({
    select1: true,
    select2: false,
    select3: false,
    select4: false,
    select5: false,
    select6: false,
    select7: false,
    select8: false,
    select9: false,
  });
  const closeAll = () => {
    setSelect({
      select1: false,
      select2: false,
      select3: false,
      select4: false,
      select5: false,
      select6: false,
      select7: false,
      select8: false,
      select9: false,
    });
  };

  const handleSelect = (option) => {
    closeAll();
    setSelect((prevState) => ({
      ...prevState,
      [option]: true,
    }));
  };

  const handleNext = (option) => {
    closeAll();
    setSelect((prevState) => ({ ...prevState, [option]: true }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await submitLoan(formData);
      if (response?.payload.status === "success") {
        setErrorMessage("");
        toastManager.addToast({
          message: "Succesful loan application",
          type: "success",
        });
        navigate("/main/loan-completed");
      } else {
        setErrorMessage(response.message);
        toastManager.addToast({
          message: response?.payload?.message,
          type: "error",
        });
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const response = await saveChanges(formData);
      if (response?.payload.status === "success") {
        setErrorMessage("");
        toastManager.addToast({
          message: "Changes saved succesfully",
          type: "success",
        });
      } else {
        setErrorMessage(response.message);
        toastManager.addToast({
          message: "Could not save changes",
          type: "error",
        });
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLoanApplication = async () => {
    setLoading(true);
    try {
      const response = await getLoanApplication(user.loanApplicationId);
      if (response?.payload.status === "success") {
        setErrorMessage("");
        setFormData(response.payload.data.application);
        // dispatch({ type: "UPDATE_USER", payload: response.payload.data.user });
      } else {
        setErrorMessage(response?.message);
      }
    } catch (error) {
      setErrorMessage(error?.response?.message);
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    handleGetLoanApplication();
  }, []);

  return (
    <div className="loans">
      <section className="account__notifications__section__two">
        <div className="loan__header__wrap">
          <div className="account__notifications__select__div">
            <button
              className={
                select.select1
                  ? "account__notifications__select selected"
                  : "account__notifications__select"
              }
              onClick={() => handleSelect("select1")}
            >
              Profile
            </button>
            <button
              className={
                select.select2
                  ? "account__notifications__select selected"
                  : "account__notifications__select"
              }
              onClick={() => handleSelect("select2")}
            >
              Employment Details
            </button>
            <button
              className={
                select.select3
                  ? "account__notifications__select selected"
                  : "account__notifications__select"
              }
              onClick={() => handleSelect("select3")}
            >
              Next of Kin
            </button>
            <button
              className={
                select.select4
                  ? "account__notifications__select selected"
                  : "account__notifications__select"
              }
              onClick={() => handleSelect("select4")}
            >
              Documents
            </button>
            <button
              className={
                select.select5
                  ? "account__notifications__select selected"
                  : "account__notifications__select"
              }
              onClick={() => handleSelect("select5")}
            >
              Guarantor
            </button>

            {/* <button
              className={
                select.select6
                  ? "account__notifications__select selected"
                  : "account__notifications__select"
              }
              onClick={() => handleSelect("select6")}
            >
              Notifications
            </button> */}
            {/* <button
              className={
                select.select7
                  ? "account__notifications__select selected"
                  : "account__notifications__select"
              }
              onClick={() => handleSelect("select7")}
            >
              Security
            </button> */}
          </div>
        </div>
      </section>

      <section className="">
        {select.select1 && (
          <div className="loan__segment">
            <div className="loan__segment__profile">
              <img src={image1} alt="logo" />
            </div>
            <span className="loan__segment__wrap">
              <span className="loan__form__set">
                <label className="loan__label">FIRST NAME</label>
                <input
                  className="loan__input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData?.firstName}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">LAST NAME</label>
                <input
                  className="loan__input"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData?.lastName}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">EMAIL ADDRESS</label>
                <input
                  className="loan__input"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData?.email}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">PHONE NUMBER</label>
                <input
                  className="loan__input"
                  type="number"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData?.phone}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">GENDER</label>
                <select
                  className="loan__select"
                  name="gender"
                  value={formData?.gender}
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </span>
              <span className="loan__form__set">
                <label className="loan__label">DATE OF BIRTH</label>
                <input
                  className="loan__input"
                  type="date"
                  name="dob"
                  placeholder="DD/MM/YY"
                  value={formData?.dob}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">YOUR ADDRESS</label>
                <input
                  className="loan__input"
                  type="text"
                  name="address"
                  placeholder="e.g Port Harcourt, Rivers State"
                  value={formData?.address}
                  onChange={handleChange}
                />
              </span>
            </span>
            <div className="loan__segment__foot">
              <button
                className="loan__foot__button save"
                onClick={() => handleSaveChanges()}
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader color="#fff" size={20} />
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                className="loan__foot__button next"
                onClick={() => handleNext("select2")}
              >
                Next <BsArrowRight />
              </button>
            </div>
          </div>
        )}

        {select.select2 && (
          <div className="loan__segment">
            <span className="loan__segment__wrap">
              <span className="loan__form__set">
                <label className="loan__label">EMPLOYMENT STATUS</label>
                <select
                  className="loan__select"
                  name="employmentStatus"
                  value={formData?.employmentStatus}
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  <option value="employed">Employed</option>
                  <option value="selfEmployed">Self-employed</option>
                  <option value="unemployed">Unemployed</option>
                </select>
              </span>
              <span className="loan__form__set">
                <label className="loan__label">COMPANY/EMPLOYER'S NAME</label>
                <input
                  className="loan__input"
                  type="text"
                  name="employerName"
                  placeholder="Enter Employer Name"
                  value={formData?.employerName}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">JOB TITLE</label>
                <input
                  className="loan__input"
                  type="text"
                  name="jobTitle"
                  placeholder="Enter your job title"
                  value={formData?.jobTitle}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">EMPLOYMENT ADDRESS</label>
                <input
                  className="loan__input"
                  type="text"
                  name="employmentAddress"
                  placeholder="Enter your address"
                  value={formData?.employmentAddress}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </span>
            </span>
            <div className="loan__segment__foot">
              <button
                className="loan__foot__button save"
                onClick={() => handleSaveChanges()}
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader color="#fff" size={20} />
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                className="loan__foot__button back"
                onClick={() => handleNext("select1")}
              >
                <BsArrowLeft /> Previous
              </button>
              <button
                className="loan__foot__button next"
                onClick={() => handleNext("select3")}
              >
                Next <BsArrowRight />
              </button>
            </div>
          </div>
        )}

        {select.select3 && (
          <div className="">
            <div className="loan__segment">
              <span className="loan__segment__wrap">
                <span className="loan__form__set">
                  <label className="loan__label">FIRST NAME</label>
                  <input
                    className="loan__input"
                    type="text"
                    placeholder=" Name"
                    name="nokFirstName"
                    value={formData?.nokFirstName}
                    onChange={handleChange}
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">LAST NAME</label>
                  <input
                    className="loan__input"
                    type="text"
                    placeholder="Last Name"
                    name="nokLastName"
                    value={formData?.nokLastName}
                    onChange={handleChange}
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">EMAIL ADDRESS</label>
                  <input
                    className="loan__input"
                    type="email"
                    placeholder="Email Address"
                    name="nokEmail"
                    value={formData?.nokEmail}
                    onChange={handleChange}
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">PHONE NUMBER</label>
                  <input
                    className="loan__input"
                    type="number"
                    placeholder="Phone Number"
                    name="nokPhone"
                    value={formData?.nokPhone}
                    onChange={handleChange}
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">
                    RELATIONSHIP WITH NEXT OF KIN
                  </label>
                  <select
                    className="loan__select"
                    name="nokRelationship"
                    value={formData?.nokRelationship}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Child">Child</option>
                    <option value="Friend">Friend</option>
                  </select>
                </span>
              </span>
              <div className="loan__segment__foot">
                <button
                  className="loan__foot__button save"
                  onClick={() => handleSaveChanges()}
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader color="#fff" size={20} />
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  className="loan__foot__button back"
                  onClick={() => handleNext("select2")}
                >
                  <BsArrowLeft /> Previous
                </button>
                <button
                  className="loan__foot__button next"
                  onClick={() => handleNext("select4")}
                >
                  Next <BsArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {select.select4 && (
          <div className="loan__segment">
            <span className="loan__form__set">
              <label className="loan__label">BVN</label>
              <input
                className="loan__input"
                type="number"
                placeholder="Bank Verification Number"
                name="bvn"
                value={formData?.bvn}
                onChange={handleChange}
              />
            </span>
            <span className="loan__form__set">
              <label className="loan__label">ID VERIFICATION</label>
              <p className="loan__label__secondary">
                Please upload a means of identification so we can verify who you
                are
              </p>
              <button
                className="loan__button"
                style={{ backgroundColor: "#FDC30B", color: "#000" }}
              >
                Verify my identity
              </button>
            </span>
            <div className="loan__segment__foot">
              <button
                className="loan__foot__button save"
                onClick={() => handleSaveChanges()}
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader color="#fff" size={20} />
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                className="loan__foot__button back"
                onClick={() => handleNext("select3")}
              >
                <BsArrowLeft /> Previous
              </button>
              <button
                className="loan__foot__button next"
                onClick={() => handleNext("select5")}
              >
                Next <BsArrowRight />
              </button>
            </div>
          </div>
        )}

        {select.select5 && (
          <div className="loan__segment">
            <span className="loan__segment__wrap">
              <span className="loan__form__set">
                <label className="loan__label">GUARANTOR'S FIRST NAME</label>
                <input
                  className="loan__input"
                  type="text"
                  placeholder="Enter Guarantor's First Name"
                  name="guarantorFirstName"
                  value={formData?.guarantorFirstName}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">GUARANTOR'S LAST NAME</label>
                <input
                  className="loan__input"
                  type="text"
                  placeholder="Enter Guarantor's Last Name"
                  name="guarantorLastName"
                  value={formData?.guarantorLastName}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">GUARANTOR'S EMAIL</label>
                <input
                  className="loan__input"
                  type="email"
                  placeholder="Enter Guarantor's Email"
                  name="guarantorEmail"
                  value={formData?.guarantorEmail}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">GUARANTOR'S PHONE</label>
                <input
                  className="loan__input"
                  type="number"
                  placeholder="Enter Guarantor's Phone Number"
                  name="guarantorPhone"
                  value={formData?.guarantorPhone}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">GUARANTOR'S OCCUPATION</label>
                <input
                  className="loan__input"
                  type="text"
                  placeholder="Enter Guarantor's Occupation"
                  name="guarantorOccupation"
                  value={formData?.guarantorOccupation}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">
                  GUARANTOR'S OFFICE ADDRESS
                </label>
                <input
                  className="loan__input"
                  type="text"
                  placeholder="Enter Office Address"
                  name="guarantorOfficeAddress"
                  value={formData?.guarantorOfficeAddress}
                  onChange={handleChange}
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">GUARANTOR'S HOME ADDRESS</label>
                <input
                  className="loan__input"
                  type="text"
                  placeholder="Enter Home Address"
                  name="guarantorHomeAddress"
                  value={formData?.guarantorHomeAddress}
                  onChange={handleChange}
                />
              </span>
            </span>
            <div className="loan__segment__foot">
              <button
                className="loan__foot__button save"
                onClick={() => handleSaveChanges()}
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader color="#fff" size={20} />
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                className="loan__foot__button back"
                onClick={() => handleNext("select4")}
              >
                <BsArrowLeft /> Previous
              </button>
              <button
                className="loan__foot__button submit"
                onClick={handleSubmit}
              >
                {loading ? <ClipLoader color="#fff" size={20} /> : "Submit"}
              </button>
            </div>
          </div>
        )}
        {/* {select.select6 ? (
          <div className="loan__notification loan__segment">
            <section className="loan__notification__block">
              <h3>Notifications related to you and your space</h3>
              <p>
                Space, booking, payment and other notifications related to your
                space
              </p>
              <Switch
                onColor={"#FDC30B"}
                onChange={() => {
                  setChecked(!checked);
                }}
                checked={checked}
                className="react-switch"
              />
            </section>
            <section className="loan__notification__block">
              <h3>Notifications related to you and your space</h3>
              <p>
                Space, booking, payment and other notifications related to your
                space
              </p>
              <Switch
                onColor={"#FDC30B"}
                onChange={() => {
                  setChecked2(!checked2);
                }}
                checked={checked2}
                className="react-switch"
              />
            </section>
            <section className="loan__notification__block">
              <h3>Notifications related to you and your space</h3>
              <p>
                Space, booking, payment and other notifications related to your
                space
              </p>
              <Switch
                onColor={"#FDC30B"}
                onChange={() => {
                  setChecked3(!checked3);
                }}
                checked={checked3}
                className="react-switch"
              />
            </section>
            <div className="loan__segment__foot">
              <button
                className="loan__foot__button"
                onClick={() => navigate("/main/loan-completed")}
              >
                Apply
              </button>
            </div>
          </div>
        ) : (
          <></>
        )} */}
        {select.select7 ? <div className="">select 7</div> : <></>}
      </section>
    </div>
  );
}
export default Loan;
