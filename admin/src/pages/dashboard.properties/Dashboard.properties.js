import './Dashboard.properties.css';
import { BiEdit, BiSearch } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Modal from '../../../user/components/modal/Modal';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../../context/AuthProvider';
import { axiosPrivate } from '../../../api/axios';
import Toaster from '../../../utils/toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

function DashboardProperties() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [toaster, setToaster] = useState(false);
  const [message, setMessage] = useState('');
  const [bgcolor, setbgcolor] = useState('');
  const closeModal = () => {
    setIsOpen(false);
  };
  const { auth, setAuth, propertyId, setPropertyId, isDark } = useContext(AuthContext);
  const [propertyResult, setPropertyResult] = useState([]);
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
    propertyType: null,
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
  //maps through the filter state and requrn a query string for filtered selection
  Object.keys(filter).forEach(function (key, index) {
    if (filter[key]) {
      queryString = queryString + `${key}=${filter[key]}&`;
    }
  });

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

  //TRIGGERS WHEN THE LAST ELEMENT OF THE RETURNED PROPERTY RESULT IS REACHED; HENCE INFINITE SCROLLING
  useEffect(() => {
    if (loading && hasMore) {
      try {
        const response = axiosPrivate.get(`api/v1/property/search?${queryString}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        response.then((response) => {
          const res = response.data.data;
          const newPropertyResult = propertyResult.concat(res.properties);
          setPropertyResult(newPropertyResult);
          setHasMore(pageNumber < res.totalPages);
          closeModal();
          setAuth((prev) => ({ ...prev, properties: res.properties }));
        });
      } catch (error) {
        console.log(error);
        setError(true);
      }
    } else if (!hasMore) {
      setLoading(false);
    } else return;
  }, [pageNumber]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/property/search?`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setPropertyResult(res.properties);
        setTotalResult(res.totalItems);
        setLoading(true);
        setHasMore(pageNumber < res.totalPages);
        setAuth((prev) => ({ ...prev, properties: res.properties }));
      } catch (error) {
        console.log(error);
      }
    };

    getProperties();

    return;
  }, []);

  const search = async () => {
    try {
      const response = await axiosPrivate.get(`api/v1/property/search?`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const res = response.data.data;
      setPropertyResult(res.properties);
      setTotalResult(res.totalItems);
      setAuth((prev) => ({ ...prev, properties: res.properties }));
      closeModal();
      setLoading(true);
      setHasMore(pageNumber <= res.totalPages);
      setError(false);
      Object.keys(filter).forEach(function (key, index) {
        if (filter[key]) {
          filter[key] = null;
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deleteProperty = async (id) => {
    try {
      const response = await axiosPrivate.delete(`api/v1/property/delete-property/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const res = response.data;

      if (res.message == 'Product deleted successfully') {
        setToaster(true);
        setbgcolor('green');
        setMessage('Product deleted successfully');
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
      await search();
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
        <div className="dashboard__properties">
          {toaster ? <Toaster message={message} bgcolor={bgcolor} /> : <div></div>}

          <section className="dashboard__properties__section__one">
            <div className="dashboard__properties__search">
              <input placeholder="Enter user name" />
              <BiSearch className="admin__message__section__one__search__icon" />

              {/* <button>Search</button> */}
            </div>
            <h3>Number of properties: {totalResult}</h3>
            <div className="dashboard__properties__end">
              <div className="dashboard__properties__end__filter">
                {/* <BsFilterLeft className="dashboard__properties__end__icon" /> */}
                <div></div>
              </div>
              {/* <button>Export</button> */}
              <button
                onClick={() => {
                  navigate('/admin/create-property');
                }}
              >
                Create property
              </button>
            </div>
          </section>
          <section className="dashboard__properties__section__two">
            <div className="dashboard__properties__section__two__header">
              <h1 className="dashboard__properties__section__two__header__id">ID</h1>
              <h1 className="dashboard__properties__section__two__header__title">Title</h1>
              <h1 className="dashboard__properties__section__two__header__category">Category</h1>
              <h1 className="dashboard__properties__section__two__header__status">Status</h1>
              <h1 className="dashboard__properties__section__two__header__propertytype">
                Property type
              </h1>
              <h1 className="dashboard__properties__section__two__header__userid">UserId</h1>
              <h1 className="dashboard__properties__section__two__header__created">Created</h1>
              <h1 className="dashboard__properties__section__two__header__action">Action</h1>
            </div>
            {propertyResult.map((item, i) => {
              if (propertyResult.length === i + 1) {
                return (
                  <div className="dashboard__properties__section__two__entry" ref={lastProperty}>
                    <h1
                      className="dashboard__properties__section__two__entry__id"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].id}
                    </h1>
                    <h1
                      className="dashboard__properties__section__two__entry__title"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].title}
                    </h1>
                    <h1
                      className="dashboard__properties__section__two__entry__category"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].category}
                    </h1>
                    <h1
                      className="dashboard__properties__section__two__entry__status"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].price}
                    </h1>
                    <h1 className="dashboard__properties__section__two__entry__propertytype">
                      {propertyResult[i].property_type}
                    </h1>
                    <h1
                      className="dashboard__properties__section__two__entry__userid"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].userId}
                    </h1>
                    <h1
                      className="dashboard__properties__section__two__entry__created"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].createdAt}
                    </h1>
                    <h1 className="dashboard__properties__section__two__entry__action">
                      <span>
                        <BiEdit
                          className="dashboard__properties__section__two__entry__action__icon"
                          onClick={() => {
                            setPropertyId(propertyResult[i].id);
                            navigate('/admin/edit-property');
                          }}
                        />{' '}
                        <MdDelete
                          className="dashboard__properties__section__two__entry__action__icon"
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
                  <div className="dashboard__properties__section__two__entry">
                    <h1
                      className="dashboard__properties__section__two__entry__id"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].id}
                    </h1>
                    <h1
                      className="dashboard__properties__section__two__entry__title"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].title}
                    </h1>
                    <h1
                      className="dashboard__properties__section__two__entry__category"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].category}
                    </h1>
                    <h1
                      className="dashboard__properties__section__two__entry__status"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].price}
                    </h1>
                    <h1
                      className="dashboard__properties__section__two__entry__propertytype"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].property_type}
                    </h1>
                    <h1
                      className="dashboard__properties__section__two__entry__userid"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].userId}
                    </h1>
                    <h1
                      className="dashboard__properties__section__two__entry__created"
                      onClick={() => {
                        setPropertyId(propertyResult[i].id);
                        navigate('/admin/property');
                      }}
                    >
                      {propertyResult[i].createdAt}
                    </h1>
                    <h1 className="dashboard__properties__section__two__entry__action">
                      <span>
                        <BiEdit
                          className="dashboard__properties__section__two__entry__action__icon"
                          onClick={() => {
                            setPropertyId(propertyResult[i].id);
                            navigate('/admin/edit-property');
                          }}
                        />
                        <MdDelete
                          className="dashboard__properties__section__two__entry__action__icon"
                          onClick={() => {
                            setDeleteId(propertyResult[i].id);
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
                <h1>Are you sure you want to delete this property?</h1>
                <p>Property records and data will be deleted permanently and cannot be recovered</p>
                <div>
                  <button
                    onClick={() => {
                      deleteProperty(deleteId);
                    }}
                  >
                    Delete property
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

export default DashboardProperties;
