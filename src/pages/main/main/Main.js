import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsAirplane } from "react-icons/bs";
import "./main.css";
import logo from "../../../assets/icons/logo.png";
import Header from "../../../components/layout/header/Header";
import "../../../components/ui/modal/modal-children-styles/modal-withdraw1.css";
import "../../../components/ui/modal/modal-children-styles/modal-payment2.css";
import { FaCreditCard, FaHeart, FaLink, FaSackDollar } from "react-icons/fa6";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { IoWalletSharp } from "react-icons/io5";

const NAV__ARRAY = [
  { id: 1, path: "dashboard", name: "My Passbook", icon: MdDashboard },
  { id: 2, path: "fund", name: "Fund Wallet", icon: IoWalletSharp },
  {
    id: 3,
    path: "loan-redirect",
    name: "Loan Applications",
    icon: FaSackDollar,
  },
  { id: 4, path: "referrals", name: "Referrals", icon: FaLink },
  { id: 5, path: "fees/dues", name: "Fees/Dues", icon: GiMoneyStack },
  { id: 6, path: "withdrawal", name: "Withdrawal", icon: FaCreditCard },
  { id: 7, path: "donation", name: "Donation", icon: FaHeart },
  { id: 8, path: "message", name: "Message", icon: FaRegMessage },
];

function Main() {
  const navigate = useNavigate();
  const [colorId, setColorId] = useState(1);
  const [active, setActive] = useState(false);

  const handleNav = (active) => {
    setActive(active);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    navigate("/");
  };

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
                  <item.icon className="admin__navbar__icon" />
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
            <div onClick={handleLogout}>
              <MdLogout className="admin__navbar__icon" />
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
