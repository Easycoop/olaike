import { useState } from "react";
import "./loan.css";

function Loan() {
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
          <button
            className={
              select.select7
                ? "account__notifications__select selected"
                : "account__notifications__select"
            }
            onClick={() => handleSelect("select7")}
          >
            Security
          </button>
        </div>
      </section>

      <section className="">
        {select.select1 ? <div className="">select 1</div> : <></>}
        {select.select2 ? (
          <div className="loan__segment">
            <span className="loan__segment wrap">
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
                  style={{ width: "60%" }}
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
        {select.select3 ? <div className="">select 3</div> : <></>}
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
        {select.select5 ? <div className="">select 5</div> : <></>}
        {select.select6 ? <div className="">select6</div> : <></>}
        {select.select7 ? <div className="">select 7</div> : <></>}
        {select.select8 ? <div className="">select8</div> : <></>}
      </section>
    </div>
  );
}
export default Loan;
