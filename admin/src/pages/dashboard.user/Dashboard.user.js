import "./Dashboard.user.css";
import { BiEdit, BiSearch } from "react-icons/bi";
import { PiCircleFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DashboardUser() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();

  const [userResult, setUserResult] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      is_verified: false,
      createdAt: "14 - 02 -2024",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      is_verified: true,
      createdAt: "23 - 05 -2024",
      status: "Inactive",
    },
  ]);

  return (
    <>
      <div className="dashboard__users">
        <section className="dashboard__users__section__one">
          <div className="dashboard__users__search">
            <input placeholder="Enter user name" />
            <BiSearch className="admin__message__section__one__search__icon" />
          </div>
          <h3>Number of users: {userResult.length}</h3>
          <div className="dashboard__users__end">
            <div className="dashboard__users__end__filter">
              <div></div>
            </div>
            <button
              onClick={() => {
                navigate("/main/create-user");
              }}
            >
              Create user
            </button>
          </div>
        </section>
        <section className="dashboard__users__section__two">
          <div className="dashboard__users__section__two__header">
            <h1 className="dashboard__users__section__two__header__id">ID</h1>
            <h1 className="dashboard__users__section__two__header__name">
              Name
            </h1>
            <h1 className="dashboard__users__section__two__header__email">
              Email
            </h1>
            <h1 className="dashboard__users__section__two__header__role">
              Role
            </h1>
            <h1 className="dashboard__users__section__two__header__status">
              Status
            </h1>
            <h1 className="dashboard__users__section__two__header__created">
              Created
            </h1>
            <h1 className="dashboard__users__section__two__header__action">
              Action
            </h1>
          </div>
          {userResult.map((item, i) => {
            return (
              <div className="dashboard__users__section__two__entry">
                <h1
                  className="dashboard__users__section__two__entry__id"
                  onClick={() => {
                    navigate("/main/user");
                  }}
                >
                  {userResult[i].id}
                </h1>
                <h1
                  className="dashboard__users__section__two__entry__name"
                  onClick={() => {
                    navigate("/main/user");
                  }}
                >
                  {userResult[i].name}
                </h1>
                <h1
                  className="dashboard__users__section__two__entry__email"
                  onClick={() => {
                    navigate("/main/user");
                  }}
                >
                  {userResult[i].email}
                </h1>
                <h1
                  className="dashboard__users__section__two__entry__role"
                  onClick={() => {
                    navigate("/main/user");
                  }}
                >
                  {userResult[i].role}
                </h1>
                <h1
                  className="dashboard__users__section__two__entry__status"
                  onClick={() => {
                    navigate("/main/user");
                  }}
                >
                  <span>
                    <PiCircleFill
                      className={
                        userResult[i].is_verified
                          ? "ad__student__app__section__two__entry__status__icon successful"
                          : "ad__student__app__section__two__entry__status__icon unsuccessful"
                      }
                    />{" "}
                    {userResult[i].is_verified ? "Verified" : "Not verified"}
                  </span>
                </h1>
                <h1
                  className="dashboard__users__section__two__entry__created"
                  onClick={() => {
                    navigate("/main/user");
                  }}
                >
                  {userResult[i].createdAt}
                </h1>
                <h1 className="dashboard__users__section__two__entry__action">
                  <span>
                    <BiEdit
                      className="dashboard__users__section__two__entry__action__icon"
                      onClick={() => navigate("/main/edit-user")}
                    />{" "}
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
          })}
        </section>
      </div>
    </>
  );
}

export default DashboardUser;
