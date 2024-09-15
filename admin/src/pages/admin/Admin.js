import './Admin.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import gpslogomain from '../../../assets/gpslogomain.png';
import {
  MdCreateNewFolder,
  MdOutlineMessage,
  MdOutlinePayment,
  MdOutlineRealEstateAgent,
} from 'react-icons/md';
import { IoMdArrowDropdown, IoMdDocument, IoMdPersonAdd, IoMdSettings } from 'react-icons/io';
import AuthContext from '../../../context/AuthProvider';
import { BiMenu } from 'react-icons/bi';
import { FaClipboard, FaPowerOff, FaUser, FaUserPlus } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';
import { LuFilePlus2, LuTicket } from 'react-icons/lu';
import { BsFillHouseFill } from 'react-icons/bs';
import { TbTools } from 'react-icons/tb';
import { HiSquaresPlus } from 'react-icons/hi2';
import { PiWarehouseLight } from 'react-icons/pi';
import { FaLaptopHouse } from 'react-icons/fa';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { ScaleLoader } from 'react-spinners';
import DashboardFooter from '../../components/layout/footer/Dashboard.footer';
import DashboardHeader from '../../components/layout/header/Dashboard.header';

function Admin() {
  const { setAuth, isDark, theme } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  const [active, SetActive] = useState(false);
  const [dropdown, setDropdown] = useState({
    create: false,
    applications: false,
  });

  const [path, setPath] = useState('dashboard');
  const logout = async () => {
    try {
      const response = await axiosPrivate.post('api/v1/auth/logout', {
        headers: { 'Content-Type': 'application/json' },
      });
      setAuth({});
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const [colorId, setColorId] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const cssDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: isDark ? '#fff' : '#000',
    background: isDark ? '#121212' : '#000',
  };
  return (
    <>
      {isLoading ? (
        <div style={cssDiv}>
          <ScaleLoader color={isDark ? '#fff' : '#000'} />
        </div>
      ) : (
        <div
          className="dashboard"
          data-theme={isDark ? 'dark' : 'light'}
          theme={theme ? `${theme}` : '#008000'}
        >
          <div className={active ? 'dashboard__navbar active' : 'dashboard__navbar'}>
            <section className="dashboard__navbar__section__one">
              <img
                src={gpslogomain}
                alt=""
                className={active ? 'dashboard__header__logo active' : 'dashboard__header__logo'}
              />
              <BiMenu
                className={active ? 'dashboard__menu active' : 'dashboard__menu'}
                onClick={() => SetActive(!active)}
              />
            </section>
            <section className="dashboard__navbar__section__two">
              <div
                onClick={() => {
                  setPath('Dashboard');
                  navigate('/admin/dashboard');
                  setColorId(1);
                }}
                className={colorId === 1 ? 'dashboard__navbar__active' : ''}
              >
                <RiDashboardFill className="dashboard__navbar__icon" />
                <h3>Dashboard</h3>
              </div>
              <div
                onClick={() => {
                  setPath('User');
                  navigate('/admin/users');
                  setColorId(2);
                }}
                className={colorId === 2 ? 'dashboard__navbar__active' : ''}
              >
                <FaUser className="dashboard__navbar__icon" />
                <h3>Users</h3>
              </div>
              <div
                onClick={() => {
                  setPath('Transactions');
                  navigate('/admin/transaction');
                  setColorId(3);
                }}
                className={colorId === 3 ? 'dashboard__navbar__active' : ''}
              >
                <MdOutlinePayment className="dashboard__navbar__icon" />
                <h3>Transaction</h3>
              </div>
              <div
                onClick={() => {
                  setPath('Tickets');
                  navigate('/admin/tickets');
                  setColorId(4);
                }}
                className={colorId === 4 ? 'dashboard__navbar__active' : ''}
              >
                <LuTicket className="dashboard__navbar__icon" />
                <h3>Tickets</h3>
              </div>
              <div
                onClick={() => {
                  setPath('Properties');
                  navigate('/admin/properties');
                  setColorId(5);
                }}
                className={colorId === 5 ? 'dashboard__navbar__active' : ''}
              >
                <BsFillHouseFill className="dashboard__navbar__icon" />
                <h3>Properties</h3>
              </div>
              <div
                onClick={() => {
                  setPath('Messages');

                  navigate('/admin/message');
                  setColorId(6);
                }}
                className={colorId === 6 ? 'dashboard__navbar__active' : ''}
              >
                <MdOutlineMessage className="dashboard__navbar__icon" />
                <h3>Messages</h3>
              </div>
              <div
                onClick={() => {
                  setPath('Schedule');

                  navigate('admin/utility/schedule');
                  setColorId(7);
                }}
                className={colorId === 7 ? 'dashboard__navbar__active' : ''}
              >
                <TbTools className="dashboard__navbar__icon" />
                <h3>Utilities</h3>
              </div>
              <div
                onClick={() => {
                  setPath('Notice board');

                  navigate('/admin/notice-board');
                  setColorId(8);
                }}
                className={colorId === 8 ? 'dashboard__navbar__active' : ''}
              >
                <FaClipboard className="dashboard__navbar__icon" />
                <h3>Notice board</h3>
              </div>
              <div
                onClick={() => {
                  setDropdown((prevState) => ({
                    ...prevState,
                    create: !dropdown.create,
                  }));
                }}
                className="dashboard__navbar__dropdown"
              >
                <MdCreateNewFolder className="dashboard__navbar__icon" />
                <h3>Create</h3>
                <span>
                  <IoMdArrowDropdown />
                </span>
              </div>
              <article
                className={
                  dropdown.create
                    ? 'dashboard__navbar__submenu active'
                    : 'dashboard__navbar__submenu'
                }
              >
                <h3
                  onClick={() => {
                    setPath('Create user');
                    setColorId(9);
                    navigate('/admin/create-user');
                  }}
                  className={colorId === 9 ? 'dashboard__navbar__active' : ''}
                >
                  <FaUserPlus className="dashboard__navbar__icon__submenu" />{' '}
                  <span>Create new user</span>
                </h3>
                <h3
                  onClick={() => {
                    setPath('Create property');
                    setColorId(10);
                    navigate('/admin/create-property');
                  }}
                  className={colorId === 10 ? 'dashboard__navbar__active' : ''}
                >
                  <HiSquaresPlus className="dashboard__navbar__icon__submenu" />{' '}
                  <span>Create new property</span>
                </h3>
                <h3
                  onClick={() => {
                    setPath('Create ticket');
                    setColorId(11);
                    navigate('/admin/create-ticket');
                  }}
                  className={colorId === 11 ? 'dashboard__navbar__active' : ''}
                >
                  <LuFilePlus2 className="dashboard__navbar__icon__submenu" />{' '}
                  <span>Create new ticket</span>
                </h3>
              </article>
              <div
                onClick={() => {
                  setDropdown((prevState) => ({
                    ...prevState,
                    applications: !dropdown.applications,
                  }));
                }}
                className="dashboard__navbar__dropdown"
              >
                <IoMdDocument className="dashboard__navbar__icon" />
                <h3>Applications </h3>
                <span>
                  <IoMdArrowDropdown />
                </span>
              </div>
              <article
                className={
                  dropdown.applications
                    ? 'dashboard__navbar__submenu active'
                    : 'dashboard__navbar__submenu'
                }
              >
                <h3
                  onClick={() => {
                    setPath('Student applications');
                    setColorId(12);
                    navigate('/admin/student-applications');
                  }}
                  className={colorId === 12 ? 'dashboard__navbar__active' : ''}
                >
                  <IoMdPersonAdd className="dashboard__navbar__icon__submenu" />
                  <span>Student applications</span>
                </h3>
                <h3
                  onClick={() => {
                    setPath('Agency applications');
                    setColorId(13);
                    navigate('/admin/agency-applications');
                  }}
                  className={colorId === 13 ? 'dashboard__navbar__active' : ''}
                >
                  <FaLaptopHouse className="dashboard__navbar__icon__submenu" />
                  <span>Agency applications</span>
                </h3>
                <h3
                  onClick={() => {
                    setPath('agent applications');
                    setColorId(14);
                    navigate('/admin/agent-applications');
                  }}
                  className={colorId === 14 ? 'dashboard__navbar__active' : ''}
                >
                  <MdOutlineRealEstateAgent className="dashboard__navbar__icon__submenu" />{' '}
                  <span>Agent applications</span>
                </h3>
                <h3
                  onClick={() => {
                    setPath('Property applications');
                    setColorId(15);
                    navigate('/admin/property-applications');
                  }}
                  className={colorId === 15 ? 'dashboard__navbar__active' : ''}
                >
                  <PiWarehouseLight className="dashboard__navbar__icon__submenu" />{' '}
                  <span>Property applications</span>
                </h3>
              </article>
            </section>
            <section className="dashboard__navbar__section__three">
              <div
                onClick={() => {
                  navigate('/admin/setting');
                  setColorId(16);
                }}
                className={colorId === 16 ? 'dashboard__navbar__active' : ''}
              >
                <IoMdSettings className="dashboard__navbar__icon" />
                <h3>Settings</h3>
              </div>
              <div onClick={logout} className={colorId === 77 ? 'dashboard__navbar__active' : ''}>
                <FaPowerOff className="dashboard__navbar__icon" />
                <h3>Logout</h3>
              </div>
            </section>
          </div>
          <div>
            <div className={active ? 'dashboard__outlet active' : 'dashboard__outlet'}>
              <DashboardHeader path={path} />
              <Outlet />
              <DashboardFooter />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
