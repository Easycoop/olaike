import './Admin.single.property.application.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthProvider';
import { axiosPrivate } from '../../../api/axios';
import Toaster from '../../../utils/toaster/Toaster';
import { Image, Placeholder, Transformation } from 'cloudinary-react';
import { GoCheckCircleFill } from 'react-icons/go';
import { ScaleLoader } from 'react-spinners';

function SinglePropertyApplications() {
  const { auth, setAuth, applicationId, setApplicationId, isDark } = useContext(AuthContext);

  const navigate = useNavigate();
  const [result, setResult] = useState({});
  const [images, setImages] = useState([]);

  const [toaster, setToaster] = useState(false);
  const [message, setMessage] = useState('');
  const [bgcolor, setbgcolor] = useState('');

  useEffect(() => {
    const getSinglePropertyApplications = async () => {
      try {
        const response = await axiosPrivate.get(
          `api/v1/applications/single-property-applications/${applicationId}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        );
        const res = response.data.data;
        setResult(res);
        setImages(res.images);
      } catch (error) {
        console.log(error);
      }
    };

    const increaseViewCount = async () => {
      try {
        const response = await axiosPrivate.get(
          `api/v1/applications/increase-view/${applicationId}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        );
        const res = response.data.data;
      } catch (error) {
        console.log(error);
      }
    };

    getSinglePropertyApplications();
    increaseViewCount();

    return;
  }, []);

  const submit = async (action) => {
    try {
      const response = await axiosPrivate.post(
        `api/v1/applications/single-property-applications-action/${applicationId}`,
        JSON.stringify({
          action: action,
          email: auth.user.email,
          title: result.title,
          description: result.description,
          userId: result.userId,
          propertyType: result.property_type,
          category: result.category,
          address: result.address,
          country: result.country,
          state: result.state,
          city: result.city,
          postalCode: result.postal_code,
          price: result.price,
          yearBuilt: result.year_built,
          landSize: result.land_size,
          buildingSize: result.building_size,
          parkingSize: result.parking_size,
          garageSize: result.garage_size,
          bedrooms: result.bedrooms,
          bathrooms: result.bathrooms,
          images: result.images,
          cordinates: result.cordinates,
          features: result.features,
          currency: result.currency,
          duration: result.duration,
          additionalFees: result.additional_fees,
          detailedDescription: result.detailed_description,
          highlightOne: result.highlight_one,
          highlightTwo: result.highlight_two,
          highlightThree: result.highlight_three,
          exteriorFeatures: result.exterior_features,
          flooringType: result.flooring_type,
          ownershipType: result.ownership_type,
          occupancy: result.occupancy,
          parking: result.parking,
          basement: result.basement,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      const res = response.data.message;
      setToaster(true);
      setbgcolor('#1db954');
      setMessage(res);
      setTimeout(() => {
        setToaster(false);
      }, 3100);

      navigate('/admin/property-applications');
    } catch (error) {
      console.log(error);

      setToaster(true);
      setbgcolor('c8102e');
      setMessage(error.response.data.message);
      setTimeout(() => {
        setToaster(false);
      }, 3100);
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  const cssDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: isDark ? '#fff' : '#000',
    background: isDark ? '#121212' : '#000',
  };
  return (
    <>
      {isLoading ? (
        <div style={cssDiv}>
          <ScaleLoader color={isDark ? '#fff' : '#000'} />
        </div>
      ) : (
        <div className="si__pr__app">
          {toaster ? <Toaster message={message} bgcolor={bgcolor} /> : <div></div>}

          <section className="admin__single__notice__section__one">
            <article className="admin__single__notice__section__one__article1">
              <h1>Property application from {`${result.userId}`}</h1>
            </article>
            <article className="admin__single__notice__section__one__article2">
              <span>
                <h1>Title</h1>
                <h3>{result.title}</h3>
              </span>
              <span>
                <h1>Application number</h1>
                <h3>{result.id}</h3>
              </span>
              <span>
                <h1>user Id</h1>
                <h3>{result.userId}</h3>
              </span>
              <span>
                <h1>category</h1>
                <h3>{result.category}</h3>
              </span>
              <span>
                <h1>Propery type</h1>
                <h3>{result.property_type}</h3>
              </span>
              <span>
                <h1>Price</h1>
                <h3>{result.price}</h3>
              </span>
              <span>
                <h1>Bedrooms</h1>
                <h3>{result.bedrooms}</h3>
              </span>
              <span>
                <h1>Bathrooms</h1>
                <h3>{result.bathrooms}</h3>
              </span>
              <span>
                <h1>Address</h1>
                <h3>{result.address}</h3>
              </span>
              <span>
                <h1>year built</h1>
                <h3>{result.year_built}</h3>
              </span>
              <span>
                <h1>Amenities</h1>
                <h3>
                  {result.features &&
                    result.features.length > 0 &&
                    result.features.map((item, i) => (
                      <span key={i}>
                        <GoCheckCircleFill className="single__property__checkmark" /> {item}
                      </span>
                    ))}
                </h3>
              </span>
              <span>
                <h1>Detailed description</h1>
                <h3>{result.detailed_description}</h3>
              </span>
              <span>
                <h1>Currency</h1>
                <h3>{result.currency}</h3>
              </span>
              <span>
                <h1>Duration</h1>
                <h3>{result.duration}</h3>
              </span>
              <span>
                <h1>Parking</h1>
                <h3>{result.parking}</h3>
              </span>
              <span>
                <h1>Occupancy</h1>
                <h3>{result.occupancy}</h3>
              </span>
              <span>
                <h1>Ownership type</h1>
                <h3>{result.ownership_type}</h3>
              </span>
              <span>
                <h1>Heating type</h1>
                <h3>{result.heating_type}</h3>
              </span>
              <span>
                <h1>Cooling type</h1>
                <h3>{result.cooling_type}</h3>
              </span>
              <span>
                <h1>Flooring type</h1>
                <h3>{result.flooring_type}</h3>
              </span>
              <span>
                <h1>Exterior features</h1>
                <h3>{result.exterior_features}</h3>
              </span>
              <span>
                <h1>Property Images</h1>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}
                >
                  {images.map((item, i) => {
                    return (
                      <Image
                        quality="auto:best"
                        loading="lazy"
                        cloudName="du1dvxjo8"
                        publicId={images[i]}
                        width="250"
                        crop="scale"
                        className="si__pr__app__images"
                      >
                        <Placeholder type="blur"></Placeholder>
                      </Image>
                    );
                  })}
                </div>
              </span>
            </article>
            <span className="si__st__app__cta">
              <button
                onClick={() => {
                  submit('accept');
                }}
              >
                Accept
              </button>
              <button
                onClick={() => {
                  submit('reject');
                }}
              >
                Reject
              </button>
            </span>
          </section>
        </div>
      )}
    </>
  );
}

export default SinglePropertyApplications;
