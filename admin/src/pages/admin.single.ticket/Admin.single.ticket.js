import { useNavigate } from 'react-router-dom';
import './Admin.single.ticket.css';
import { axiosPrivate } from '../../../api/axios';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthProvider';
import Toaster from '../../../utils/toaster/Toaster';
import { ScaleLoader } from 'react-spinners';
import { Image } from 'cloudinary-react';

function AdminSingleticket() {
  const { auth, setAuth, ticketId, setTicketId, isDark } = useContext(AuthContext);
  const [result, setResult] = useState({});

  const [toaster, setToaster] = useState(false);
  const [message, setMessage] = useState('');
  const [bgcolor, setbgcolor] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getSingleTicket = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/ticket/ticket/${ticketId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setResult(res);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleTicket();

    return;
  }, []);

  const submit = async (action) => {
    try {
      const response = await axiosPrivate.post(
        `api/v1/ticket/single-ticket-action/${ticketId}`,
        JSON.stringify({ action: action, email: result.sender_email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      const res = response.data.message;
      setToaster(true);
      setbgcolor('#1db954');
      setMessage(res);
      setTimeout(() => {
        setToaster(false);
      }, 3100);

      navigate('/admin/tickets');
    } catch (error) {
      console.log(error);

      setToaster(true);
      setbgcolor('c8102e');
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
        <div className="single__ticket">
          {toaster ? <Toaster message={message} bgcolor={bgcolor} /> : <div></div>}

          <section className="admin__single__notice__section__one">
            <article className="admin__single__notice__section__one__article1">
              <h1>Ticket details</h1>
            </article>
            <article className="admin__single__notice__section__one__article2">
              <span>
                <h1>Ticket subject</h1>
                <h3>{result.subject}</h3>
              </span>
              <span>
                <h1>Date created</h1>
                <h3>{result.createdAt}</h3>
              </span>
              <span>
                <h1>Description</h1>
                <h3>{result.description}</h3>
              </span>
              <span>
                <h1>Image</h1>
                <h3>
                  <Image
                    quality="auto:best"
                    cloudName="du1dvxjo8"
                    publicId={result.image}
                    width="300"
                    className="home__main__section__two__poppty__img"
                  />
                </h3>
              </span>
            </article>
          </section>
          <span>
            <button>Send message</button>
            <button
              onClick={() => {
                submit('close');
              }}
            >
              Close ticket
            </button>
          </span>
        </div>
      )}
    </>
  );
}

export default AdminSingleticket;
