import './Admin.single.property.css';
import { GoCheckCircleFill } from 'react-icons/go';
import { GiBed } from 'react-icons/gi';
import { LiaBathSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import CardlistReview from '../../../user/components/cardlist/CardlistReview';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthProvider';
import { Image, Placeholder, Transformation } from 'cloudinary-react';
import { axiosPrivate } from '../../../api/axios';
import { ScaleLoader } from 'react-spinners';

function AdminSingleProperty() {
  const { propertyId, isDark } = useContext(AuthContext);
  const [result, setResult] = useState({});
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

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

    const getAllReviews = async () => {
      try {
        const response = await axiosPrivate.post(
          `api/v1/review/reviews`,
          JSON.stringify({
            type: 'property',
            id: propertyId,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        );
        const res = response.data.data;
        setReviews(res.review);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleProperty();
    getAllReviews();

    return;
  }, []);

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
        <div className="single__property">
          <section className="single__property__section__one">
            {result.images && result.images[0] && (
              <Image
                quality="auto:best"
                loading="lazy"
                cloudName="du1dvxjo8"
                publicId={result.images[0]}
                width="300"
                crop="scale"
              >
                {' '}
                <Placeholder type="blur"></Placeholder>
              </Image>
            )}
            {result.images && result.images[1] && (
              <Image
                quality="auto:best"
                loading="lazy"
                cloudName="du1dvxjo8"
                publicId={result.images[0]}
                width="300"
                crop="scale"
              >
                {' '}
                <Placeholder type="blur"></Placeholder>
              </Image>
            )}
            {result.images && result.images[2] && (
              <Image
                quality="auto:best"
                loading="lazy"
                cloudName="du1dvxjo8"
                publicId={result.images[0]}
                width="300"
                crop="scale"
              >
                {' '}
                <Placeholder type="blur"></Placeholder>
              </Image>
            )}
            {result.images && result.images[3] && (
              <Image
                quality="auto:best"
                loading="lazy"
                cloudName="du1dvxjo8"
                publicId={result.images[0]}
                width="300"
                crop="scale"
              >
                {' '}
                <Placeholder type="blur"></Placeholder>
              </Image>
            )}
          </section>
          <section className="single__property__section__two">
            <div className="single__property__section__two__seg1">
              <h1>{result.title}</h1>
              <p>{result.description}</p>
              <article className="single__property__section__two__seg1__article1">
                <h3>About this stay</h3>
                {result.features && result.features.length > 0 ? <h4>Amenities</h4> : <></>}
                <div className="single__property__section__two__seg1__article1__amenities">
                  {result.features &&
                    result.features.length > 0 &&
                    result.features.map((item, i) => (
                      <span key={i}>
                        <GoCheckCircleFill className="single__property__checkmark" /> {item}
                      </span>
                    ))}
                </div>
                <h4>Bedrooms and bathrooms</h4>
                <div className="single__property__section__two__seg1__article1__bedrooms">
                  <span>
                    <GiBed className="single__property__bedrooms__icon" />
                    {result.bedrooms} bedrooms
                  </span>
                  <span>
                    <LiaBathSolid className="single__property__bedrooms__icon" />
                    {result.bathrooms} bathrooms
                  </span>
                </div>
                <h4>Reviews</h4>
                <div>
                  <CardlistReview reviews={reviews} />
                </div>
              </article>
            </div>
            <div className="single__property__section__two__seg2">
              <div className="single__property__section1">
                <h1></h1>
                <span>
                  <h2>Property Id</h2>
                  <h3>{result.id}</h3>
                </span>
                <span>
                  <h2>User Id</h2>
                  <h3>{result.userId}</h3>
                </span>
                <span>
                  <h2>views</h2>
                  <h3>{result.views}</h3>
                </span>
                <span>
                  <h2>Country</h2>
                  <h3>{result.country}</h3>
                </span>
                <span>
                  <h2>Address</h2>
                  <h3>{result.address}</h3>
                </span>
                <span>
                  <h2>Property type</h2>
                  <h3>{result.bedrooms}</h3>
                </span>
                <span>
                  <h2>Category</h2>
                  <h3>{result.category}</h3>
                </span>
                <span>
                  <h2>Bedrooms</h2>
                  <h3>{result.bedrooms}</h3>
                </span>
                <span>
                  <h2>Bathrooms</h2>
                  <h3>{result.bathrooms}</h3>
                </span>
                <span>
                  <h2>Year built</h2>
                  <h3>{result.year_built}</h3>
                </span>
                <button onClick={() => navigate('/admin/edit-property')}>Edit property</button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default AdminSingleProperty;
