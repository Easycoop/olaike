import { useState } from "react";
import { FaCheckCircle, FaCoins, FaHome, FaRegCircle } from "react-icons/fa";
import { BiCategoryAlt, BiMenu, BiSearch } from "react-icons/bi";
import { BsPerson, BsTranslate } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { GiBookshelf, GiPoliceBadge } from "react-icons/gi";

import "./Header.css";
import "../../../../common-components/modal-children-style/modal-login.css";
import "../../../../common-components/modal-children-style/modal-signup.css";
import "../../../../common-components/modal-children-style/modal-plan.css";
import "../../../../common-components/modal-children-style/modal-confirmation.css";
import logo from "../../../../assets/icons/logo.png";
import profileImage from "../../../../assets/profile-image.jpg";
import coin from "../../../../assets/icons/coin.png";
import google__icon from "../../../../assets/icons/google.png";
import facebook__icon from "../../../../assets/icons/facebook.png";
import imageConfirmation from "../../../../assets/images/modal-confirmation.png";
import {
  useAuth,
  useLogin,
  useLogout,
  usePasswordForget,
  usePasswordResetComplete,
  useResetPassword,
  useSignUp,
  useVerifyEmail,
} from "../../../../redux/actions/authActions";
import { VscAccount } from "react-icons/vsc";
import { FaRankingStar } from "react-icons/fa6";
import { PiNotePencilDuotone } from "react-icons/pi";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../common-components/modal/Modal";
import ToasterContainer from "../../../../common-components/toast/ToasterContainer";
import toastManager from "../../../../common-components/toast/ToasterManager";

function Header() {
  const dispatch = useDispatch();
  const signUp = useSignUp();
  const login = useLogin();
  const logout = useLogout();
  const passwordForget = usePasswordForget();
  const resetPassword = useResetPassword();
  const passwordResetComplete = usePasswordResetComplete();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState(0);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");

  //Redux
  const auth = useAuth();

  //State and context declarations
  const verifyOtp = useVerifyEmail();
  const [menu, setMenu] = useState(false);
  const [request_id, setRequest_id] = useState("");
  const [otpType, setOtpType] = useState("");
  const [isAccountDropdown, setIsAccountDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState({
    signin: false,
    signup: false,
    plan: false,
    confirmation: false,
    coin: false,
    otp: false,
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    gender: "Male",
    re_password: "",
  });
  const [plan, setPlan] = useState("");

  //Hooks definitions
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen({
      signin: false,
      signup: false,
      plan: false,
      confirmation: false,
      forget: false,
      reset: false,
    });
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdown(!isAccountDropdown);
  };
  const handleMenuClick = (e) => {
    e.stopPropagation(); // Prevent the click from closing the dropdown
  };

  const handleAuthClick = (option) => {
    if (option === "signin") {
      setIsOpen((prev) => ({ ...prev, signin: true }));
    } else if (option === "signup") {
      setIsOpen((prev) => ({ ...prev, signup: true }));
    } else if (option === "plan") {
      setIsOpen((prev) => ({ ...prev, plan: true }));
    } else if (option === "confirmation") {
      setIsOpen((prev) => ({ ...prev, confirmation: true }));
    } else if (option === "coin") {
      setIsOpen((prev) => ({ ...prev, coin: true }));
    } else if (option === "otp") {
      setIsOpen((prev) => ({ ...prev, otp: true }));
    } else if (option === "forget") {
      setIsOpen((prev) => ({ ...prev, forget: true }));
    } else if (option === "reset") {
      setIsOpen((prev) => ({ ...prev, reset: true }));
    } else return;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signUp(formData);

      if (response?.status === 200 || response?.status === "success") {
        closeModal();
        setMenu(false);
        setRequest_id(response.request_id);
        setErrorMessage("");
        toastManager.addToast({
          message: `Account created succesfully. An OTP has been sent to your email`,
          type: "success",
        });
        handleAuthClick("otp");
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData.email, formData.password);
      if (response.status === 200 || response.status === "success") {
        setErrorMessage("");
        closeModal();
        setMenu(false);
        toastManager.addToast({
          message: "Successful login",
          type: "success",
        });
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    }
  };

  const handleLogout = () => {
    try {
      const response = logout();
      console.log("logout response", response);
      if (response.status === 200 || response.status === "success") {
        setErrorMessage("");
        closeModal();
        setMenu(false);
        toastManager.addToast({
          message: "Successful logout",
          type: "success",
        });
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyOtp(formData.email, request_id, otp);
      if (response.status === 200 || response.status === "success") {
        setErrorMessage("");
        closeModal();
        toastManager.addToast({
          message: "OTP Verified succesfully",
          type: "success",
        });

        if (otpType === "forget") {
          const response = await completePasswordReset();
          const _accessToken = response.access_token;
          dispatch({ type: "UPDATE_ACCESS_TOKEN", payload: _accessToken });
          handleAuthClick("reset");
        }
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    }
  };

  const handleSubscriptionPayment = () => {
    setIsOpen((prev) => ({ ...prev, plan: false, confirmation: true }));
  };

  const handleGetCoin = () => {
    setIsOpen((prev) => ({ ...prev, coin: false, confirmation: true }));
  };

  const handleResend = () => {
    console.log("resend");
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !rePassword) {
      setErrorMessage("Fill in all fields");
      return;
    } else if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    } else if (password !== rePassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword({
        password: password,
      });
      if (response.status === 200 || response.status === "success") {
        setErrorMessage("");
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    }
  };

  const completePasswordReset = async () => {
    try {
      const response = await passwordResetComplete(email, request_id, otp);
      if (response.status === 200 || response.status === "success") {
        setErrorMessage("");
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    }
  };

  const handleForget = async (e) => {
    e.preventDefault();

    if (email.length === 0) {
      setErrorMessage("Please enter your email address");
      return;
    }

    try {
      const response = await passwordForget(email);
      if (response) {
        setErrorMessage("");
        setRequest_id(response.request_id);
        setOtpType("forget");
        handleOtpModalSwitch();
        return;
      } else {
        setErrorMessage("Password reset failed");
      }
    } catch (error) {
      setErrorMessage("Password reset failed");
    }
  };

  const handleForgetModalSwitch = () => {
    closeModal();
    handleAuthClick("forget");
  };
  const handleOtpModalSwitch = () => {
    closeModal();
    handleAuthClick("otp");
  };

  return (
    <div className="header">
      <ToasterContainer />
      <img
        className="header__logo"
        src={logo}
        alt=""
        onClick={() => navigate("/")}
      />
      <ul className="header__ul">
        <li
          className={location.pathname === "/" ? "header__nav__active" : ""}
          onClick={() => {
            navigate("/");
          }}
        >
          <FaHome className="header__icons" /> Home
        </li>
        <li
          className={
            location.pathname === "/genre" ? "header__nav__active" : ""
          }
          onClick={() => {
            navigate("/genre");
          }}
        >
          <BiCategoryAlt className="header__icons" /> Genre
        </li>
        <li
          className={
            location.pathname === "/ranking" ? "header__nav__active" : ""
          }
          onClick={() => {
            navigate("/ranking");
          }}
        >
          <FaRankingStar className="header__icons" /> Ranking
        </li>
        <li
          className={
            location.pathname === "/create" ? "header__nav__active" : ""
          }
          onClick={() => {
            auth.user ? navigate("/create") : handleAuthClick("signin");
          }}
        >
          <PiNotePencilDuotone className="header__icons" /> Create
        </li>
        <li
          className={
            location.pathname === "/shelf" ? "header__nav__active" : ""
          }
          onClick={() => {
            auth.user ? navigate("/shelf") : handleAuthClick("signin");
          }}
        >
          <GiBookshelf className="header__icons" />
          Shelf
        </li>
      </ul>
      <div className="header__end">
        <BiSearch className="header__icons" />
        <div>
          <BsTranslate />
          <p>English</p>
        </div>

        <div className="header__end__account__wrap">
          <span
            className="header__end__account"
            onClick={toggleAccountDropdown}
          >
            {auth.user ? (
              <img alt="profile" src={profileImage} />
            ) : (
              <VscAccount className="header__guest__profile" />
            )}

            <GiPoliceBadge className="header__end__account__badge" />
          </span>
          {isAccountDropdown && (
            <div className="dropdown-menu" onClick={handleMenuClick}>
              <span
                className="dropdown__menu__account"
                onClick={toggleAccountDropdown}
              >
                {auth.user ? (
                  <img alt="profile" src={profileImage} />
                ) : (
                  <VscAccount className="dropdown__menu__guest__profile" />
                )}
                {auth.user ? " Ramon Ridwan" : ""}
              </span>
              <span>
                <h3>
                  500 <FaCoins />
                </h3>
                <button onClick={() => handleAuthClick("coin")}>
                  Get more
                </button>
              </span>
              <button onClick={() => handleAuthClick("plan")}>Subscribe</button>
              <ul>
                <li>Be a writer</li>
                <li
                  onClick={() => {
                    navigate("/account-dashboard");
                  }}
                >
                  Account
                </li>
                {auth.user ? (
                  <li onClick={handleLogout}>Sign out</li>
                ) : (
                  <li onClick={() => handleAuthClick("signin")}>Sign in</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <BiMenu
        className="header__menu"
        onClick={() => {
          setMenu(true);
        }}
      />

      <section className={`header__sidebar${menu ? " active" : ""}`}>
        <span className="header__sidebar__head">
          <span className="header__sidebar__account">
            {auth.user ? (
              <img alt="profile" src={profileImage} />
            ) : (
              <VscAccount className="header__guest__profile" />
            )}
            <GiPoliceBadge className="header__end__account__badge" />
          </span>

          <MdClose
            className="header__sidebar__head__close"
            onClick={() => {
              setMenu(false);
            }}
          />
        </span>
        <div className="header__sidebar__body">
          <div className="header__sidebar__menu" onClick={handleMenuClick}>
            <span>
              <h3>
                500 <FaCoins />
              </h3>
              <span>
                <button onClick={() => handleAuthClick("coin")}>
                  Get Coin
                </button>
                <button onClick={() => handleAuthClick("plan")}>
                  Subscribe
                </button>
              </span>
            </span>
            <ul>
              {/* <li
                  onClick={() => {
                    navigate("/account-dashboard");
                  }}
                >
                  Account
                </li> */}
            </ul>
          </div>
          <ul className="header__sidebar__ul">
            <li
              className={location.pathname === "/" ? "header__nav__active" : ""}
              onClick={() => {
                navigate("/");
                setMenu(false);
              }}
            >
              <FaHome className="header__sidebar__icons" /> Home
            </li>
            <li
              className={
                location.pathname === "/genre" ? "header__nav__active" : ""
              }
              onClick={() => {
                navigate("/genre");
                setMenu(false);
              }}
            >
              <BiCategoryAlt className="header__sidebar__icons" /> Genre
            </li>
            <li
              className={
                location.pathname === "/ranking" ? "header__nav__active" : ""
              }
              onClick={() => {
                navigate("/ranking");
                setMenu(false);
              }}
            >
              <FaRankingStar className="header__sidebar__icons" /> Ranking
            </li>
            <li
              className={
                location.pathname === "/create" ? "header__nav__active" : ""
              }
              onClick={() => {
                if (auth.user) {
                  navigate("/create");
                  setMenu(false);
                } else {
                  handleAuthClick("signin");
                }
              }}
            >
              <PiNotePencilDuotone className="header__sidebar__icons" /> Create
            </li>
            <li
              className={
                location.pathname === "/shelf" ? "header__nav__active" : ""
              }
              onClick={() => {
                if (auth.user) {
                  navigate("/shelf");
                  setMenu(false);
                } else {
                  handleAuthClick("signin");
                }
              }}
            >
              <GiBookshelf className="header__sidebar__icons" />
              Shelf
            </li>
            <li
              className={
                location.pathname === "/account-dashboard"
                  ? "header__nav__active"
                  : ""
              }
              onClick={() => {
                navigate("/account-dashboard");
                setMenu(false);
              }}
            >
              <BsPerson className="header__sidebar__icons" />
              Account
            </li>
          </ul>
          {auth.user ? (
            <button
              className="header__sidebar__sign"
              disabled={auth.loading}
              onClick={handleLogout}
            >
              {auth.loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Sign out"
              )}
            </button>
          ) : (
            <button
              className="header__sidebar__sign"
              onClick={() => handleAuthClick("signin")}
            >
              Sign in
            </button>
          )}
        </div>
      </section>

      {/* SIGNIN MODAL */}

      <Modal isOpen={isOpen.signin} onClose={closeModal}>
        <div className="modal__login__container">
          <img src={logo} alt="" />
          <h1>You are welcome</h1>
          <div className="modal__login__container__social__signin">
            <button>
              <img src={google__icon} alt="" />
              Sign in with Google
            </button>
            <button>
              <img src={facebook__icon} alt="" />
              Sign in with Facebook
            </button>
          </div>

          <form
            className="modal__login__container__form"
            onSubmit={handleLogin}
          >
            <input
              name="email"
              type="email"
              value={formData.email}
              important
              placeholder="Enter your email address"
              onChange={(e) => handleChange(e)}
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              important
              placeholder="Enter your password"
              onChange={(e) => handleChange(e)}
            />
            {errorMessage && (
              <h3 className="header__error__message">{errorMessage}</h3>
            )}
            <button type="submit" disabled={auth.loading}>
              {auth.loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                " Sign In"
              )}
            </button>
            <p>
              Forgot password?{" "}
              <span onClick={handleForgetModalSwitch}>Reset Here</span>
            </p>
          </form>
          <p>
            Don't have an account?
            <span onClick={() => handleAuthClick("signup")}>Sign up</span>
          </p>
        </div>
      </Modal>

      {/* SIGNUP MODAL */}

      <Modal isOpen={isOpen.signup} onClose={closeModal}>
        <div className="modal__signup__container">
          <img src={logo} alt="" />
          <h1>Signup</h1>
          <div className="modal__signup__container__social__signin">
            <button>
              <img src={google__icon} alt="" />
              Sign in with Google
            </button>
            <button>
              <img src={facebook__icon} alt="" />
              Sign in with Facebook
            </button>
          </div>

          <form
            className="modal__signup__container__form"
            onSubmit={handleSubmit}
          >
            <input
              name="first_name"
              type="text"
              important
              placeholder="Enter First Name"
              onChange={(e) => handleChange(e)}
            />
            <input
              name="last_name"
              type="text"
              important
              placeholder="Enter Last Name"
              onChange={(e) => handleChange(e)}
            />
            <input
              name="email"
              type="email"
              important
              placeholder="Enter your email address"
              onChange={(e) => handleChange(e)}
            />
            <input
              name="password"
              type="password"
              important
              placeholder="Enter your password"
              onChange={(e) => handleChange(e)}
            />
            <input
              name="re_password"
              type="password"
              important
              placeholder="Confirm password"
              onChange={(e) => handleChange(e)}
            />
            {errorMessage && (
              <h3 className="header__error__message">{errorMessage}</h3>
            )}
            <button type="submit" disabled={auth.loading}>
              {auth.loading ? <ClipLoader color="#fff" size={20} /> : "Sign up"}
            </button>
          </form>
          <p>
            Have an account?{" "}
            <span onClick={() => handleAuthClick("signin")}>Sign in</span>
          </p>
        </div>
      </Modal>
      {/* VERIFY OTP MODAL */}

      <Modal isOpen={isOpen.otp} onClose={closeModal}>
        <div className="modal__login__container">
          <img src={logo} alt="" />
          <h1>Enter OTP</h1>
          <h4 className="otp__form__text">
            A code has been sent to your mail, check and input code below to
            continue
          </h4>

          <form
            className="modal__login__container__form"
            onSubmit={handleVerify}
          >
            <input
              type="number"
              important
              placeholder="Enter otp"
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />

            {errorMessage && (
              <h3 className="login__error__message">{errorMessage}</h3>
            )}
            <button type="submit" disabled={auth.loading}>
              {auth.loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Verify and Proceed"
              )}
            </button>
            <p>
              Didn't get a code? <span onClick={handleResend}>Resend</span>
            </p>
          </form>
        </div>
      </Modal>

      {/* FORGET MODAL */}

      <Modal isOpen={isOpen.forget} onClose={closeModal}>
        <div className="modal__login__container">
          <img src={logo} alt="" />
          <h1>Reset Password</h1>
          <h4 className="otp__form__text">
            Please enter the email address attached to your account
          </h4>

          <form
            className="modal__login__container__form"
            onSubmit={handleForget}
          >
            <input
              type="email"
              important
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            {errorMessage && (
              <h3 className="login__error__message">{errorMessage}</h3>
            )}
            <button type="submit" disabled={auth.loading}>
              {auth.loading ? <ClipLoader color="#fff" size={20} /> : "Submit"}
            </button>
          </form>
        </div>
      </Modal>

      {/* RESET MODAL */}

      <Modal isOpen={isOpen.reset} onClose={closeModal}>
        <div className="modal__login__container">
          <img src={logo} alt="" />
          <h1>Enter New Password</h1>
          <h4 className="otp__form__text">
            Enter a new password different from previously used passwords
          </h4>

          <form
            className="modal__login__container__form"
            onSubmit={handleReset}
          >
            <input
              type="password"
              important
              placeholder="Enter password"
              onClick={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              important
              placeholder="Confirm password"
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
            />

            {errorMessage && (
              <h3 className="login__error__message">{errorMessage}</h3>
            )}
            <button type="submit" disabled={auth.loading}>
              {auth.loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </Modal>

      {/* CHOOSE PLAN MODAL */}

      <Modal isOpen={isOpen.plan} onClose={closeModal}>
        <div className="modal__plan__container">
          <h1>Choose your plan</h1>
          <div className="modal__plan__checkbox__container__wrap">
            <div
              className="modal__plan__checkbox__container"
              onClick={() => setPlan("1 Week")}
            >
              <label className="modal__plan__checkbox__container__label">
                1 Week - $2.99
              </label>
              <span className="modal__plan__checkbox__container__check">
                {" "}
                {plan === "1 Week" ? <FaCheckCircle /> : <FaRegCircle />}
              </span>
            </div>
            <div
              className="modal__plan__checkbox__container"
              onClick={() => setPlan("1 Month")}
            >
              <label className="modal__plan__checkbox__container__label">
                1 Month - $2.99
              </label>
              <span className="modal__plan__checkbox__container__check">
                {" "}
                {plan === "1 Month" ? <FaCheckCircle /> : <FaRegCircle />}
              </span>
            </div>
            <div
              className="modal__plan__checkbox__container"
              onClick={() => setPlan("6 Months")}
            >
              <label className="modal__plan__checkbox__container__label">
                6 Months - $2.99
              </label>
              <span className="modal__plan__checkbox__container__check">
                {" "}
                {plan === "6 Months" ? <FaCheckCircle /> : <FaRegCircle />}
              </span>
            </div>
            <div
              className="modal__plan__checkbox__container"
              onClick={() => setPlan("12 Months")}
            >
              <label className="modal__plan__checkbox__container__label">
                12 Months - $2.99
              </label>
              <span className="modal__plan__checkbox__container__check">
                {" "}
                {plan === "12 Months" ? <FaCheckCircle /> : <FaRegCircle />}
              </span>
            </div>
          </div>
          <button onClick={handleSubscriptionPayment}>
            Continue to payment
          </button>
        </div>
      </Modal>

      {/* CONFIRMATION MODAL */}

      <Modal isOpen={isOpen.confirmation} onClose={closeModal}>
        <div className="modal__confirmation__container">
          <img alt="Confirmation" src={imageConfirmation} />
          <h1>Subscription confirmed!</h1>
          <p>Thank you for subscribing to the weekly plan.</p>
          <p>
            Your subscription has been activated and you will receive an email
            confirmation soon.
          </p>
          <p>Enjoy you favourite stories!</p>
          <button onClick={closeModal}>Continue to read</button>
        </div>
      </Modal>

      {/* GET COIN MODAL */}
      <Modal isOpen={isOpen.coin} onClose={closeModal}>
        <div className="ac__modal__buy">
          <h1>TOP UP COINS</h1>
          <p>Coins can be used to unlock chapters and buy gifts for authors.</p>
          <div className="ac__modal__buy__options">
            <div className="ac__modal__buy__option">
              <span>
                <p>100</p>
                <img src={coin} alt="coin" />
              </span>
              <h3>$0.99</h3>
            </div>
            <div className="ac__modal__buy__option">
              <span>
                <p>300</p>
                <img src={coin} alt="coin" />
              </span>
              <h3>$0.99</h3>
            </div>
            <div className="ac__modal__buy__option">
              <span>
                <p>500</p>
                <img src={coin} alt="coin" />
              </span>
              <h3>$0.99</h3>
            </div>
            <div className="ac__modal__buy__option">
              <span>
                <p>1000</p>
                <img src={coin} alt="coin" />
              </span>
              <h3>$0.99</h3>
            </div>
            <div className="ac__modal__buy__option">
              <span>
                <p>2000</p>
                <img src={coin} alt="coin" />
              </span>
              <h3>$0.99</h3>
            </div>
            <div className="ac__modal__buy__option">
              <span>
                <p>5000</p>
                <img src={coin} alt="coin" />
              </span>
              <h3>$0.99</h3>
            </div>
            <div className="ac__modal__buy__option">
              <span>
                <p>10000</p>
                <img src={coin} alt="coin" />
              </span>
              <h3>$0.99</h3>
            </div>
          </div>
          <button onClick={handleGetCoin}> PAY NOW </button>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
