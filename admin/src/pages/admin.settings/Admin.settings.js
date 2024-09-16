import "./Admin.settings.css";
import { PiWarningOctagonFill } from "react-icons/pi";
import { BsAsterisk } from "react-icons/bs";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { useContext, useState } from "react";
import StateContext from "../../context/StateProvider";
import { SketchPicker } from "react-color";
import { useNavigate } from "react-router-dom";

function AdminSettings() {
  const { chartTheme, setChartTheme, setTheme } = useContext(StateContext);
  const navigate = useNavigate();
  const [select, setSelect] = useState({
    select1: true,
    select2: false,
    select3: false,
  });

  const [result, setResult] = useState({});
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [lastName, setLastName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [state, setState] = useState(null);
  const [address, setAddress] = useState(null);
  const [role, setRole] = useState(null);
  const [verification, setVerification] = useState(false);

  const handleChangeComplete1 = (color) => {
    setChartTheme((prevState) => ({ ...prevState, primaryColor: color.hex }));
  };
  const handleChangeComplete2 = (color) => {
    setChartTheme((prevState) => ({ ...prevState, secondaryColor: color.hex }));
  };

  const updateUser = () => {};

  return (
    <>
      <div className="admin__settings">
        <section className="account__notifications__section__two">
          <div className="account__notifications__select__div">
            <button
              className={
                select.select1
                  ? "account__notifications__select selected"
                  : "account__notifications__select"
              }
              onClick={() =>
                setSelect((prevState) => ({
                  ...prevState,
                  select1: true,
                  select2: false,
                  select3: false,
                }))
              }
            >
              Account
            </button>
            <button
              className={
                select.select2
                  ? "account__notifications__select selected"
                  : "account__notifications__select"
              }
              onClick={() =>
                setSelect((prevState) => ({
                  ...prevState,
                  select1: false,
                  select2: true,
                  select3: false,
                }))
              }
            >
              Theme
            </button>
          </div>
        </section>

        <section>
          {select.select1 ? (
            <div className="edit__user">
              <h1>Accout details</h1>
              <section className="edit__user__section1">
                <h3>Edit your account details</h3>
                <article>
                  <div className="edit__user__article__div">
                    <label>
                      First Name{" "}
                      <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                    </label>
                    <input
                      type="text"
                      alt=""
                      defaultValue={result.first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="edit__user__article__div">
                    <label>
                      Last Name{" "}
                      <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                    </label>
                    <input
                      type="text"
                      alt=""
                      defaultValue={result.last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="edit__user__article__div">
                    <label>
                      Email{" "}
                      <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                    </label>
                    <input
                      type="email"
                      alt=""
                      defaultValue={result.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="edit__user__article__div">
                    <label>
                      Country{" "}
                      <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                    </label>
                    <CountryDropdown
                      whitelist={["NG", "SL"]}
                      value={nationality}
                      onChange={(val) => setNationality(val)}
                    />
                  </div>
                  <div className="edit__user__article__div">
                    <label>State/Region</label>
                    <RegionDropdown
                      country={nationality}
                      value={state}
                      blankOptionLabel="State"
                      onChange={(val) => setState(val)}
                    />
                  </div>

                  <div className="edit__user__article__div">
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder="e.g Lekki, Rosario"
                      alt=""
                      defaultValue={result.address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="edit__user__article__div">
                    <label>
                      Gender{" "}
                      <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                    </label>
                    <select name="gender" id="gender">
                      <option value={null}>--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="edit__user__article__div">
                    <label>
                      Password{" "}
                      <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                    </label>
                    <input
                      type="password"
                      placeholder="Password must contain and upper case, lowercase and special character"
                      alt=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="edit__user__article__div">
                    <label>
                      Phone{" "}
                      <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                    </label>
                    <PhoneInput
                      // value={result.phone}
                      country={"ng"}
                      onChange={(e) => setPhone(e)}
                      inputStyle={{
                        width: "100%",
                        margin: "0",
                      }}
                      containerStyle={{
                        marginBottom: "20px",
                      }}
                    />
                  </div>

                  <div className="edit__user__article__div">
                    <label>
                      Profile image{" "}
                      <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                    </label>
                    <form
                      className="image__upload"
                      onClick={() =>
                        document.querySelector(".input__field").click()
                      }
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="input__field"
                        hidden
                        onChange={({ target: { files } }) => {
                          files[0] && setFileName(files[0].name);
                          if (files) {
                            const reader = new FileReader();
                            reader.readAsDataURL(files[0]);
                            reader.onloadend = () => {
                              setImage(reader.result);
                            };
                          }
                        }}
                      />

                      {image ? (
                        <img
                          src={image}
                          width={75}
                          height={75}
                          alt={fileName}
                        />
                      ) : (
                        <MdCloudUpload color="#1475cf" size={50} />
                      )}
                    </form>
                    <div className="image__upload__label">
                      <AiFillFileImage color="#1475" />
                      <span>
                        {fileName}
                        <MdDelete
                          onClick={() => {
                            setFileName("No file selected");
                            setImage(null);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </article>
              </section>

              <span>
                <button onClick={updateUser}>Save</button>
                <button
                  onClick={() => {
                    navigate("/admin/user");
                  }}
                >
                  Cancel
                </button>
              </span>
            </div>
          ) : (
            <></>
          )}

          {select.select2 ? (
            <div className="admin__settings__section__two__theme">
              <h1>Theme settings</h1>
              <div className="admin__settings__section__two__theme__alert">
                <PiWarningOctagonFill className="admin__settings__section__two__theme__alert__icon" />{" "}
                Theme color settings allows you to select different themes to
                suite your aesthetics.
              </div>
              <div className="admin__settings__section__two__theme__alert__select">
                <button
                  className="admin__settings__section__two__theme__alert__button zero"
                  onClick={() => setTheme("#00208a")}
                >
                  Royal blue
                </button>
                <button
                  className="admin__settings__section__two__theme__alert__button one"
                  onClick={() => setTheme("#8b0000")}
                >
                  Dark red
                </button>
                <button
                  className="admin__settings__section__two__theme__alert__button two"
                  onClick={() => setTheme("#b8860b")}
                >
                  Dark golden rod
                </button>
                <button
                  className="admin__settings__section__two__theme__alert__button three"
                  onClick={() => setTheme("#228b22")}
                >
                  Forest green
                </button>
                <button
                  className="admin__settings__section__two__theme__alert__button four"
                  onClick={() => setTheme("#000000")}
                >
                  black
                </button>
                <button
                  className="admin__settings__section__two__theme__alert__button five"
                  onClick={() => setTheme("#7a5af5")}
                >
                  purple
                </button>
              </div>

              <div className="admin__settings__section__two__theme__alert__chart">
                <h1>Chart color scheme</h1>
                <article>
                  <div>
                    <SketchPicker
                      color={chartTheme.primaryColor}
                      onChangeComplete={handleChangeComplete1}
                    />
                    <h3>Primary chart color</h3>
                  </div>
                  <div>
                    <SketchPicker
                      color={chartTheme.secondaryColor}
                      onChangeComplete={handleChangeComplete2}
                    />
                    <h3>Secondary chart color</h3>
                  </div>
                </article>
              </div>
            </div>
          ) : (
            <></>
          )}
        </section>
      </div>
    </>
  );
}

export default AdminSettings;
