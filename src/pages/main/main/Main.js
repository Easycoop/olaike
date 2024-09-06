import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsAirplane } from "react-icons/bs";
import "./main.css";
import logo from "../../../assets/icons/logo.png";
import Header from "../../../components/layout/header/Header";
import Modal from "../../../components/ui/modal/Modal";
import "../../../components/ui/modal/modal-children-styles/modal-withdraw1.css";
import "../../../components/ui/modal/modal-children-styles/modal-payment2.css";
import Input from "../../../components/ui/form-elements/input";
import Button from "../../../components/ui/button/Button";
import { FaCreditCard } from "react-icons/fa6";
import { PiBankFill } from "react-icons/pi";

const NAV__ARRAY = [
  { id: 1, path: "dashboard", name: "My Passbook" },
  { id: 2, path: "payment", name: "Add Money" },
  { id: 3, path: "loans", name: "Loan Applications" },
  { id: 4, path: "referrals", name: "Referrals" },
  { id: 5, path: "fees/dues", name: "Fees/Dues" },
  { id: 6, path: "withdrawal", name: "Withdrawal" },
  { id: 7, path: "donation", name: "Donation" },
];

function Main() {
  const navigate = useNavigate();
  const [colorId, setColorId] = useState(1);
  const [active, setActive] = useState(false);
  const [withdrawAmmount, setWithdrawAmmount] = useState("");

  const handleNav = (active) => {
    setActive(active);
  };

  const [isOpen, setIsOpen] = useState({
    withdraw1: false,
    payment: false,
    payment2: false,
    payment3: false,
  });

  const closeModal = () => {
    setIsOpen({
      withdraw1: false,
      payment: false,
      payment2: false,
      payment3: false,
    });
  };

  const handleModalClick = (option) => {
    closeModal();
    if (option === "withdraw1") {
      setIsOpen((prev) => ({ ...prev, withdraw1: true }));
    } else if (option === "payment") {
      setIsOpen((prev) => ({ ...prev, payment: true }));
    } else if (option === "payment2") {
      setIsOpen((prev) => ({ ...prev, payment2: true }));
    } else if (option === "payment3") {
      setIsOpen((prev) => ({ ...prev, payment3: true }));
    } else return;
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
              if (item.id == "6") {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleModalClick("withdraw1");
                      setColorId(item.id);
                    }}
                    className={
                      colorId === item.id ? "admin__navbar__active" : ""
                    }
                  >
                    <BsAirplane className="admin__navbar__icon" />
                    <h3>{item.name}</h3>
                  </div>
                );
              } else if (item.id == "2") {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleModalClick("payment");
                      setColorId(item.id);
                    }}
                    className={
                      colorId === item.id ? "admin__navbar__active" : ""
                    }
                  >
                    <BsAirplane className="admin__navbar__icon" />
                    <h3>{item.name}</h3>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      setColorId(item.id);
                    }}
                    className={
                      colorId === item.id ? "admin__navbar__active" : ""
                    }
                  >
                    <BsAirplane className="admin__navbar__icon" />
                    <h3>{item.name}</h3>
                  </div>
                );
              }
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

      {/* WITHDRAW MODAL 1 */}
      <Modal isOpen={isOpen.withdraw1} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Enter how much you want to withdraw</h3>
          <Input
            type="text"
            placeholder="Enter an ammount"
            name="withdrawAmmount"
            value={withdrawAmmount}
            onChange={(e) => setWithdrawAmmount(e.target.value)}
          />
          <p>wallet balance: N 2,000.000.00</p>
          <Button className="modal__withdraw1__button">
            Select account details
          </Button>
        </div>
      </Modal>

      {/* PAYMENT MODAL 1 */}
      <Modal isOpen={isOpen.payment} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Enter how much you want to fund with</h3>
          <Input
            type="text"
            placeholder="Enter an ammount"
            name="withdrawAmmount"
            value={withdrawAmmount}
            onChange={(e) => setWithdrawAmmount(e.target.value)}
          />
          <p>wallet balance: N 2,000.000.00</p>
          <Button
            className="modal__withdraw1__button"
            onClick={() => handleModalClick("payment2")}
          >
            Select funding source
          </Button>
        </div>
      </Modal>

      {/* PAYMENT MODAL 2 */}
      <Modal isOpen={isOpen.payment2} onClose={closeModal}>
        <div className="modal__payment2">
          <div onClick={() => handleModalClick("payment3")}>Main Wallet</div>
          <div onClick={() => handleModalClick("payment3")}>Savings Wallet</div>
          <div onClick={() => handleModalClick("payment3")}>
            Home Savings Wallet
          </div>
          <div onClick={() => handleModalClick("payment3")}>Loan Wallet</div>
          <p>Select the wallet to fund</p>
        </div>
      </Modal>

      {/* PAYMENT MODAL 3 */}
      <Modal isOpen={isOpen.payment3} onClose={closeModal}>
        <div className="modal__payment2">
          <h3>Add Funds</h3>
          <p>Select the type of account you want to use to fund your wallet</p>
          <div>
            <PiBankFill /> Bank Transfer
          </div>
          <div>
            <FaCreditCard /> Card
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Main;
