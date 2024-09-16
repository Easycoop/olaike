import "./Dashboard.header.css";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DashboardHeader({ path }) {
  const navigate = useNavigate();

  const logout = async () => {
    navigate("/");
  };

  return (
    <div className="dashboard__header">
      <div className="dashboard__header__path">
        <h3>{path}</h3>
      </div>
      <div className="dashboard__header__toggle">
        <span onClick={logout} id="dashboard__logout">
          <FaPowerOff className="dashboard__header__icon" />
          Logout
        </span>
      </div>
    </div>
  );
}

export default DashboardHeader;
