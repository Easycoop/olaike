import { BiUser } from 'react-icons/bi';
import './Admin.dashboard.css';
import { BsHouse } from 'react-icons/bs';
import { MdOutlinePayment } from 'react-icons/md';
import { IoMdDocument } from 'react-icons/io';
import Chart from 'react-apexcharts';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { RiAsterisk } from 'react-icons/ri';
import AuthContext from '../../../context/AuthProvider';
import { axiosPrivate } from '../../../api/axios';
import { ScaleLoader } from 'react-spinners';

function AdminDashboard() {
  const { chartTheme, auth, setAuth, isDark } = useContext(AuthContext);

  //Charts data
  const [chart, setChart] = useState({
    options: {
      colors: [`${chartTheme.primaryColor}`, `${chartTheme.secondaryColor}`],

      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },

    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: 'series-2',
        data: [9, 60, 25, 30, 44, 30, 74, 102],
      },
    ],
  });
  const [chart2, setChart2] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      // xaxis: {
      //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      // },
    },
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    },
  });

  const [propertyResult, setPropertyResult] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [totalUsers, setTotalUsers] = useState(null);
  const [notice, setNotice] = useState([]);
  const [totalNotice, setTotalNotice] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [pendingStApplications, setPendingStApplications] = useState(0);
  const [pendingPropertyApplications, setPendingPropertyApplications] = useState(0);

  const observer = useRef();

  // INTERSECTION OBSERVER THAT INCREASS THE PAGE NUMBER BY ONE EVERY TIME THE LAST ELEMENT OF THE RETURNED PAGINATED PROPERTY RESULT APPEARS ONS CREEN
  const lastProperty = useCallback(
    (node) => {
      // if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (loading) {
            setPageNumber((pageNumber) => pageNumber + 1);
          } else if (!loading) {
            setPageNumber(1);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/property/search?`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        // setPropertyResult(res.properties);
        setTotalResult(res.totalItems);
        setLoading(true);
        setHasMore(pageNumber < res.totalPages);
        setAuth((prev) => ({ ...prev, properties: res.properties }));
      } catch (error) {
        console.log(error);
      }
    };

    const getTrendingProperties = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/property/trending`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setPropertyResult(res);
      } catch (error) {
        console.log(error);
      }
    };

    const getTotalUsers = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/user/total-users`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setTotalUsers(res);
      } catch (error) {
        console.log(error);
      }
    };

    const getNotices = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/notice/notices`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setNotice(res.notices);
        setTotalNotice(res.totalItems);
      } catch (error) {
        console.log(error);
      }
    };

    const getTotalOpenTickets = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/ticket/total-tickets`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setTicket(res);
      } catch (error) {
        console.log(error);
      }
    };

    const getTotalPendingStudentApplications = async () => {
      try {
        const response = await axiosPrivate.get(
          `api/v1/applications/pending-student-applications`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        );
        const res = response.data.data;
        setPendingStApplications(res);
      } catch (error) {
        console.log(error);
      }
    };

    const getTotalPendingPropertyApplications = async () => {
      try {
        const response = await axiosPrivate.get(
          `api/v1/applications/pending-property-applications`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        );
        const res = response.data.data;
        console.log(res);
        setPendingPropertyApplications(res);
      } catch (error) {
        console.log(error);
      }
    };

    getTotalOpenTickets();
    getTrendingProperties();
    getProperties();
    getTotalUsers();
    getNotices();
    getTotalPendingStudentApplications();
    getTotalPendingPropertyApplications();

    return;
  }, []);

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
        <div className="admin__dashboard">
          <section className="admin__dashboard__section__one">
            <div className="admin__dashboard__section__one__seg">
              <span>
                Total no. of users{' '}
                <BiUser className="admin__dashboard__section__one__seg__icon one" />
              </span>
              <h1>{totalUsers}</h1>
            </div>
            <div className="admin__dashboard__section__one__seg">
              <span>
                Total no. of properties{' '}
                <BsHouse className="admin__dashboard__section__one__seg__icon two" />
              </span>
              <h1>{totalResult}</h1>
            </div>
            <div className="admin__dashboard__section__one__seg">
              <span>
                Gross transaction volume{' '}
                <MdOutlinePayment className="admin__dashboard__section__one__seg__icon three" />
              </span>
              <h1>#6,298,1454</h1>
            </div>
            <div className="admin__dashboard__section__one__seg">
              <span>
                Pending property applications{' '}
                <IoMdDocument className="admin__dashboard__section__one__seg__icon four" />
              </span>
              <h1>{pendingPropertyApplications.length}</h1>
            </div>
          </section>
          <section className="admin__dashboard__section__two">
            <div className="admin__dashboard__section__two__seg1">
              <h3>{auth.user.full_name}</h3>
              <h4>{auth.user.role}</h4>

              <p>User ID: {auth.user.id}</p>
              <span>
                <div>
                  <h3>Open tickets</h3>
                  <h4>{ticket.length}</h4>
                </div>
                <div>
                  <h3>Student applications</h3>
                  <h4>{pendingStApplications.length}</h4>
                </div>
                {/* <div>
              <h3>Open tickets</h3>
              <h4>2</h4>
            </div> */}
              </span>
              <div className="admin__dashboard__section__two__seg1__notice">
                <h3>
                  Recent notice{' '}
                  <RiAsterisk className="admin__message__conversation__section__two__icons" />
                </h3>
                <div>
                  <div>
                    <h3>Mar</h3>
                    <h4>15</h4>
                  </div>
                  <p>{notice[0] && notice[0].heading}</p>
                </div>
                <div>
                  <div>
                    <h3>Mar</h3>
                    <h4>7</h4>
                  </div>
                  <p>{notice[1] && notice[1].heading}</p>
                </div>
              </div>
            </div>
            <div className="admin__dashboard__section__two__seg2">
              <Chart options={chart.options} series={chart.series} type="bar" width="100%" />
            </div>
            <div className="admin__dashboard__section__two__seg3">
              <Chart options={chart.options} series={chart.series} type="scatter" width="100%" />
            </div>
          </section>
          <section className="admin__dashboard__section__three">
            <div className="admin__dashboard__section__three__seg1">
              <Chart options={chart.options} series={chart.series} type="line" width="100%" />
              {/* <Chart options={chart2.options} series={chart2.series} type="donut" width="100%" /> */}
            </div>
            <div className="admin__dashboard__section__three__seg2">
              <h1>Trending properties</h1>
              <div className="admin__dashboard__section__three__seg2__header">
                <h1 className="admin__dashboard__section__three__seg2__header__id">Property ID</h1>
                <h1 className="admin__dashboard__section__three__seg2__header__title">Title</h1>
                <h1 className="admin__dashboard__section__three__seg2__header__views">Views</h1>
                <h1 className="admin__dashboard__section__three__seg2__header__propertytype">
                  Property type
                </h1>

                <h1 className="admin__dashboard__section__three__seg2__header__userid">User ID</h1>
                <h1 className="admin__dashboard__section__three__seg2__header__ranking">
                  Rankings
                </h1>
              </div>
              {propertyResult.map((item, i) => {
                if (propertyResult.length === i + 1) {
                  return (
                    <div
                      className="admin__dashboard__section__three__seg2__entry"
                      ref={lastProperty}
                    >
                      <h1 className="admin__dashboard__section__three__seg2__entry__id">
                        {propertyResult[i].id}
                      </h1>
                      <h1 className="admin__dashboard__section__three__seg2__entry__title">
                        {propertyResult[i].title}
                      </h1>
                      <h1 className="admin__dashboard__section__three__seg2__entry__views">
                        {propertyResult[i].views}
                      </h1>

                      <h1 className="admin__dashboard__section__three__seg2__entry__propertytype">
                        {propertyResult[i].property_type}
                      </h1>
                      <h1 className="admin__dashboard__section__three__seg2__entry__userid">
                        {propertyResult[i].userId}
                      </h1>
                      <h1 className="admin__dashboard__section__three__seg2__entry__ranking">
                        {i + 1}
                      </h1>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="admin__dashboard__section__three__seg2__entry"
                      ref={lastProperty}
                    >
                      <h1 className="admin__dashboard__section__three__seg2__entry__id">
                        {propertyResult[i].id}
                      </h1>
                      <h1 className="admin__dashboard__section__three__seg2__entry__title">
                        {propertyResult[i].title}
                      </h1>
                      <h1 className="admin__dashboard__section__three__seg2__entry__views">
                        {propertyResult[i].views}
                      </h1>

                      <h1 className="admin__dashboard__section__three__seg2__entry__propertytype">
                        {propertyResult[i].property_type}
                      </h1>
                      <h1 className="admin__dashboard__section__three__seg2__entry__userid">
                        {propertyResult[i].userId}
                      </h1>
                      <h1 className="admin__dashboard__section__three__seg2__entry__ranking">
                        {i + 1}
                      </h1>
                    </div>
                  );
                }
              })}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
