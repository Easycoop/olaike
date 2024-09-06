import { BiPlus } from "react-icons/bi";
import "./loan.css";
import { FiFilter } from "react-icons/fi";
import { TiExportOutline } from "react-icons/ti";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const DATA = [
  {
    id: 1,
    fee: "N12,000",
    date: "12th July, 2024",
    status: "Paid",
    date: "12th July, 2024",
  },
  {
    id: 2,
    fee: "N12,000",
    date: "12t July, 2024",
    status: "Paid",
    date: "12th July, 2024",
  },

  // Add more user records as needed
];

function Loan() {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isActionDropdown, setIsActionDropdown] = useState("");
  const [currentActionId, setCurrentActionId] = useState("");

  const [formData, setFormData] = useState({
    tag: "",
    category: "",
  });

  const [isOpen, setIsOpen] = useState({
    assign: false,
    reject: false,
  });

  const closeModal = () => {
    setIsOpen({
      assign: false,
      reject: false,
    });
  };

  const handleModalClick = (option) => {
    option === "assign"
      ? setIsOpen((prev) => ({ ...prev, assign: true }))
      : setIsOpen((prev) => ({ ...prev, reject: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const toggleActionDropdown = (id) => {
    if (id === currentActionId) {
      setIsActionDropdown("");
      setCurrentActionId("");
      return;
    }
    setIsActionDropdown(id);
    setCurrentActionId(id);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation(); // Prevent the click from closing the dropdown
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(id)
        ? prevSelectedUsers.filter((userId) => userId !== id)
        : [...prevSelectedUsers, id]
    );
  };

  const handleSelectAllUsers = () => {
    if (selectedUsers.length === DATA.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(DATA.map((user) => user.id));
    }
  };

  const handleBulkAction = () => {
    alert(`Performing bulk action on users: ${selectedUsers.join(", ")}`);
  };

  const handleApprove = () => {
    console.log("appprove");
  };

  return (
    <div className="ad__novel">
      <section className="ad__novel__sc__one">
        <input type="text" placeholder="Search" className="" />
      </section>
      {/* <section className="ad__novel__sc__two">
        <button className="ad__novel__sc__two__button">
          <TiExportOutline /> Export
        </button>
        <button
          onClick={handleBulkAction}
          disabled={selectedUsers.length === 0}
        >
          Bulk action
        </button>
      </section> */}
      <section className="ad__novel__sc__three">
        <div className="admin-table">
          <div className="admin-table-header">
            <div className="admin-table-cell">FEES/DUES</div>
            <div className="admin-table-cell">DATE</div>
            <div className="admin-table-cell">STATUS</div>
            <div className="admin-table-cell">DUE DATE</div>
          </div>
          <div className="admin-table-body">
            {DATA.map((user) => (
              <div key={user.id} className="admin-table-row">
                <div className="admin-table-cell">{user.fee}</div>
                <div className="admin-table-cell">{user.date}</div>
                <div className="admin-table-cell">{user.status}</div>
                <div className="admin-table-cell">{user.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Loan;
