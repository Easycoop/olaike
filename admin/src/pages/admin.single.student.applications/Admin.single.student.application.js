import { useContext, useEffect, useState } from 'react';
import './Admin.single.student.application.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthProvider';
import { axiosPrivate } from '../../../api/axios';
import Toaster from '../../../utils/toaster/Toaster';
import { Image, Placeholder, Transformation } from 'cloudinary-react';
import { ScaleLoader } from 'react-spinners';

function SingleStudentApplications() {
  const { auth, setAuth, applicationId, setApplicationId, isDark } = useContext(AuthContext);

  const navigate = useNavigate();
  const [result, setResult] = useState({});

  const [toaster, setToaster] = useState(false);
  const [message, setMessage] = useState('');
  const [bgcolor, setbgcolor] = useState('');

  useEffect(() => {
    const getSingleStudentApplications = async () => {
      setIsLoading(true);

      try {
        const response = await axiosPrivate.get(
          `api/v1/applications/single-student-applications/${applicationId}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        );
        const res = response.data.data;
        setResult(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getSingleStudentApplications();

    return;
  }, []);

  const submit = async (action) => {
    try {
      setIsLoading(true);

      const response = await axiosPrivate.post(
        `api/v1/applications/single-student-applications-action/${applicationId}`,
        JSON.stringify({ action: action, email: result.university_email }),
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
      navigate('/admin/student-applications');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
        <div className="si__st__app">
          {toaster ? <Toaster message={message} bgcolor={bgcolor} /> : <div></div>}

          <section className="admin__single__notice__section__one">
            <article className="admin__single__notice__section__one__article1">
              <h1>Student application from {`${result.first_name}  ${result.last_name}`}</h1>
            </article>
            <article className="admin__single__notice__section__one__article2">
              <span>
                <h1>User name</h1>
                <h3>{`${result.first_name}  ${result.last_name}`}</h3>
              </span>
              <span>
                <h1>Application Id</h1>
                <h3>{result.id}</h3>
              </span>
              <span>
                <h1>University Email</h1>
                <h3>{result.university_email}</h3>
              </span>
              <span>
                <h1>University</h1>
                <h3>{result.university}</h3>
              </span>
              <span>
                <h1>User request location</h1>
                <h3>{result.request_location}</h3>
              </span>
              <span>
                <h1>Proof type</h1>
                <h3>{result.proof_type}</h3>
              </span>
              <span>
                <h1>Status</h1>
                <h3>{result.status}</h3>
              </span>

              <span>
                <h1>Documents</h1>
                {
                  <Image
                    quality="auto:best"
                    loading="lazy"
                    cloudName="du1dvxjo8"
                    publicId={result.documents}
                    width="300"
                    crop="scale"
                  >
                    {' '}
                    <Placeholder type="blur"></Placeholder>
                  </Image>
                }
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

export default SingleStudentApplications;
