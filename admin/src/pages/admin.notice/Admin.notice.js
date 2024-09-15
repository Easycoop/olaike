import { BiEdit, BiExport, BiSearch } from 'react-icons/bi';
import './Admin.notice.css';
import { PiPlus } from 'react-icons/pi';
import { MdDelete } from 'react-icons/md';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';
import AuthContext from '../../../context/AuthProvider';
import { ScaleLoader } from 'react-spinners';

function AdminNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const [newNotice, setNewNotice] = useState(false);

  const { auth, setAuth, noticeId, setNoticeId, isDark } = useContext(AuthContext);
  const [result, setResult] = useState([]);
  const [totalResult, setTotalResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef();

  const [to, setTo] = useState('Employees');
  const [department, setDepartment] = useState(null);
  const [heading, setHeading] = useState(null);
  const [description, setDescription] = useState(null);

  const navigate = useNavigate();

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
    getNotices();

    return;
  }, []);

  const getNotices = async () => {
    try {
      const response = await axiosPrivate.get(`api/v1/notice/notices`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const res = response.data.data;
      setResult(res.notices);
      setTotalResult(res.totalItems);
      setLoading(true);
      setHasMore(pageNumber < res.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const saveNotice = async () => {
    try {
      const response = await axiosPrivate.post(
        'api/v1/notice/new-notice',
        JSON.stringify({
          senderName: auth.user.full_name,
          department: department,
          to: to,
          senderId: auth.user.id,
          email: auth.user.email,
          description: description,
          heading: heading,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );

      setTo(null);
      setDepartment(null);
      setHeading(null);
      setDescription(null);
      getNotices();
      setNewNotice(!newNotice);
    } catch (err) {
      if (!err?.response) {
        console.log('No server response');
      } else if (err.response.status === 401) {
        console.log('Unauthorized');
      }
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
        <div className="admin__notice">
          <section className="admin__notice__section__one">
            <div className="admin__message__section__one__search">
              <input placeholder="Type to search notice board" />
              <BiSearch className="admin__message__section__one__search__icon" />
            </div>
          </section>
          <section className="admin__notice__section__two">
            <article className="admin__notice__section__two__article1">
              <button
                onClick={() => {
                  setNewNotice(!newNotice);
                }}
              >
                <PiPlus className="admin__message__section__one__end__icon" /> Add new notice
              </button>
            </article>
            <article className="admin__notice__section__two__article2">
              <div className="admin__notice__section__two__article2__header">
                <h1 className="admin__notice__section__two__article2__header__serial">Serial</h1>
                <h1 className="admin__notice__section__two__article2__header__notice">
                  Notice header
                </h1>
                <h1 className="admin__notice__section__two__article2__header__date">Date</h1>
                <h1 className="admin__notice__section__two__article2__header__to">To</h1>
                <h1 className="admin__notice__section__two__article2__header__action">
                  Department
                </h1>
              </div>

              {result.map((item, i) => {
                if (result.length === i + 1) {
                  return (
                    <div
                      className="admin__notice__section__two__article2__entry"
                      onClick={() => {
                        setNoticeId(result[i].id);
                        navigate(`/admin/notice/${noticeId}`);
                      }}
                      ref={lastProperty}
                    >
                      <h1 className="admin__notice__section__two__article2__entry__serial">
                        {result[i].id}
                      </h1>
                      <h1 className="admin__notice__section__two__article2__entry__notice">
                        {result[i].heading}
                      </h1>
                      <h1 className="admin__notice__section__two__article2__entry__date">
                        {result[i].createdAt}
                      </h1>
                      <h1 className="admin__notice__section__two__article2__entry__to">
                        {result[i].to}
                      </h1>
                      <h1 className="admin__notice__section__two__article2__entry__action">
                        {result[i].department}
                      </h1>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="admin__notice__section__two__article2__entry"
                      onClick={() => {
                        setNoticeId(result[i].id);
                        navigate(`/admin/notice/${noticeId}`);
                      }}
                    >
                      <h1 className="admin__notice__section__two__article2__entry__serial">
                        {result[i].id}
                      </h1>
                      <h1 className="admin__notice__section__two__article2__entry__notice">
                        {result[i].heading}
                      </h1>
                      <h1 className="admin__notice__section__two__article2__entry__date">
                        {result[i].createdAt}
                      </h1>
                      <h1 className="admin__notice__section__two__article2__entry__to">
                        {result[i].to}
                      </h1>
                      <h1 className="admin__notice__section__two__article2__entry__action">
                        {result[i].department}
                      </h1>
                    </div>
                  );
                }
              })}
            </article>
          </section>

          <section className={newNotice ? 'admin__notice__new active' : 'admin__notice__new'}>
            <div className="admin__notice__new__bg">
              <h1>Add new notice</h1>
              <section className="admin__notice__new__section__one">
                <div className="admin__notice__new__section__one__header">
                  <h1>Notice details</h1>
                </div>
                <div className="admin__notice__new__section__one__to">
                  <span>
                    <input
                      type="radio"
                      value="Employees"
                      name="to"
                      onChange={(e) => setTo(e.target.value)}
                    />{' '}
                    <label>To Employee</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      value="End Users"
                      name="to"
                      onChange={(e) => setTo(e.target.value)}
                    />{' '}
                    <label>To End Users</label>
                  </span>
                </div>
                <div className="admin__notice__new__section__one__options">
                  <div className="admin__notice__new__section__one__options__one">
                    <h1>Notice Heading </h1>
                    <input
                      type="text"
                      placeholder="e.g General meeting is on wednesday"
                      onChange={(e) => setHeading(e.target.value)}
                    />
                  </div>
                  {to !== 'End Users' ? (
                    <div className="admin__notice__new__section__one__options__two">
                      <h1>Department </h1>
                      <select
                        name="Department"
                        id="Department"
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <option value={null}>--</option>
                        <option value="All">All</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Customer service">Customer service</option>
                      </select>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="admin__notice__new__section__one__content">
                  <h1>Notice details</h1>
                  <textarea
                    type="text"
                    placeholder="Enter new message"
                    name="text"
                    rows="8"
                    cols="6"
                    wrap="soft"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="admin__notice__new__section__one__footer">
                  <button onClick={saveNotice}>
                    <IoMdCheckmark className="admin__message__section__one__end__icon" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setNewNotice(!newNotice);
                    }}
                  >
                    cancel
                  </button>
                </div>
              </section>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default AdminNotice;
