import { BsEye } from 'react-icons/bs';
import './Admin.ticket.css';
import { LuTicket } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { PiCircleFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../../context/AuthProvider';
import { axiosPrivate } from '../../../api/axios';
import Toaster from '../../../utils/toaster/Toaster';
import Modal from '../../../user/components/modal/Modal';
import { BiPlus } from 'react-icons/bi';
import { ScaleLoader } from 'react-spinners';

function AdminTicket() {
  const navigate = useNavigate();
  const [path, setPath] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const observer = useRef();

  const { ticketId, setTicketId, isDark } = useContext(AuthContext);
  const [result, setResult] = useState([]);
  const [totalResult, setTotalResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const [toaster, setToaster] = useState(false);
  const [message, setMessage] = useState('');
  const [bgcolor, setbgcolor] = useState('');

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
    getTickets();

    return;
  }, []);

  const getTickets = async () => {
    try {
      const response = await axiosPrivate.get(`api/v1/ticket/tickets`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const res = response.data.data;
      setResult(res.tickets);
      setTotalResult(res.totalItems);
      setLoading(true);
      setHasMore(pageNumber < res.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTicket = async () => {
    try {
      const response = await axiosPrivate.delete(`api/v1/ticket/delete-ticket/${ticketId}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      setToaster(true);
      setbgcolor('#00e396');
      setMessage('ticket deleted succefully');
      setTimeout(() => {
        setToaster(false);
      }, 3100);
      closeModal();
      getTickets();
    } catch (error) {
      console.log(error);
      setToaster(true);
      setbgcolor('#d1ecf1');
      setMessage(error.response.data.message);
      setTimeout(() => {
        setToaster(false);
      }, 3100);
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
        <div className="admin__ticket">
          {toaster ? <Toaster message={message} bgcolor={bgcolor} /> : <div></div>}

          <section className="admin__ticket__section__one">
            <span className="admin__ticket__section__header">
              <h1>Ticket summary</h1>
              <select name="Timeline" id="Timeline">
                <option value={null}>This month</option>
                <option value="1">Last month</option>
                <option value="2">Last 6 months</option>
                <option value="3">Last 1 year</option>
              </select>
            </span>
            <article className="admin__ticket__section__article">
              <div className="admin__ticket__section__one__card">
                <LuTicket className="admin__ticket__section__one__card__icon one" />
                <div>
                  <h3>Total tickets</h3>
                  <h1>{totalResult ? totalResult : 0}</h1>
                </div>
              </div>
              <div className="admin__ticket__section__one__card">
                <LuTicket className="admin__ticket__section__one__card__icon two" />
                <div>
                  <h3>Open tickets</h3>
                  <h1>
                    {
                      result.filter(function (item, i) {
                        if (result[i].status == 'open') {
                          return result[i];
                        }
                      }).length
                    }
                  </h1>
                </div>
              </div>
              <div className="admin__ticket__section__one__card">
                <LuTicket className="admin__ticket__section__one__card__icon three" />
                <div>
                  <h3>Pending tickets</h3>
                  <h1>
                    {
                      result.filter(function (item, i) {
                        if (result[i].status == 'pending') {
                          return result[i];
                        }
                      }).length
                    }
                  </h1>
                </div>
              </div>
              <div className="admin__ticket__section__one__card">
                <LuTicket className="admin__ticket__section__one__card__icon four" />
                <div>
                  <h3>Closed tickets</h3>
                  <h1>
                    {
                      result.filter(function (item, i) {
                        if (result[i].status == 'close') {
                          return result[i];
                        }
                      }).length
                    }
                  </h1>
                </div>
              </div>
            </article>
          </section>
          <section className="admin__ticket__section__two">
            <button
              onClick={() => {
                setPath('Create Ticket');
                navigate('/admin/create-ticket');
              }}
            >
              <BiPlus className="admin__ticket__section__two__button__icon" /> Create ticket
            </button>
            <div className="admin__ticket__section__two__wrapper">
              <div className="admin__ticket__section__two__header">
                <h1 className="admin__ticket__section__two__header__ticket">Ticket number</h1>
                <h1 className="admin__ticket__section__two__header__subject">Ticket subject</h1>
                <h1 className="admin__ticket__section__two__header__userid">Requester name</h1>
                <h1 className="admin__ticket__section__two__header__date">Requested on</h1>

                <h1 className="admin__ticket__section__two__header__status">Status</h1>
                <h1 className="admin__ticket__section__two__header__action">Action</h1>
              </div>
              {result.map((item, i) => {
                if (result.length === i + 1) {
                  return (
                    <div className="admin__ticket__section__two__entry" ref={lastProperty}>
                      <h1 className="admin__ticket__section__two__entry__ticket">{result[i].id}</h1>
                      <h1 className="admin__ticket__section__two__entry__subject">
                        {result[i].subject}
                      </h1>
                      <h1 className="admin__ticket__section__two__entry__userid">
                        {result[i].sender_name}
                      </h1>
                      <h1 className="admin__ticket__section__two__entry__date">
                        {result[i].createdAt}
                      </h1>
                      <h1 className="admin__ticket__section__two__entry__status">
                        <span>
                          <PiCircleFill
                            className={
                              result[i].status == 'successful'
                                ? 'ad__student__app__section__two__entry__status__icon successful'
                                : result[i].status == 'unsuccessful'
                                ? 'ad__student__app__section__two__entry__status__icon unsuccessful'
                                : 'ad__student__app__section__two__entry__status__icon'
                            }
                          />
                          {result[i].status}
                        </span>
                      </h1>
                      <h1 className="admin__ticket__section__two__entry__action">
                        <span>
                          <BsEye
                            className="admin__ticket__section__two__entry__action__icon"
                            onClick={() => {
                              setTicketId(result[i].id);
                              navigate(`/admin/ticket/${ticketId}`);
                            }}
                          />
                          <MdDelete
                            className="admin__ticket__section__two__entry__action__icon"
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
                    <div className="admin__ticket__section__two__entry">
                      <h1 className="admin__ticket__section__two__entry__ticket">{result[i].id}</h1>
                      <h1 className="admin__ticket__section__two__entry__subject">
                        {result[i].subject}
                      </h1>
                      <h1 className="admin__ticket__section__two__entry__userid">
                        {result[i].sender_name}
                      </h1>
                      <h1 className="admin__ticket__section__two__entry__date">
                        {result[i].createdAt}
                      </h1>
                      <h1 className="admin__ticket__section__two__entry__status">
                        <span>
                          <PiCircleFill
                            className={
                              result[i].status == 'successful'
                                ? 'ad__student__app__section__two__entry__status__icon successful'
                                : result[i].status == 'unsuccessful'
                                ? 'ad__student__app__section__two__entry__status__icon unsuccessful'
                                : 'ad__student__app__section__two__entry__status__icon'
                            }
                          />
                          {result[i].status}
                        </span>
                      </h1>
                      <h1 className="admin__ticket__section__two__entry__action">
                        <span>
                          <BsEye
                            className="admin__ticket__section__two__entry__action__icon"
                            onClick={() => {
                              setTicketId(result[i].id);
                              navigate(`/admin/ticket/${ticketId}`);
                            }}
                          />
                          <MdDelete
                            className="admin__ticket__section__two__entry__action__icon"
                            onClick={() => {
                              setTicketId(result[i].id);
                              setIsOpen(true);
                            }}
                          />
                        </span>
                      </h1>
                    </div>
                  );
                }
              })}
            </div>
          </section>

          <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="">
              <div className="admin__delete__confirmation">
                <h1>Are you sure you want to delete this ticket?</h1>
                <div>
                  <button
                    onClick={() => {
                      deleteTicket();
                    }}
                  >
                    Delete ticket
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

export default AdminTicket;
