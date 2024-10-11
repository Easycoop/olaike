import { useEffect, useState } from "react";
import "./Admin.single.registration.application.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleApplication,
  useUpdateUserApplication,
} from "../../redux/actions/applicationAction";
import toastManager from "../../components/ui/toast/ToasterManager";

function SingleLoanApplications() {
  const getSingleApplication = useGetSingleApplication();
  const updateUserApplication = useUpdateUserApplication();
  const { applicationId } = useParams();
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submit = async (param) => {
    setLoading(true);

    const payload = {
      action: param,
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      password: result.password,
    };
    try {
      const response = await updateUserApplication(payload);
      console.log("emmanuel", response);

      if (response?.payload.success === true) {
        setErrorMessage("");
        navigate(-1);
        return;
      } else {
        setErrorMessage(response.message);
        toastManager.addToast({
          message: "Internal server error",
          type: "error",
        });
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetSingleApplication = async () => {
    setLoading(true);
    try {
      const response = await getSingleApplication(applicationId);

      if (response?.payload.success === true) {
        setErrorMessage("");
        setResult(response.payload.data);
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
    handleGetSingleApplication();
  }, []);

  return (
    <>
      <div className="si__st__app">
        <section className="admin__single__notice__section__one">
          <article className="admin__single__notice__section__one__article1">
            <h1>{`Registration application from ${result?.firstName} ${result?.lastName}`}</h1>
          </article>
          <article className="admin__single__notice__section__one__article2">
            <span>
              <h1>Application Date</h1>
              <h3>{result?.createdAt}</h3>
            </span>
            <span>
              <h1>User Name</h1>
              <h3>{`${result?.firstName} ${result?.lastName}`}</h3>
            </span>
            <span>
              <h1>Application Number</h1>
              <h3>{result?.id}</h3>
            </span>
            <span>
              <h1>Email</h1>
              <h3>{result?.email}</h3>
            </span>
            <span>
              <h1>Role</h1>
              <h3>EndUser</h3>
            </span>
            <span>
              <h1>Status</h1>
              <h3>{result?.status}</h3>
            </span>
          </article>
          {result?.status == "pending" && (
            <span className="si__st__app__cta">
              <button
                disabled={loading}
                onClick={() => {
                  submit("accept");
                }}
              >
                Accept
              </button>
              <button
                disabled={loading}
                onClick={() => {
                  submit("reject");
                }}
              >
                Reject
              </button>
            </span>
          )}
        </section>
      </div>
    </>
  );
}

export default SingleLoanApplications;
