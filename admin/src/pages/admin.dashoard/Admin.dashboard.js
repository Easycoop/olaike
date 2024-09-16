import { BiUser } from "react-icons/bi";
import "./Admin.dashboard.css";
import { MdOutlinePayment, MdOutlinePendingActions } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import { RiAsterisk } from "react-icons/ri";
import { useContext, useState } from "react";
import StateContext from "../../context/StateProvider";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import { PiCircleFill } from "react-icons/pi";

function AdminDashboard() {
  const navigate = useNavigate();
  const totalResult = 2;
  const totalUsers = 5;
  const result = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 1234567890",
      amount: "₦250,000",
      status: "successful",
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
      status: "successful",
      userId: "144f-125f-fdg",
      date: "12th July, 2024",
    },
    {
      id: 4,
      name: "Amara Williams",
      email: "amara.williams@example.com",
      phone: "+4 4444444444",
      amount: "₦250,000",
      status: "successful",
      userId: "144f-125f-fdg",
      date: "12th July, 2024",
    },
  ];
  const notice = [];
  const { chartTheme, setChartTheme } = useContext(StateContext);

  //Charts data
  const [chart, setChart] = useState({
    options: {
      colors: [`${chartTheme.primaryColor}`, `${chartTheme.secondaryColor}`],

      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },

    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "series-2",
        data: [9, 60, 25, 30, 44, 30, 74, 102],
      },
    ],
  });
  const [chart2, setChart2] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      // xaxis: {
      //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      // },
    },
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      labels: ["Apple", "Mango", "Orange", "Watermelon"],
    },
  });

  return (
    <>
      <div className="admin__dashboard">
        <section className="admin__dashboard__section__one">
          <div className="admin__dashboard__section__one__seg">
            <span>
              Total no. of users{" "}
              <BiUser className="admin__dashboard__section__one__seg__icon one" />
            </span>
            <h1>1</h1>
          </div>
          <div className="admin__dashboard__section__one__seg">
            <span>
              Pending registration applications
              <MdOutlinePendingActions className="admin__dashboard__section__one__seg__icon two" />
            </span>
            <h1>3</h1>
          </div>

          <div className="admin__dashboard__section__one__seg">
            <span>
              Pending loan applications{" "}
              <IoMdDocument className="admin__dashboard__section__one__seg__icon four" />
            </span>
            <h1>4</h1>
          </div>
          <div className="admin__dashboard__section__one__seg">
            <span>
              Gross transaction volume{" "}
              <MdOutlinePayment className="admin__dashboard__section__one__seg__icon three" />
            </span>
            <h1>₦6,298,1454</h1>
          </div>
        </section>
        <section className="admin__dashboard__section__two">
          <div className="admin__dashboard__section__two__seg1">
            {/* <h3>{auth.user.full_name}</h3>
            <h4>{auth.user.role}</h4> */}

            <p>User ID: 325</p>
            <span>
              <div>
                <h3>Successful registrations</h3>
                <h4>5</h4>
              </div>
              <div>
                <h3>Successful loans</h3>
                <h4>3</h4>
              </div>
            </span>
          </div>
          <div className="admin__dashboard__section__two__seg2">
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
              width="100%"
            />
          </div>
          <div className="admin__dashboard__section__two__seg3">
            <Chart
              options={chart.options}
              series={chart.series}
              type="scatter"
              width="100%"
            />
          </div>
        </section>
        <section className="admin__dashboard__section__three">
          <div
            className="admin__dashboard__section__three__seg2"
            style={{ width: "100%" }}
          >
            <h1>Recently approved loans</h1>
            <div className="admin__dashboard__section__three__seg2__header">
              <h1 className="admin__dashboard__section__three__seg2__header__id">
                Application date
              </h1>
              <h1 className="admin__dashboard__section__three__seg2__header__title">
                Application number
              </h1>
              <h1 className="admin__dashboard__section__three__seg2__header__views">
                Name
              </h1>
              <h1 className="admin__dashboard__section__three__seg2__header__propertytype">
                Amount
              </h1>

              <h1 className="admin__dashboard__section__three__seg2__header__userid">
                User ID
              </h1>
              <h1 className="admin__dashboard__section__three__seg2__header__ranking">
                Status
              </h1>
            </div>
            {result.map((item, i) => {
              return (
                <div className="admin__dashboard__section__three__seg2__entry">
                  <h1 className="admin__dashboard__section__three__seg2__entry__id">
                    {result[i].date}
                  </h1>
                  <h1 className="admin__dashboard__section__three__seg2__entry__title">
                    {result[i].id}
                  </h1>
                  <h1 className="admin__dashboard__section__three__seg2__entry__views">
                    {result[i].name}
                  </h1>

                  <h1 className="admin__dashboard__section__three__seg2__entry__propertytype">
                    {result[i].amount}
                  </h1>
                  <h1 className="admin__dashboard__section__three__seg2__entry__userid">
                    {result[i].userId}
                  </h1>
                  <h1 className="admin__dashboard__section__three__seg2__entry__ranking">
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
          </div>
        </section>
      </div>
    </>
  );
}

export default AdminDashboard;
