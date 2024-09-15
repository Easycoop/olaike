import './Admin.single.agency.application.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthProvider';
import { axiosPrivate } from '../../../api/axios';
import Toaster from '../../../utils/toaster/Toaster';
import { Image, Placeholder, Transformation } from 'cloudinary-react';
import { ScaleLoader } from 'react-spinners';

function SingleAgencyApplications() {
  const { auth, setAuth, applicationId, setApplicationId, isDark } = useContext(AuthContext);

  const navigate = useNavigate();
  const [result, setResult] = useState({});

  const [toaster, setToaster] = useState(false);
  const [message, setMessage] = useState('');
  const [bgcolor, setbgcolor] = useState('');

  useEffect(() => {
    const getSingleAgencyApplications = async () => {
      try {
        const response = await axiosPrivate.get(
          `api/v1/applications/single-agency-applications/${applicationId}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        );
        const res = response.data.data;
        setResult(res);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleAgencyApplications();

    return;
  }, []);

  const submit = async (action) => {
    try {
      const response = await axiosPrivate.post(
        `api/v1/applications/single-agency-applications-action/${applicationId}`,
        JSON.stringify({
          action: action,
          email: result.business_email,
          userId: result.userId,
          profile_image: result.profile_image,
          description: result.description,
          business_email: result.business_email,
          socials: result.socials,
          office_address: result.office_address,
          mobile_phone: result.mobile_phone,
          office_phone: result.office_phone,
          role: result.role,
          agency_name: result.agency_name,
          website: result.website,
          fax: result.fax,
          history: result.history,
          corperate_values: result.corperate_values,
          license: result.license,
          document_image: result.document_image,
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

      navigate('/admin/agency-applications');
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
        <div className="si__agcy__app">
          {toaster ? <Toaster message={message} bgcolor={bgcolor} /> : <div></div>}

          <section className="admin__single__notice__section__one">
            <article className="admin__single__notice__section__one__article1">
              <h1>Agency application from user with userId: {`${result.userId}`}</h1>
            </article>
            <article className="admin__single__notice__section__one__article2">
              <span>
                <h1>Application Id</h1>
                <h3>{result.id}</h3>
              </span>
              <span>
                <h1>Business email</h1>
                <h3>{result.business_email}</h3>
              </span>
              <span>
                <h1>Agency name</h1>
                <h3>{result.agency_name}</h3>
              </span>
              <span>
                <h1>Office address</h1>
                <h3>{result.office_address}</h3>
              </span>
              <span>
                <h1>agency Id</h1>
                {result.agency_id ? (
                  <h3> {result.agency_id}</h3>
                ) : (
                  <h3>Not affiliated to any agency</h3>
                )}
              </span>
              <span>
                <h1>Office phone</h1>
                <h3>{result.office_phone}</h3>
              </span>
              <span>
                <h1>Corperate value</h1>
                {result.website ? <h3> {result.website}</h3> : <h3>--</h3>}
              </span>
              <span>
                <h1>Description</h1>
                <h3>{result.description}</h3>
              </span>
              <span>
                <h1>Corperate value</h1>
                {result.corperate_values ? <h3> {result.corperate_values}</h3> : <h3>--</h3>}
              </span>
              <span>
                <h1>Brief history</h1>
                {result.history ? <h3> {result.history}</h3> : <h3>--</h3>}
              </span>

              <span>
                <h1>Status</h1>
                <h3>{result.status}</h3>
              </span>

              <span>
                <h1>Profile Image</h1>
                {
                  <Image
                    quality="auto:best"
                    loading="lazy"
                    cloudName="du1dvxjo8"
                    publicId={result.profile_image}
                    width="300"
                    crop="scale"
                  >
                    {' '}
                    <Placeholder type="blur"></Placeholder>
                  </Image>
                }
              </span>
              <span>
                <h1>Document</h1>
                {
                  <Image
                    quality="auto:best"
                    loading="lazy"
                    cloudName="du1dvxjo8"
                    publicId={result.document_image}
                    width="300"
                    crop="scale"
                  >
                    {' '}
                    <Placeholder type="blur"></Placeholder>
                  </Image>
                }
              </span>
            </article>
            <span className="si__agcy__app__cta">
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

export default SingleAgencyApplications;
