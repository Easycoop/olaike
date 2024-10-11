import { FaFile, FaFileExcel, FaFileImport } from "react-icons/fa";
import "./Admin.registration.applications.css";
import { PiCircleFill } from "react-icons/pi";
import { FaFileCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetApplications } from "../../redux/actions/applicationAction";
import Loading from "../../components/splash/loading/Loading";
import NoResult from "../../components/splash/no-result/NoResult";

function AdminRegistrationApplication() {
  const getApplications = useGetApplications();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const handleGetApplications = async () => {
    setLoading(true);
    try {
      const response = await getApplications();
      if (response?.payload.success === true) {
        setErrorMessage("");
        setResult(response.payload.data.result);
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetApplications();
  }, []);

  return (
    <>
      <div className="ad__student__app">
        <section className="ad__student__app__section__one">
          <span className="ad__student__app__section__header">
            <h1>Registration application summary</h1>
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
                <h1>{result.length}</h1>
              </div>
            </div>
            <div className="ad__student__app__section__one__card">
              <FaFileCircleCheck className="ad__student__app__section__one__card__icon two" />
              <div>
                <h3>Successful applications</h3>
                <h1>
                  {
                    result.filter(function (item, i) {
                      if (result[i].status == "success") {
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
                      if (result[i].status == "pending") {
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
                      if (result[i].status == "failed") {
                        return result[i];
                      }
                    }).length
                  }
                </h1>
              </div>
            </div>
          </article>
        </section>
        {loading ? (
          <Loading />
        ) : result.length == 0 ? (
          <NoResult
            header="No user application"
            content="There are no user applications"
          />
        ) : (
          <section className="ad__student__app__section__two">
            <div className="ad__student__app__section__two__header">
              <h1 className="ad__student__app__section__two__header__date">
                Application date
              </h1>
              <h1 className="ad__student__app__section__two__header__id">
                Application number
              </h1>
              <h1 className="ad__student__app__section__two__header__university">
                Name
              </h1>
              <h1 className="ad__student__app__section__two__header__universityemail">
                Email
              </h1>

              <h1 className="ad__student__app__section__two__header__userid">
                Role
              </h1>
              <h1 className="ad__student__app__section__two__header__status">
                Status
              </h1>
            </div>

            {result.map((item, i) => {
              return (
                <div
                  className="ad__student__app__section__two__entry"
                  onClick={() => {
                    navigate(`/main/registration-application/${result[i].id}`);
                  }}
                >
                  <h1 className="ad__student__app__section__two__entry__date">
                    {result[i].createdAt}
                  </h1>
                  <h1 className="ad__student__app__section__two__entry__id">
                    {result[i].id}
                  </h1>
                  <h1 className="ad__student__app__section__two__entry__university">
                    {`${result[i].firstName} ${result[i].lastName}`}
                  </h1>
                  <h1 className="ad__student__app__section__two__entry__universityemail">
                    {result[i].email}
                  </h1>

                  <h1 className="ad__student__app__section__two__entry__userid">
                    EndUser
                  </h1>
                  <h1 className="ad__student__app__section__two__entry__status">
                    <span>
                      <PiCircleFill
                        className={
                          result[i].status == "success"
                            ? "ad__student__app__section__two__entry__status__icon successful"
                            : result[i].status == "failed"
                            ? "ad__student__app__section__two__entry__status__icon unsuccessful"
                            : "ad__student__app__section__two__entry__status__icon"
                        }
                      />{" "}
                      {result[i].status}
                    </span>
                  </h1>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </>
  );
}

export default AdminRegistrationApplication;
