import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsAirplane } from "react-icons/bs";
import "./main.css";
import logo from "../../../assets/icons/logo.png";
import Header from "../../../components/layout/header/Header";

const NAV__ARRAY = [
  { id: 1, path: "dashboard", name: "My Passbook" },
  { id: 2, path: "payment", name: "Payments" },
  { id: 3, path: "loans", name: "Loan Applications" },
  { id: 4, path: "referrals", name: "Referrals" },
  { id: 5, path: "fees", name: "Fees/Dues" },
  { id: 6, path: "withdrawal", name: "Withdrawal" },
  { id: 7, path: "donation", name: "Donation" },
];

function Main() {
  const navigate = useNavigate();
  const [colorId, setColorId] = useState(1);
  const [active, setActive] = useState(false);
  const [isNovelsOpen, setIsNovelsOpen] = useState(false);

  const handleNovelsClick = () => {
    setIsNovelsOpen(!isNovelsOpen);
  };

  const handleNav = (active) => {
    setActive(active);
  };

  //   const handleLogout = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await logout();
  //     } catch (error) {
  //       console.error("Error logging out:", error);
  //     }
  //   };

  return (
    <div className="admin">
      <Header handleNav={handleNav} />
      <div className="admin__container">
        <div className={active ? "admin__navbar active" : "admin__navbar"}>
          <section className="admin__navbar__section__two">
            {NAV__ARRAY.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setColorId(item.id);
                  }}
                  className={colorId === item.id ? "admin__navbar__active" : ""}
                >
                  <BsAirplane className="admin__navbar__icon" />
                  <h3>{item.name}</h3>
                </div>
              );
            })}
          </section>
          <section
            className="admin__navbar__section__two"
            style={{ marginTop: "auto" }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ objectFit: "contain", height: "100px" }}
            />
            <div>
              <BsAirplane className="admin__navbar__icon" />
              <h3>Logout</h3>
            </div>
          </section>
        </div>
        <div className={active ? "admin__outlet active" : "admin__outlet"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
