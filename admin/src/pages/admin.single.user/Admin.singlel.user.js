import { PiHouseLight } from 'react-icons/pi';
import './Admin.single.user.css';
import { BsTicketDetailed } from 'react-icons/bs';
import { BiCoin } from 'react-icons/bi';
import { MdPending } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthProvider';
import { axiosPrivate } from '../../../api/axios';
import { ScaleLoader } from 'react-spinners';

function AdminSingleUser() {
  const { userId, setUserId, isDark } = useContext(AuthContext);
  const { listing, setListing } = useState([]);
  const { ticket, setTicket } = useState([]);
  const [pendingPropertyApplications, setPendingPropertyApplications] = useState(0);

  const [result, setResult] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getAgentListing = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/agent/agent-listings/${userId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setListing(res.agentListings);
      } catch (error) {
        console.log(error);
      }
    };

    const getSingleUser = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/user/user/${userId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setResult(res);
      } catch (error) {
        console.log(error);
      }
    };

    const getTicketByUser = async () => {
      try {
        const response = await axiosPrivate.get(`api/v1/ticket/get-tickets-by-user${userId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const res = response.data.data;
        setTicket(res);
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

    getSingleUser();
    getAgentListing();
    getTicketByUser();
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
        <div className="single__user">
          <div className="single__user__section1">
            <h1>User profile info</h1>
            <span>
              <h2>First Name</h2>
              <h3>{result.first_name}</h3>
            </span>
            <span>
              <h2>Last Name</h2>
              <h3>{result.last_name}</h3>
            </span>
            <span>
              <h2>Email</h2>
              <h3>{result.email}</h3>
            </span>
            <span>
              <h2>Nationality</h2>
              {result.nationality ? <h3> {result.nationality}</h3> : <h3>--</h3>}
            </span>
            <span>
              <h2>State of origin</h2>
              {result.state ? <h3> {result.state}</h3> : <h3>--</h3>}
            </span>
            <span>
              <h2>Address</h2>
              {result.address ? <h3> {result.address}</h3> : <h3>--</h3>}
            </span>

            <span>
              <h2>User ID</h2>
              <h3>{result.id}</h3>
            </span>
            <span>
              <h2>Mobile</h2>
              {result.phone ? <h3> {result.phone}</h3> : <h3>--</h3>}
            </span>

            <span>
              <h2>Verification status</h2>
              <h3>{result.is_verified}</h3>
            </span>
            <span>
              <h2>role</h2>
              <h3>{result.role}</h3>
            </span>

            <button onClick={() => navigate('/admin/edit-user')}>Edit user</button>
          </div>
          <div className="single__user__section2">
            <div className="single__user__section2__card">
              <PiHouseLight
                className="single__user__section2__card__icon"
                style={{ color: 'black' }}
              />
              <div>
                <h3>Listed properties</h3>
                <h1>{listing && listing.length}</h1>
              </div>
            </div>
            <div className="single__user__section2__card">
              <BsTicketDetailed
                className="single__user__section2__card__icon"
                style={{ color: 'darkblue' }}
              />
              <div>
                <h3>Open tickets</h3>
                <h1>{ticket && ticket.length}</h1>
              </div>
            </div>
            <div className="single__user__section2__card">
              <BiCoin className="single__user__section2__card__icon" style={{ color: 'gold' }} />
              <div>
                <h3>Transaction volume</h3>
                <h1>#1,222,843</h1>
              </div>
            </div>
            <div className="single__user__section2__card">
              <MdPending
                className="single__user__section2__card__icon"
                style={{ color: 'crimson' }}
              />
              <div>
                <h3>Pending property applications</h3>
                <h1>{pendingPropertyApplications}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminSingleUser;
