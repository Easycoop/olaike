import { useContext, useState } from 'react';
import Toaster from '../../../utils/toaster/Toaster';
import './Admin.create.ticket.css';
import { useNavigate } from 'react-router-dom';
import { BsAsterisk } from 'react-icons/bs';
import { ScaleLoader } from 'react-spinners';
import { axiosPrivate } from '../../../api/axios';
import AuthContext from '../../../context/AuthProvider';

function AdminCreateTicket() {
  const { auth, isDark } = useContext(AuthContext);

  const navigate = useNavigate();
  const [toaster, setToaster] = useState(false);
  const [message, setMessage] = useState('');
  const [bgcolor, setbgcolor] = useState('');

  const [status, setStatus] = useState('pending');
  const [subject, setSubject] = useState(null);
  const [description, setDescription] = useState(null);
  const [senderName, setSenderName] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const cssDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: isDark ? '#fff' : '#000',
    background: isDark ? '#121212' : '#000',
  };

  const saveTicket = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosPrivate.post(
        'api/v1/ticket/new-ticket',
        JSON.stringify({
          senderName: senderName,
          senderId: auth.user.id,
          senderEmail: auth.user.email,
          description: description,
          status: status,
          subject: subject,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      setIsLoading(false);

      navigate('/admin/tickets');
      setToaster(true);
      setbgcolor('#00e396');
      setMessage('Ticket created successfully');
      setTimeout(() => {
        setToaster(false);
      }, 3100);
    } catch (err) {
      if (!err?.response) {
        setIsLoading(false);

        console.log('No server response');
      } else if (err.response.status === 401) {
        setIsLoading(false);

        console.log('Unauthorized');
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div style={cssDiv}>
          <ScaleLoader color={isDark ? '#fff' : '#000'} />
        </div>
      ) : (
        <div className="create__ticket">
          {toaster ? <Toaster message={message} bgcolor={bgcolor} /> : <div></div>}

          <section className="create__ticket__section1">
            <h3>Ticket details</h3>
            <article>
              <div className="edit__user__article__div">
                <label>
                  Requester Name{' '}
                  <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <input
                  type="text"
                  onChange={(e) => setSenderName(e.target.value)}
                  value={senderName}
                />
              </div>
              <div className="edit__user__article__div">
                <label>
                  Ticket subject{' '}
                  <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <input type="text" onChange={(e) => setSubject(e.target.value)} value={subject} />
              </div>
              <div className="edit__user__article__div">
                <label>
                  Description <BsAsterisk className="edit__user__article__div__icon"></BsAsterisk>
                </label>
                <textarea
                  type="text"
                  placeholder="Why are you raising this ticket?"
                  name="text"
                  rows="8"
                  cols="6"
                  wrap="soft"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </article>
            <span>
              <button onClick={saveTicket}>Save</button>
              <button
                onClick={() => {
                  navigate('/admin/tickets');
                }}
              >
                Cancel
              </button>
            </span>
          </section>
        </div>
      )}
    </>
  );
}

export default AdminCreateTicket;
