import { PiHouseLight } from "react-icons/pi";
import "./Admin.single.user.css";
import { BiCoin } from "react-icons/bi";
import { MdPending } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function AdminSingleUser() {
  const navigate = useNavigate();
  const result = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    nationality: "American",
    state: "Florida",
    address: "123 Main St, City, USA",
    phone: "1234567890",
    is_verified: "verified",
    role: "End User",
  };
  return (
    <>
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

          <button onClick={() => navigate("/admin/edit-user")}>
            Edit user
          </button>
        </div>
        <div className="single__user__section2">
          <div className="single__user__section2__card">
            <PiHouseLight
              className="single__user__section2__card__icon"
              style={{ color: "black" }}
            />
            <div>
              <h3>Main Wallet</h3>
              <h1>₦50,450</h1>
            </div>
          </div>

          <div className="single__user__section2__card">
            <BiCoin
              className="single__user__section2__card__icon"
              style={{ color: "gold" }}
            />
            <div>
              <h3>Transaction volume</h3>
              <h1>₦ 320,000</h1>
            </div>
          </div>
          <div className="single__user__section2__card">
            <MdPending
              className="single__user__section2__card__icon"
              style={{ color: "crimson" }}
            />
            <div>
              <h3>Loan balance</h3>
              <h1>₦1,250</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSingleUser;
