import './Dashboard.user.css';
import { BiEdit, BiSearch } from 'react-icons/bi';
import Modal from '../../../user/components/modal/Modal';
import { PiCircleFill } from 'react-icons/pi';
import { MdDelete } from 'react-icons/md';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../../context/AuthProvider';
import { axiosPrivate } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

function DashboardUser() {
  const { auth, setAuth, userId, setUserId, isDark } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();

  const [deleteId, setDeleteId] = useState();
  const [toaster, setToaster] = useState(false);
  const [message, setMessage] = useState('');
  const [bgcolor, setbgcolor] = useState('');

  const [userResult, setUserResult] = useState([]);
  const [totalResult, setTotalResult] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState({
    keyWord: null,
    bedrooms: null,
    bathrooms: null,
    minPrice: null,
    maxPrice: null,
    country: null,
    state: null,
    city: null,
    category: null,
    title: null,
    userType: null,
    yearBuilt: null,
    landSize: null,
    buildingSize: null,
    parkingSize: null,
    garageSize: null,
    cordinates: null,
    views: null,
    tags: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();

  let queryString = `page=${pageNumber}&size=10&`;
  //maps through the filter state and return a query string for filtered selection
  Object.keys(filter).forEach(function (key, index) {
    if (filter[key]) {
      queryString = queryString + `${key}=${filter[key]}&`;
    }
  });

  // INTERSECTION OBSERVER THAT INCREASS THE PAGE NUMBER BY ONE EVERY TIME THE LAST ELEMENT OF THE RETURNED PAGINATED user RESULT APPEARS ONS CREEN
  const lastUser = useCallback(
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

  //TRIGGERS WHEN THE LAST ELEMENT OF THE RETURNED user RESULT IS REACHED; HENCE INFINITE SCROLLING
  // useEffect(() => {
  //   // console.log(pageNumber);
  //   if (loading && hasMore) {
  //     try {
  //       const response = axiosPrivate.get(`api/v1/user/search?${queryString}`, {
  //         headers: { 'Content-Type': 'application/json' },
  //         withCredentials: true,
  //       });
  //       response.then((response) => {
  //         const res = response.data.data;
  //         const newUserResult = userResult.concat(res.users);
  //         setUserResult(newUserResult);
  //         setHasMore(pageNumber < res.totalPages);
  //         closeModal();
  //         setAuth((prev) => ({ ...prev, users: res.users }));

  //         console.log(userResult);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       setError(true);
  //     }
  //   } else if (!hasMore) {
  //     setLoading(false);
  //   } else return;
  // }, [pageNumber]);

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get(`api/v1/user/search?`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const res = response.data.data;
      setUserResult(res.users);
      setTotalResult(res.totalItems);
      setLoading(true);
      setHasMore(pageNumber < res.totalPages);
      setAuth((prev) => ({ ...prev, users: res.users }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();

    return;
  }, []);

  // const search = async () => {
  //   try {
  //     const response = await axiosPrivate.get(`api/v1/user/search?`, {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     });
  //     const res = response.data.data;
  //     setUserResult(res.users);
  //     setTotalResult(res.totalItems);
  //     setAuth((prev) => ({ ...prev, users: res.users }));
  //     closeModal();
  //     setLoading(true);
  //     setHasMore(pageNumber <= res.totalPages);
  //     setError(false);
  //     Object.keys(filter).forEach(function (key, index) {
  //       if (filter[key]) {
  //         filter[key] = null;
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // };

  const deleteUser = async (id) => {
    try {
      const response = await axiosPrivate.delete(`api/v1/user/delete-user/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const res = response.data;

      if (res.message == 'User deleted successfully') {
        setToaster(true);
        setbgcolor('green');
        setMessage('User deleted successfully');
        setTimeout(() => {
          setToaster(false);
        }, 5000);
      } else {
        setToaster(true);
        setbgcolor('red');
        setMessage('Unsuccessful query');
        setTimeout(() => {
          setToaster(false);
        }, 5000);
      }
      closeModal();
      getUsers();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

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
        <div className="dashboard__users">
          <section className="dashboard__users__section__one">
            <div className="dashboard__users__search">
              <input placeholder="Enter user name" />
              <BiSearch className="admin__message__section__one__search__icon" />
              {/* <button>Search</button> */}
            </div>
            <h3>Number of users: {totalResult}</h3>
            <div className="dashboard__users__end">
              <div className="dashboard__users__end__filter">
                {/* <BsFilterLeft className="dashboard__users__end__icon" /> */}
                <div></div>
              </div>
              {/* <button>Export</button> */}
              <button
                onClick={() => {
                  navigate('/admin/create-user');
                }}
              >
                Create user
              </button>
            </div>
          </section>
          <section className="dashboard__users__section__two">
            <div className="dashboard__users__section__two__header">
              <h1 className="dashboard__users__section__two__header__id">ID</h1>
              <h1 className="dashboard__users__section__two__header__name">Name</h1>
              <h1 className="dashboard__users__section__two__header__email">Email</h1>
              <h1 className="dashboard__users__section__two__header__role">Role</h1>
              <h1 className="dashboard__users__section__two__header__status">Status</h1>
              <h1 className="dashboard__users__section__two__header__created">Created</h1>
              <h1 className="dashboard__users__section__two__header__action">Action</h1>
            </div>
            {userResult.map((item, i) => {
              if (userResult.length === i + 1) {
                return (
                  <div className="dashboard__users__section__two__entry" ref={lastUser}>
                    <h1
                      className="dashboard__users__section__two__entry__id"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      {userResult[i].id}
                    </h1>
                    <h1
                      className="dashboard__users__section__two__entry__name"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      {userResult[i].full_name}
                    </h1>
                    <h1
                      className="dashboard__users__section__two__entry__email"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      {userResult[i].email}
                    </h1>
                    <h1
                      className="dashboard__users__section__two__entry__role"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      {userResult[i].role}
                    </h1>
                    <h1
                      className="dashboard__users__section__two__entry__status"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      <span>
                        <PiCircleFill
                          className={
                            userResult[i].is_verified
                              ? 'ad__student__app__section__two__entry__status__icon successful'
                              : 'ad__student__app__section__two__entry__status__icon unsuccessful'
                          }
                        />{' '}
                        {userResult[i].is_verified ? 'Verified' : 'Not verified'}
                      </span>
                    </h1>
                    <h1
                      className="dashboard__users__section__two__entry__created"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      {userResult[i].createdAt}
                    </h1>
                    <h1 className="dashboard__users__section__two__entry__action">
                      <span>
                        <BiEdit
                          className="dashboard__users__section__two__entry__action__icon"
                          onClick={() => navigate('/admin/edit-user')}
                        />{' '}
                        <MdDelete
                          className="dashboard__users__section__two__entry__action__icon"
                          onClick={() => {
                            setIsOpen(true);
                          }}
                        />
                      </span>
                    </h1>
                  </div>
                );
              } else {
                return (
                  <div className="dashboard__users__section__two__entry">
                    <h1
                      className="dashboard__users__section__two__entry__id"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      {userResult[i].id}
                    </h1>
                    <h1
                      className="dashboard__users__section__two__entry__name"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      {userResult[i].full_name}
                    </h1>
                    <h1
                      className="dashboard__users__section__two__entry__email"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      {userResult[i].email}
                    </h1>
                    <h1
                      className="dashboard__users__section__two__entry__role"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      {userResult[i].role}
                    </h1>
                    <h1
                      className="dashboard__users__section__two__entry__status"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      <span>
                        <PiCircleFill
                          className={
                            userResult[i].is_verified
                              ? 'ad__student__app__section__two__entry__status__icon successful'
                              : 'ad__student__app__section__two__entry__status__icon unsuccessful'
                          }
                        />{' '}
                        {userResult[i].is_verified ? 'Verified' : 'Not verified'}
                      </span>
                    </h1>
                    <h1
                      className="dashboard__users__section__two__entry__created"
                      onClick={() => {
                        setUserId(userResult[i].id);
                        navigate('/admin/user');
                      }}
                    >
                      {userResult[i].createdAt}
                    </h1>

                    <h1 className="dashboard__users__section__two__entry__action">
                      <span>
                        <BiEdit className="dashboard__users__section__two__entry__action__icon" />
                        <MdDelete
                          className="dashboard__users__section__two__entry__action__icon"
                          onClick={() => {
                            setDeleteId(userResult[i].id);
                            setIsOpen(true);
                          }}
                        />
                      </span>
                    </h1>
                  </div>
                );
              }
            })}
          </section>

          <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="">
              <div className="admin__delete__confirmation">
                <h1>Are you sure you want to delete this user?</h1>
                <p>User records and data will be deleted permanently and cannot be recovered</p>
                <div>
                  <button
                    onClick={() => {
                      deleteUser(deleteId);
                    }}
                  >
                    Delete user
                  </button>
                  <button onClick={closeModal}>Cancel</button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

export default DashboardUser;
