import { FaFile, FaFileExcel, FaFileImport } from "react-icons/fa";
import "./Admin.loan.applications.css";
import { PiCircleFill } from "react-icons/pi";
import { FaFileCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function AdminLoanApplication() {
  const applicationId = 1;
  const navigate = useNavigate();
  const result = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 1234567890",
      amount: "₦250,000",
      status: "pending",
      userId: "144f-125f-fdg",
      date: "12th July, 2024",
    },
    {
      id: 2,
      name: "Emmanuel Kant",
      email: "jane.doe@example.com",
      phone: "+2 9876543210",
      amount: "₦300,000",
      status: "successful",
      userId: "144f-125f-fdg",
      date: "12th July, 2024",
    },
    {
      id: 3,
      name: "David Smith",
      email: "david.smith@example.com",
      phone: "+3 3333333333",
      amount: "₦200,000",
      status: "unsuccessful",
      userId: "144f-125f-fdg",
      date: "12th July, 2024",
    },
    {
      id: 4,
      name: "Amara Williams",
      email: "amara.williams@example.com",
      phone: "+4 4444444444",
      amount: "₦250,000",
      status: "pending",
      userId: "144f-125f-fdg",
      date: "12th July, 2024",
    },
  ];

  return (
    <>
      <div className="ad__student__app">
        <section className="ad__student__app__section__one">
          <span className="ad__student__app__section__header">
            <h1>Loan application summary</h1>
            <select name="Timeline" id="Timeline">
              <option value={null}>This month</option>
              <option value="1">Last month</option>
              <option value="2">Last 6 months</option>
              <option value="3">Last 1 year</option>
            </select>
          </span>
          <article className="ad__student__app__section__article">
            <div className="ad__student__app__section__one__card">
              <FaFile className="ad__student__app__section__one__card__icon one" />
              <div>
                <h3>Total applications</h3>
                <h1>{result.length}</h1>
              </div>
            </div>
            <div className="ad__student__app__section__one__card">
              <FaFileCircleCheck className="ad__student__app__section__one__card__icon two" />
              <div>
                <h3>Successful applications</h3>
                <h1>
                  {
                    result.filter(function (item, i) {
                      if (result[i].status == "successful") {
                        return result[i];
                      }
                    }).length
                  }
                </h1>
              </div>
            </div>
            <div className="ad__student__app__section__one__card">
              <FaFileImport className="ad__student__app__section__one__card__icon three" />
              <div>
                <h3>Pending applications</h3>
                <h1>
                  {
                    result.filter(function (item, i) {
                      if (result[i].status == "pending") {
                        return result[i];
                      }
                    }).length
                  }
                </h1>
              </div>
            </div>
            <div className="ad__student__app__section__one__card">
              <FaFileExcel className="ad__student__app__section__one__card__icon four" />
              <div>
                <h3>Unsuccessful applications</h3>
                <h1>
                  {
                    result.filter(function (item, i) {
                      if (result[i].status == "unsuccessful") {
                        return result[i];
                      }
                    }).length
                  }
                </h1>
              </div>
            </div>
          </article>
        </section>
        <section className="ad__student__app__section__two">
          <div className="ad__student__app__section__two__header">
            <h1 className="ad__student__app__section__two__header__date">
              Application date
            </h1>
            <h1 className="ad__student__app__section__two__header__id">
              Application number
            </h1>
            <h1 className="ad__student__app__section__two__header__university">
              Name
            </h1>
            <h1 className="ad__student__app__section__two__header__universityemail">
              Amount
            </h1>

            <h1 className="ad__student__app__section__two__header__userid">
              User ID
            </h1>
            <h1 className="ad__student__app__section__two__header__status">
              Status
            </h1>
          </div>

          {result.map((item, i) => {
            return (
              <div
                className="ad__student__app__section__two__entry"
                onClick={() => {
                  navigate(`/main/loan-application/${applicationId}`);
                }}
              >
                <h1 className="ad__student__app__section__two__entry__date">
                  {result[i].date}
                </h1>
                <h1 className="ad__student__app__section__two__entry__id">
                  {result[i].id}
                </h1>
                <h1 className="ad__student__app__section__two__entry__university">
                  {result[i].name}
                </h1>
                <h1 className="ad__student__app__section__two__entry__universityemail">
                  {result[i].amount}
                </h1>

                <h1 className="ad__student__app__section__two__entry__userid">
                  {result[i].userId}
                </h1>
                <h1 className="ad__student__app__section__two__entry__status">
                  <span>
                    <PiCircleFill
                      className={
                        result[i].status == "successful"
                          ? "ad__student__app__section__two__entry__status__icon successful"
                          : result[i].status == "unsuccessful"
                          ? "ad__student__app__section__two__entry__status__icon unsuccessful"
                          : "ad__student__app__section__two__entry__status__icon"
                      }
                    />{" "}
                    {result[i].status}
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

export default AdminLoanApplication;
