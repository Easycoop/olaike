import "./Admin.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MdCreateNewFolder, MdOutlinePayment } from "react-icons/md";
import {
  IoMdArrowDropdown,
  IoMdDocument,
  IoMdPersonAdd,
  IoMdSettings,
} from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import { FaPowerOff, FaUser, FaUserPlus } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import logo from "../../assets/icons/logo-secondary-color1.png";
import DashboardFooter from "../../components/layout/footer/Dashboard.footer";
import DashboardHeader from "../../components/layout/header/Dashboard.header";
import StateContext from "../../context/StateProvider";

function Admin() {
  const { theme } = useContext(StateContext);
  const [active, SetActive] = useState(false);
  const [dropdown, setDropdown] = useState({
    create: false,
    applications: false,
  });

  const [path, setPath] = useState("dashboard");
  const logout = async () => {};

  const navigate = useNavigate();
  const [colorId, setColorId] = useState(1);

  return (
    <div className="dashboard" theme={theme ? `${theme}` : "#008000"}>
      <div
        className={active ? "dashboard__navbar active" : "dashboard__navbar"}
      >
        <section className="dashboard__navbar__section__one">
          <img
            src={logo}
            alt=""
            className={
              active
                ? "dashboard__header__logo active"
                : "dashboard__header__logo"
            }
          />
          <BiMenu
            className={active ? "dashboard__menu active" : "dashboard__menu"}
            onClick={() => SetActive(!active)}
          />
        </section>
        <section className="dashboard__navbar__section__two">
          <div
            onClick={() => {
              setPath("Dashboard");
              navigate("/dashboard");
              setColorId(1);
            }}
            className={colorId === 1 ? "dashboard__navbar__active" : ""}
          >
            <RiDashboardFill className="dashboard__navbar__icon" />
            <h3>Dashboard</h3>
          </div>
          <div
            onClick={() => {
              setPath("User");
              navigate("/users");
              setColorId(2);
            }}
            className={colorId === 2 ? "dashboard__navbar__active" : ""}
          >
            <FaUser className="dashboard__navbar__icon" />
            <h3>Users</h3>
          </div>
          <div
            onClick={() => {
              setPath("Transactions");
              navigate("/transaction");
              setColorId(3);
            }}
            className={colorId === 3 ? "dashboard__navbar__active" : ""}
          >
            <MdOutlinePayment className="dashboard__navbar__icon" />
            <h3>Transaction</h3>
          </div>
          <div
            onClick={() => {
              setPath("Create user");
              setColorId(9);
              navigate("/create-user");
            }}
            className={colorId === 9 ? "dashboard__navbar__active" : ""}
          >
            <FaUserPlus className="dashboard__navbar__icon" />
            <h3>Create new user</h3>
          </div>
          <div
            onClick={() => {
              setPath("Loan applications");
              setColorId(23);
              navigate("/loan-applications");
            }}
            className={colorId === 23 ? "dashboard__navbar__active" : ""}
          >
            <FaUserPlus className="dashboard__navbar__icon" />
            <h3>Registration applications</h3>
          </div>
          <div
            onClick={() => {
              setPath("Loan applications");
              setColorId(12);
              navigate("/loan-applications");
            }}
            className={colorId === 12 ? "dashboard__navbar__active" : ""}
          >
            <FaUserPlus className="dashboard__navbar__icon" />
            <h3>Loan applications</h3>
          </div>
        </section>
        <section className="dashboard__navbar__section__three">
          <div
            onClick={() => {
              navigate("/setting");
              setColorId(16);
            }}
            className={colorId === 16 ? "dashboard__navbar__active" : ""}
          >
            <IoMdSettings className="dashboard__navbar__icon" />
            <h3>Settings</h3>
          </div>
          <div
            onClick={logout}
            className={colorId === 77 ? "dashboard__navbar__active" : ""}
          >
            <FaPowerOff className="dashboard__navbar__icon" />
            <h3>Logout</h3>
          </div>
        </section>
      </div>
      <div>
        <div
          className={active ? "dashboard__outlet active" : "dashboard__outlet"}
        >
          <DashboardHeader path={path} />
          <Outlet />
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default Admin;
