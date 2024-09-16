import { useState } from "react";
import "./Admin.edit.user.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import { BsAsterisk } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";

function AdminEditUser() {
  const [result, setResult] = useState({});

  const navigate = useNavigate();

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

  const updateUser = () => {};

  return (
    <>
      <div className="edit__user">
        <h1>Accout details</h1>
        <section className="edit__user__section1">
          <h3>Personal details</h3>
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
                Verify email{" "}
                <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
              </label>
              <select
                name="verification"
                id="verification"
                alt=""
                onChange={(e) => setVerification(e.target.value)}
              >
                <option value={null}>--</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
            <div className="edit__user__article__div">
              <label>
                Profile image{" "}
                <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
              </label>
              <form
                className="image__upload"
                onClick={() => document.querySelector(".input__field").click()}
              >
                <input
                  type="file"
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
                  <img src={image} width={75} height={75} alt={fileName} />
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
    </>
  );
}

export default AdminEditUser;
