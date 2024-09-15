import { BsAsterisk } from 'react-icons/bs';
import Toaster from '../../../utils/toaster/Toaster';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import { axiosPrivate } from '../../../api/axios';
import { ScaleLoader } from 'react-spinners';
import AuthContext from '../../../context/AuthProvider';

function AdminEditProperty() {
  const { propertyId, isDark } = useContext(AuthContext);

  const navigate = useNavigate();

  const [toaster, setToaster] = useState(false);
  const [message, setMessage] = useState('');
  const [bgcolor, setbgcolor] = useState('');
  const [result, setResult] = useState({});

  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [buildingSize, setBuildingSize] = useState(null);
  const [landSize, setLandSize] = useState(null);
  const [parkingSize, setParkingSize] = useState(null);
  const [garageSize, setGarageSize] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [mobilePhone, setMobilePhone] = useState(null);
  const [category, setCategory] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [description, setDescription] = useState(null);
  const [address, setAddress] = useState(null);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No file selected');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSingleProperty = async () => {
      try {
        const response = await axiosPrivate.post(`api/v1/property/property/${propertyId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setResult(res);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleProperty();
  }, []);

  const cssDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: isDark ? '#fff' : '#000',
    background: isDark ? '#121212' : '#000',
  };

  const updateProperty = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        'api/v1/property/admin-update-property',
        JSON.stringify({
          title: title,
          price: price,
          buildingSize: buildingSize,
          landSize: landSize,
          parkingSize: parkingSize,
          garageSize: garageSize,
          parkingSize: parkingSize,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          mobilePhone: mobilePhone,
          category: category,
          image: image,
          propertyType: propertyType,
          description: description,
          address: address,
          city: city,
          propertyId: result.id,
        }),

        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      navigate('/admin/properties');
      setToaster(true);
      setbgcolor('#00e396');
      setMessage(response.data.data.message);
      setTimeout(() => {
        setToaster(false);
      }, 3100);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <div style={cssDiv}>
          <ScaleLoader color={isDark ? '#fff' : '#000'} />
        </div>
      ) : (
        <div className="create__property">
          {toaster ? <Toaster message={message} bgcolor={bgcolor} /> : <div></div>}
          <h1>Edit property</h1>
          <section className="edit__user__section1">
            <article>
              <div className="edit__user__article__div">
                <label className="listing__label">
                  Title <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <input
                  className="list__input"
                  type="text"
                  required
                  defaultValue={result.title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="edit__user__article__div">
                <label className="listing__label">
                  Price <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <CurrencyInput
                  id="input-example"
                  name="input-name"
                  placeholder="Please enter a number"
                  prefix="#"
                  decimalsLimit={2}
                  onValueChange={(value, name, values) => setPrice(value)}
                />
              </div>

              <div className="edit__user__article__div">
                <label className="listing__label">
                  Category <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <select
                  name="category"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  className="list__input"
                >
                  <option value={null}>--</option>
                  <option value="rental">Rental</option>
                  <option value="lease">Lease</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="edit__user__article__div">
                <label className="listing__label">
                  Property type <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <select
                  name="propertyType"
                  id="propertyType"
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="list__input"
                >
                  <option value={null}>--</option>
                  <option value="apartment">Apartment</option>
                  <option value="commercial">Commercial</option>
                  <option value="construction">Construction</option>
                </select>
              </div>

              <div className="edit__user__article__div">
                <label className="listing__label">
                  Address <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <input
                  className="listing__input"
                  type="text"
                  required
                  defaultValue={result.address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="edit__user__article__div">
                <label className="listing__label">
                  Country <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <CountryDropdown
                  whitelist={['NG', 'SL']}
                  value={country}
                  onChange={(e) => setCountry(e)}
                  className="list__input"
                />
              </div>
              <div className="edit__user__article__div">
                <label className="listing__label">
                  Region/State <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <RegionDropdown
                  country={country}
                  value={state}
                  blankOptionLabel={state}
                  onChange={(e) => setState(e)}
                  className="list__input"
                />
              </div>
              <div className="edit__user__article__div">
                <label className="listing__label">City</label>
                <input
                  className="listing__input"
                  type="text"
                  required
                  defaultValue={result.city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
              <div className="edit__user__article__div">
                <label className="listing__label">
                  Bedrooms <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <input
                  className="list__input"
                  type="number"
                  required
                  defaultValue={result.bedrooms}
                  onChange={(e) => {
                    setBedrooms(e.target.value);
                  }}
                />
              </div>
              <div className="edit__user__article__div">
                <label className="listing__label">
                  Bathrooms <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <input
                  className="list__input"
                  type="number"
                  required
                  defaultValue={result.bathrooms}
                  onChange={(e) => {
                    setBathrooms(e.target.value);
                  }}
                />
              </div>

              <div className="edit__user__article__div">
                <label className="listing__label">Land size( Square meter (sqm))</label>
                <input
                  className="list__input"
                  type="number"
                  required
                  defaultValue={result.land_size}
                  onChange={(e) => {
                    setLandSize(e.target.value);
                  }}
                />
              </div>
              <div className="edit__user__article__div">
                <label className="listing__label">Building size( Square meter (sqm))</label>
                <input
                  className="list__input"
                  type="number"
                  required
                  defaultValue={result.building_size}
                  onChange={(e) => {
                    setBuildingSize(e.target.value);
                  }}
                />
              </div>

              <div className="edit__user__article__div">
                <label className="listing__label">Garage size( Square meter (sqm))</label>
                <input
                  className="list__input"
                  type="number"
                  required
                  defaultValue={result.garage_size}
                  onChange={(e) => {
                    setGarageSize(e.target.value);
                  }}
                />
              </div>
              <div className="edit__user__article__div">
                <label className="listing__label">Parking size( Square meter (sqm))</label>
                <input
                  className="list__input"
                  type="number"
                  required
                  defaultValue={result.parking_size}
                  onChange={(e) => {
                    setParkingSize(e.target.value);
                  }}
                />
              </div>
              <div className="edit__user__article__div">
                <label className="listing__label">Active phone number</label>
                <PhoneInput
                  country={'ng'}
                  onChange={(e) => setMobilePhone(e)}
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
                <label className="listing__label" for="email">
                  Description <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <textarea
                  type="text"
                  placeholder="Enter new message"
                  name="text"
                  rows="8"
                  cols="6"
                  wrap="soft"
                  defaultValue={result.description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="edit__user__article__div">
                <label className="listing__label">
                  Property images{' '}
                  <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <form
                  className="image__upload"
                  onClick={() => document.querySelector('.input__field').click()}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="input__field"
                    multiple
                    hidden
                    onChange={({ target: { files } }) => {
                      let images = [];
                      Object.values(files).forEach(function (file, index) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                          images.push(reader.result);
                        };
                      });
                      setImage(images);
                      setFileName(images.length + 'files selected');
                    }}
                  />
                  {image ? (
                    <img src={image[0]} width={75} height={75} alt={fileName} />
                  ) : (
                    <MdCloudUpload color="#1475cf" size={50} />
                  )}
                </form>
                <div className="image__upload__label">
                  <AiFillFileImage color="#1475" />

                  {fileName}
                  <MdDelete
                    onClick={() => {
                      setFileName('No file selected');
                      setImage(null);
                    }}
                  />
                </div>
              </div>
            </article>
          </section>

          <span>
            <button onClick={updateProperty}>Save</button>
          </span>
        </div>
      )}
    </>
  );
}

export default AdminEditProperty;
