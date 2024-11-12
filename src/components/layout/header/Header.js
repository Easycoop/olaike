import { BiMenu } from "react-icons/bi";
import "./header.css";
import image1 from "../../../assets/icons/logo-secondary.png";
import image2 from "../../../assets/images/main/profile-image.jpg";
import { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function Header({ handleNav }) {
  const misc = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const location = useLocation();

  const setNav = () => {
    setActive(!active);
    handleNav(active);
  };

  useEffect(() => {
    const _pathname = location.pathname.includes("/main/")
      ? location.pathname.replace("/main/", "")
      : location.pathname;
    dispatch({
      type: "HEADER_PATH",
      payload: _pathname,
    });
    setActive(false);
    if (window.innerWidth < 768) {
      handleNav(true);
    }
  }, [location]);

  return (
    <div className="header">
      <section className="header__sc__one">
        <img src={image1} alt="logo" />
        {active === true ? (
          <MdOutlineClose className="menu" onClick={setNav} />
        ) : (
          <BiMenu className="menu" onClick={setNav} />
        )}
      </section>
      <section className="header__sc__two">
        <div className="header__sc__two__wrap">
          <h4>{misc.headerPath}</h4>
          <div
            className="header__sc__two__profile"
            // onClick={() => navigate("/profile")}
          >
            <p>ID: {user?.id}</p>
            <img alt="profile" src={image2} />
          </div>
          {/* <div>
            <IoNotificationsOutline className="header__sc__two__notification__icon" />
          </div> */}
        </div>
      </section>
    </div>
  );
}

export default Header;
