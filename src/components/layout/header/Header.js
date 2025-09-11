import { BiMenu } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import "./Header.css";
import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ConfigContext } from "../../../context/ConfigProvider";

function Header({ handleNav, isSidebarActive }) {
  const misc = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);
  const { config } = useContext(ConfigContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // toggle sidebar
  const toggleSidebar = () => {
    handleNav(!isSidebarActive);
  };

  // update header path when route changes
  useEffect(() => {
    const _pathname = location.pathname.includes("/main/")
      ? location.pathname.replace("/main/", "")
      : location.pathname;

    dispatch({
      type: "HEADER_PATH",
      payload: _pathname,
    });

    // collapse sidebar automatically on small screens
    if (window.innerWidth < 768) {
      handleNav(true); // hide sidebar
    }
  }, [location, dispatch, handleNav]);

  return (
    <div className="header">
      {/* <section className="header__sc__one">
        <img src={config?.logos?.text_logo_white} alt="logo" />
      </section> */}

      <section className="header__sc__two">
        <div className="header__sc__two__wrap">
          <h4>{misc.headerPath}</h4>

          <div className="header__sc__two__profile">
            <p>{user?.firstName} {user?.lastName}</p>
            <img alt="profile" src="/user-avatar.webp" style={{ objectPosition: "top" }} />
          </div>

          {/* Toggle button moved here */}
          <div className="header__sc__two__toggle">
            {isSidebarActive ? (
              <MdOutlineClose className="menu" onClick={toggleSidebar} />
            ) : (
              <BiMenu className="menu" onClick={toggleSidebar} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
