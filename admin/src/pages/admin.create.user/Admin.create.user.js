import './Admin.create.user.css';
import { useContext, useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2';
import { BsAsterisk } from 'react-icons/bs';
import Toaster from '../../../utils/toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { axiosPrivate } from '../../../api/axios';
import { ScaleLoader } from 'react-spinners';
import AuthContext from '../../../context/AuthProvider';

function AdminCreateUser() {
  const { isDark } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toaster, setToaster] = useState(false);
  const [message, setMessage] = useState('');
  const [bgcolor, setbgcolor] = useState('');

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No file selected');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [verification, setVerification] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const cssDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: isDark ? '#fff' : '#000',
    background: isDark ? '#121212' : '#000',
  };

  const createUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        'api/v1/auth/create-user',
        JSON.stringify({
          email: email,
          password: password,
          phone: phone,
          firstName: firstName,
          lastName: lastName,
          role: role,
          state: state,
          nationality: nationality,
          role: role,
          gender: gender,
          address: address,
          image: image,
          verification: verification,
        }),

        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      navigate('/admin/users');
      setToaster(true);
      setbgcolor('#00e396');
      setMessage('User created succesfully');
      setTimeout(() => {
        setToaster(false);
      }, 3100);
    } catch (err) {
      if (!err?.response) {
        console.log('No server response');
      } else if (err.response.status === 401) {
        console.log('Unauthorized');
      } else {
        setToaster(true);
        setbgcolor('#d1ecf1');
        setMessage(err.response.data.message);
        setTimeout(() => {
          setToaster(false);
        }, 3100);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div style={cssDiv}>
          <ScaleLoader color={isDark ? '#fff' : '#000'} />
        </div>
      ) : (
        <div className="create__user">
          {toaster ? <Toaster message={message} bgcolor={bgcolor} /> : <div></div>}

          <h1>Create new user</h1>
          <section className="edit__user__section1">
            <h3>Personal details</h3>
            <article>
              <div className="edit__user__article__div">
                <label>
                  First Name <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <input type="text" alt="" onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="edit__user__article__div">
                <label>
                  Last Name <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <input type="text" alt="" onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="edit__user__article__div">
                <label>
                  Email <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <input type="email" alt="" onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="edit__user__article__div">
                <label>
                  Country <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <CountryDropdown
                  whitelist={['NG', 'SL']}
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
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="edit__user__article__div">
                <label>
                  Gender <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)}>
                  <option value={null}>--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="edit__user__article__div">
                <label>
                  Password <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
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
                  Role <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <select name="role" id="role" alt="" onChange={(e) => setRole(e.target.value)}>
                  <option value={null}>--</option>
                  <option value="Admin">Admin</option>
                  <option value="Agency">Agency</option>
                  <option value="Agent">Agent</option>
                  <option value="EndUser">End user</option>
                  <option value="SuperAdmin">Super Admin</option>
                </select>
              </div>
              <div className="edit__user__article__div">
                <label>
                  Phone <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <PhoneInput
                  country={'ng'}
                  onChange={(e) => setPhone(e)}
                  inputStyle={{
                    width: '100%',
                    margin: '0',
                  }}
                  containerStyle={{
                    marginBottom: '20px',
                  }}
                />
              </div>
              <div className="edit__user__article__div">
                <label>
                  Verify email <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
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
                  Profile image <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <form
                  className="image__upload"
                  onClick={() => document.querySelector('.input__field').click()}
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
                        setFileName('No file selected');
                        setImage(null);
                      }}
                    />
                  </span>
                </div>
              </div>
            </article>
          </section>

          <span>
            <button onClick={createUser}>Create user</button>
          </span>
        </div>
      )}
    </>
  );
}

export default AdminCreateUser;
