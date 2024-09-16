import DashboardFooter from "../../components/layout/footer/Dashboard.footer";
import "./not-found.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="not__found">
        <h1>404 NOT FOUND</h1>
        <p>OOPS! We can't seem to find the page you're looking for</p>
        <h3
          onClick={() => {
            navigate("/");
          }}
        >
          Go back to home page
        </h3>
      </section>
      <DashboardFooter />
    </div>
  );
}

export default NotFound;
