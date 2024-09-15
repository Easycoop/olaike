import { FaFile, FaFileExcel, FaFileImport } from 'react-icons/fa';
import './Admin.student.applications.css';
import { PiCircleFill } from 'react-icons/pi';
import { FaFileCircleCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthProvider';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { axiosPrivate } from '../../../api/axios';
import { ScaleLoader } from 'react-spinners';

function AdminStudentApplication() {
  const { applicationId, setApplicationId, isDark } = useContext(AuthContext);
  const [result, setResult] = useState([]);
  const [totalResult, setTotalResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef();

  const navigate = useNavigate();

  // INTERSECTION OBSERVER THAT INCREASS THE PAGE NUMBER BY ONE EVERY TIME THE LAST ELEMENT OF THE RETURNED PAGINATED PROPERTY RESULT APPEARS ONS CREEN
  const lastProperty = useCallback(
    (node) => {
      // if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (loading) {
            setPageNumber((pageNumber) => pageNumber + 1);
          } else if (!loading) {
            setPageNumber(1);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  useEffect(() => {
    const getStudentApplications = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/applications/student-applications`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setResult(res.studentApplications);
        setTotalResult(res.totalItems);
        setLoading(true);
        setHasMore(pageNumber < res.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    getStudentApplications();

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
        <div className="ad__student__app">
          <section className="ad__student__app__section__one">
            <span className="ad__student__app__section__header">
              <h1>Student application summary</h1>
              <select name="Timeline" id="Timeline">
                <option value={null}>This month</option>
                <option value="1">Last month</option>
                <option value="2">Last 6 months</option>
                <option value="3">Last 1 year</option>
              </select>
            </span>
            <article className="ad__student__app__section__article">
              <div className="ad__student__app__section__one__card">
                <FaFile className="ad__student__app__section__one__card__icon one" />
                <div>
                  <h3>Total applications</h3>
                  <h1>{totalResult ? totalResult : 0}</h1>
                </div>
              </div>
              <div className="ad__student__app__section__one__card">
                <FaFileCircleCheck className="ad__student__app__section__one__card__icon two" />
                <div>
                  <h3>Successful applications</h3>
                  <h1>
                    {
                      result.filter(function (item, i) {
                        if (result[i].status == 'successful') {
                          return result[i];
                        }
                      }).length
                    }
                  </h1>
                </div>
              </div>
              <div className="ad__student__app__section__one__card">
                <FaFileImport className="ad__student__app__section__one__card__icon three" />
                <div>
                  <h3>Pending applications</h3>
                  <h1>
                    {
                      result.filter(function (item, i) {
                        if (result[i].status == 'pending') {
                          return result[i];
                        }
                      }).length
                    }
                  </h1>
                </div>
              </div>
              <div className="ad__student__app__section__one__card">
                <FaFileExcel className="ad__student__app__section__one__card__icon four" />
                <div>
                  <h3>Unsuccessful applications</h3>
                  <h1>
                    {
                      result.filter(function (item, i) {
                        if (result[i].status == 'unsuccessful') {
                          return result[i];
                        }
                      }).length
                    }
                  </h1>
                </div>
              </div>
            </article>
          </section>
          <section className="ad__student__app__section__two">
            <div className="ad__student__app__section__two__header">
              <h1 className="ad__student__app__section__two__header__date">Application date</h1>
              <h1 className="ad__student__app__section__two__header__id">Application number</h1>
              <h1 className="ad__student__app__section__two__header__university">University</h1>
              <h1 className="ad__student__app__section__two__header__universityemail">
                University email
              </h1>

              <h1 className="ad__student__app__section__two__header__userid">User ID</h1>
              <h1 className="ad__student__app__section__two__header__status">Status</h1>
            </div>

            {result.map((item, i) => {
              if (result.length === i + 1) {
                return (
                  <div
                    className="ad__student__app__section__two__entry"
                    onClick={() => {
                      setApplicationId(result[i].id);
                      navigate(`/admin/student-application/${applicationId}`);
                    }}
                    ref={lastProperty}
                  >
                    <h1 className="ad__student__app__section__two__entry__date">
                      {result[i].createdAt}
                    </h1>
                    <h1 className="ad__student__app__section__two__entry__id">{result[i].id}</h1>
                    <h1 className="ad__student__app__section__two__entry__university">
                      {result[i].university}
                    </h1>
                    <h1 className="ad__student__app__section__two__entry__universityemail">
                      {result[i].university_email}
                    </h1>

                    <h1 className="ad__student__app__section__two__entry__userid">
                      {result[i].userId}
                    </h1>
                    <h1 className="ad__student__app__section__two__entry__status">
                      <span>
                        <PiCircleFill
                          className={
                            result[i].status == 'successful'
                              ? 'ad__student__app__section__two__entry__status__icon successful'
                              : result[i].status == 'unsuccessful'
                              ? 'ad__student__app__section__two__entry__status__icon unsuccessful'
                              : 'ad__student__app__section__two__entry__status__icon'
                          }
                        />{' '}
                        {result[i].status}
                      </span>
                    </h1>
                  </div>
                );
              } else {
                return (
                  <div
                    className="ad__student__app__section__two__entry"
                    onClick={() => {
                      setApplicationId(result[i].id);
                      navigate(`/admin/student-application/${applicationId}`);
                    }}
                  >
                    <h1 className="ad__student__app__section__two__entry__date">
                      {result[i].createdAt}
                    </h1>
                    <h1 className="ad__student__app__section__two__entry__id">{result[i].id}</h1>
                    <h1 className="ad__student__app__section__two__entry__university">
                      {result[i].university}
                    </h1>
                    <h1 className="ad__student__app__section__two__entry__universityemail">
                      {result[i].university_email}
                    </h1>

                    <h1 className="ad__student__app__section__two__entry__userid">
                      {result[i].userId}
                    </h1>
                    <h1 className="ad__student__app__section__two__entry__status">
                      <span>
                        <PiCircleFill
                          className={
                            result[i].status == 'successful'
                              ? 'ad__student__app__section__two__entry__status__icon successful'
                              : result[i].status == 'unsuccessful'
                              ? 'ad__student__app__section__two__entry__status__icon unsuccessful'
                              : 'ad__student__app__section__two__entry__status__icon'
                          }
                        />{' '}
                        {result[i].status}
                      </span>
                    </h1>
                  </div>
                );
              }
            })}
          </section>
        </div>
      )}
    </>
  );
}

export default AdminStudentApplication;
