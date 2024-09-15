import { useNavigate } from 'react-router-dom';
import './Admin.single.notice.css';
import { useContext, useEffect, useState } from 'react';
import Toaster from '../../../utils/toaster/Toaster';
import AuthContext from '../../../context/AuthProvider';
import { axiosPrivate } from '../../../api/axios';
import { ScaleLoader } from 'react-spinners';

function AdminSingleNotice() {
  const { auth, setAuth, noticeId, setNoticeId, ticketId, setTicketId, isDark } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const [result, setResult] = useState({});

  const [toaster, setToaster] = useState(false);
  const [message, setMessage] = useState('');
  const [bgcolor, setbgcolor] = useState('');

  useEffect(() => {
    const getSingleNotice = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/notice/notice/${noticeId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setResult(res);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleNotice();

    return;
  }, []);

  const deleteNotice = async () => {
    try {
      const response = await axiosPrivate.delete(`api/v1/notice/delete-notice/${noticeId}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      setToaster(true);
      setbgcolor('#00e396');
      setMessage('Notice deleted succefully');
      setTimeout(() => {
        setToaster(false);
      }, 3100);
      navigate('/admin/notice-board');
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
        <div className="admin__single__notice">
          {toaster ? <Toaster message={message} bgcolor={bgcolor} /> : <div></div>}

          <section className="admin__single__notice__section__one">
            <article className="admin__single__notice__section__one__article1">
              <h1>Notice details</h1>
            </article>
            <article className="admin__single__notice__section__one__article2">
              <span>
                <h1>Notice Heading</h1>
                <h3>{result.heading}</h3>
              </span>
              <span>
                <h1>Date</h1>
                <h3>{result.createdAt}</h3>
              </span>
              <span>
                <h1>To</h1>
                <h3>{result.to}</h3>
              </span>
              <span>
                <h1>Sender</h1>
                <h3>{result.sender_name}</h3>
              </span>
              <span>
                <h1>Department</h1>
                <h3>{result.department}</h3>
              </span>
              <span>
                <h1>Description</h1>
                <h3>{result.description}</h3>
              </span>
            </article>
            <article
              className={
                result.userId == auth.user.id
                  ? 'admin__single__notice__section__one__article3'
                  : 'admin__single__notice__section__one__article3 hide'
              }
            >
              <button onClick={deleteNotice}>Delete notice</button>
            </article>
          </section>
        </div>
      )}
    </>
  );
}

export default AdminSingleNotice;
