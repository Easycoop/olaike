import { useState } from "react";
import Switch from "react-switch";
import image1 from "../../../assets/images/main/profile-image.jpg";
import { useNavigate } from "react-router-dom";
import "./loan.css";

function Loan() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

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

            <button
              className={
                select.select6
                  ? "account__notifications__select selected"
                  : "account__notifications__select"
              }
              onClick={() => handleSelect("select6")}
            >
              Notifications
            </button>
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
        {select.select1 ? (
          <div className="">
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
                    placeholder=" Name"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">LAST NAME</label>
                  <input
                    className="loan__input"
                    type="text"
                    placeholder="Last Name"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">EMAIL ADDRESS</label>
                  <input
                    className="loan__input"
                    type="email"
                    placeholder="Email Address"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">PHONE NUMBER</label>
                  <input
                    className="loan__input"
                    type="number"
                    placeholder="Phone Number"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">GENDER</label>
                  <select className="loan__select">
                    <option value="">Select an option</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">DATE OF BIRTH</label>
                  <input
                    className="loan__input"
                    type="date"
                    placeholder="DD/MM/YY"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">YOUR ADDRESS</label>
                  <input
                    className="loan__input"
                    type="text"
                    placeholder="e.g Port Harcourt, Rivers State"
                  />
                </span>
              </span>
              <div className="loan__segment__foot">
                <button className="loan__foot__button">Save Changes</button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {select.select2 ? (
          <div className="loan__segment">
            <span className="loan__segment__wrap">
              <span className="loan__form__set">
                <label className="loan__label">EMPLOYMENT STATUS</label>
                <select className="loan__select">
                  <option value="">Select an option</option>
                  <option value="1">Type 1</option>
                  <option value="2">Type 2</option>
                </select>
              </span>
              <span className="loan__form__set">
                <label className="loan__label">COMPANY/EMPLOYER'S NAME</label>
                <input
                  className="loan__input"
                  type="text"
                  placeholder="Enter Employer Name"
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">JOB TITLE</label>
                <select className="loan__select">
                  <option value="">Select an option</option>
                  <option value="1">Type 1</option>
                  <option value="2">Type 2</option>
                </select>
              </span>
              <span className="loan__form__set">
                <label className="loan__label">JOB TITLE</label>
                <input
                  className="loan__input"
                  type="text"
                  placeholder="Enter your job title"
                />
              </span>
              <span className="loan__form__set">
                <label className="loan__label">EMPLOYMENT ADDRESS</label>
                <input
                  className="loan__input"
                  type="text"
                  placeholder="Enter your address"
                  style={{ width: "100%" }}
                />
              </span>
            </span>
            <div className="loan__segment__foot">
              <button className="loan__foot__button">Save Changes</button>
            </div>
          </div>
        ) : (
          <></>
        )}
        {select.select3 ? (
          <div className="">
            <div className="loan__segment">
              <span className="loan__segment__wrap">
                <span className="loan__form__set">
                  <label className="loan__label">FIRST NAME</label>
                  <input
                    className="loan__input"
                    type="text"
                    placeholder=" Name"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">LAST NAME</label>
                  <input
                    className="loan__input"
                    type="text"
                    placeholder="Last Name"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">EMAIL ADDRESS</label>
                  <input
                    className="loan__input"
                    type="email"
                    placeholder="Email Address"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">PHONE NUMBER</label>
                  <input
                    className="loan__input"
                    type="number"
                    placeholder="Phone Number"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">
                    RELATIONSHIP WITH NEXT OF KIN
                  </label>
                  <select className="loan__select">
                    <option value="">Select an option</option>
                    <option value="1">Father</option>
                    <option value="1">Mother</option>
                    <option value="1">Brother</option>
                    <option value="2">Sister</option>
                    <option value="2">Child</option>
                    <option value="2">Friend</option>
                  </select>
                </span>
              </span>
              <div className="loan__segment__foot">
                <button className="loan__foot__button">Save Changes</button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {select.select4 ? (
          <div className="loan__segment">
            <span className="loan__form__set">
              <label className="loan__label">BVN</label>
              <input
                className="loan__input"
                type="text"
                placeholder="Bank Verification Number"
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
              <button className="loan__foot__button">Save Changes</button>
            </div>
          </div>
        ) : (
          <></>
        )}
        {select.select5 ? (
          <div className="">
            <div className="loan__segment">
              <span className="loan__segment__wrap">
                <span className="loan__form__set">
                  <label className="loan__label">FIRST NAME</label>
                  <input
                    className="loan__input"
                    type="text"
                    placeholder=" Name"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">LAST NAME</label>
                  <input
                    className="loan__input"
                    type="text"
                    placeholder="Last Name"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">EMAIL ADDRESS</label>
                  <input
                    className="loan__input"
                    type="email"
                    placeholder="Email Address"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">PHONE NUMBER</label>
                  <input
                    className="loan__input"
                    type="number"
                    placeholder="Phone Number"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">GUARANTOR'S OCCUPATION</label>
                  <input
                    className="loan__input"
                    type="text"
                    placeholder="e.g Port Harcourt, Rivers State"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">
                    GUARANTOR'S OFFICE ADDRESS
                  </label>
                  <input
                    className="loan__input"
                    type="text"
                    placeholder="Enter Address"
                  />
                </span>
                <span className="loan__form__set">
                  <label className="loan__label">
                    GUARANTOR'S HOME ADDRESS
                  </label>
                  <input
                    className="loan__input"
                    type="text"
                    placeholder="Enter Address"
                  />
                </span>
              </span>
              <div className="loan__segment__foot">
                <button className="loan__foot__button">Save Changes</button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {select.select6 ? (
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
                onClick={() => navigate("/loan-completed")}
              >
                Apply
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        {select.select7 ? <div className="">select 7</div> : <></>}
      </section>
    </div>
  );
}
export default Loan;
