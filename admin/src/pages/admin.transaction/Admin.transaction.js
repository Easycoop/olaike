import "./Admin.transaction.css";
import { useContext, useState } from "react";
import Chart from "react-apexcharts";
import {
  MdOutlineCallMissedOutgoing,
  MdOutlineCallReceived,
} from "react-icons/md";
import { TbSum } from "react-icons/tb";
import { PiCircleFill } from "react-icons/pi";
import { useRef } from "react";
import StateContext from "../../context/StateProvider";

function AdminTransaction() {
  const { chartTheme } = useContext(StateContext);
  const [transaction, setTransaction] = useState([
    {
      id: 1,
      date: "2022-01-01",
      type: "deposit",
      amount: 500,
      userId: "1349-ff3434-xfd",
      status: "succesful",
      transactionId: "147197",
      description: "Salary payment",
    },
    {
      id: 2,
      date: "2022-01-02",
      type: "withdrawal",
      amount: 200,
      userId: "12g5-ff3434-xfd",
      status: "succesful",
      transactionId: "411531",
      description: "Emergency fund",
    },
    {
      id: 3,
      date: "2022-01-03",
      type: "deposit",
      amount: 1000,
      userId: "jhj14-3434-xfd",
      status: "unsuccesful",
      transactionId: "098900",
      description: "Emergency fund",
    },
  ]);
  const lastTransaction = useRef();

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
        name: "New York Temperature",
        data: [
          {
            x: "Jan",
            y: [-2, 4],
          },
          {
            x: "Feb",
            y: [-1, 6],
          },
          {
            x: "Mar",
            y: [3, 10],
          },
          {
            x: "Apr",
            y: [8, 16],
          },
        ],
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="admin__transaction">
        <section className="admin__transaction__section__one">
          <span className="admin__transaction__section__header">
            <h1>Transaction summary</h1>
            <select name="Timeline" id="Timeline">
              <option value={null}>This month</option>
              <option value="1">Last month</option>
              <option value="2">Last 6 months</option>
              <option value="3">Last 1 year</option>
            </select>
          </span>
          <article className="admin__transaction__section__article">
            <div className="admin__transaction__section__one__card">
              <TbSum className="admin__transaction__section__one__card__icon" />
              <div>
                <h3>Total transactions</h3>
                <h1>#1,222,843</h1>
              </div>
            </div>
            <div className="admin__transaction__section__one__card">
              <MdOutlineCallMissedOutgoing className="admin__transaction__section__one__card__icon" />
              <div>
                <h3>Outgoings</h3>
                <h1>#552,843</h1>
              </div>
            </div>
            <div className="admin__transaction__section__one__card">
              <MdOutlineCallReceived className="admin__transaction__section__one__card__icon" />
              <div>
                <h3>Incomings</h3>
                <h1>#789,653</h1>
              </div>
            </div>
          </article>
          {/* <div className="admin__transaction__section__chart">
            <div>
              <Chart
                options={chart.options}
                series={chart.series}
                type="rangeArea"
                height="200px"
                width="100%"
              />
            </div>
            <div>
              <Chart
                options={chart.options}
                series={chart.series}
                type="rangeArea"
                height="200px"
                width="100%"
              />
            </div>
          </div> */}
        </section>
        <section className="admin__transaction__section__two">
          <div className="admin__transaction__section__two__header">
            <h1 className="admin__transaction__section__two__header__date">
              Transaction date
            </h1>
            <h1 className="admin__transaction__section__two__header__invoice">
              Transaction ID
            </h1>
            <h1 className="admin__transaction__section__two__header__ammount">
              Amount
            </h1>
            <h1 className="admin__transaction__section__two__header__property">
              Description
            </h1>

            <h1 className="admin__transaction__section__two__header__userid">
              User ID
            </h1>
            <h1 className="admin__transaction__section__two__header__status">
              Status
            </h1>
          </div>
          {transaction.map((item, i) => {
            return (
              <div
                className="admin__transaction__section__two__entry"
                useRef={lastTransaction}
              >
                <h1 className="admin__transaction__section__two__entry__date">
                  {transaction[i].date}
                </h1>
                <h1 className="admin__transaction__section__two__entry__invoice">
                  {transaction[i].transactionId}
                </h1>
                <h1 className="admin__transaction__section__two__entry__ammount">{`₦${transaction[i].amount}`}</h1>
                <h1 className="admin__transaction__section__two__entry__property">
                  {transaction[i].description}
                </h1>

                <h1 className="admin__transaction__section__two__entry__userid">
                  {transaction[i].userId}
                </h1>
                <h1 className="admin__transaction__section__two__entry__status">
                  <span>
                    <PiCircleFill
                      className={
                        transaction[i].status == "successful"
                          ? "ad__student__app__section__two__entry__status__icon successful"
                          : transaction[i].status == "unsuccessful"
                          ? "ad__student__app__section__two__entry__status__icon unsuccessful"
                          : "ad__student__app__section__two__entry__status__icon"
                      }
                    />
                    {transaction[i].status}
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

export default AdminTransaction;
