import { BiCard } from 'react-icons/bi';
import './Admin.transaction.css';
import { useContext, useState } from 'react';
import Chart from 'react-apexcharts';
import { MdOutlineCallMissedOutgoing, MdOutlineCallReceived } from 'react-icons/md';
import { TbSum } from 'react-icons/tb';
import { PiCircleFill } from 'react-icons/pi';
import AuthContext from '../../../context/AuthProvider';
import { ScaleLoader } from 'react-spinners';
import { useEffect } from 'react';
import { axiosPrivate } from '../../../api/axios';
import { useRef } from 'react';

function AdminTransaction() {
  const { theme, setTheme, chartTheme, setChartTheme, isDark } = useContext(AuthContext);
  const [transaction, setTransaction] = useState([]);
  const lastTransaction = useRef();

  //Charts data
  const [chart, setChart] = useState({
    options: {
      colors: [`${chartTheme.primaryColor}`, `${chartTheme.secondaryColor}`],
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: 'New York Temperature',
        data: [
          {
            x: 'Jan',
            y: [-2, 4],
          },
          {
            x: 'Feb',
            y: [-1, 6],
          },
          {
            x: 'Mar',
            y: [3, 10],
          },
          {
            x: 'Apr',
            y: [8, 16],
          },
        ],
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);

  const cssDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: isDark ? '#fff' : '#000',
    background: isDark ? '#121212' : '#000',
  };

  useEffect(() => {
    async function getTransaction() {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get('api/v1/transaction/get-transaction', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const transaction = response.data.data;
        console.log(transaction);
        setTransaction(transaction);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    getTransaction();
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={cssDiv}>
          <ScaleLoader color={isDark ? '#fff' : '#000'} />
        </div>
      ) : (
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
            <div className="admin__transaction__section__chart">
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
            </div>
          </section>
          <section className="admin__transaction__section__two">
            <div className="admin__transaction__section__two__header">
              <h1 className="admin__transaction__section__two__header__date">Transaction date</h1>
              <h1 className="admin__transaction__section__two__header__invoice">Invoice number</h1>
              <h1 className="admin__transaction__section__two__header__ammount">Ammount</h1>
              <h1 className="admin__transaction__section__two__header__property">Property ID</h1>

              <h1 className="admin__transaction__section__two__header__userid">User ID</h1>
              <h1 className="admin__transaction__section__two__header__status">Status</h1>
            </div>
            {transaction.map((item, i) => {
              if (transaction.length === i + 1) {
                // Targets the last element in the transaction array
                return (
                  <div className="admin__transaction__section__two__entry" useRef={lastTransaction}>
                    <h1 className="admin__transaction__section__two__entry__date">
                      {transaction[i].createdAt}
                    </h1>
                    <h1 className="admin__transaction__section__two__entry__invoice">
                      {transaction[i].invoice_number}
                    </h1>
                    <h1 className="admin__transaction__section__two__entry__ammount">{`${transaction[i].currency}  ${transaction[i].amount}`}</h1>
                    <h1 className="admin__transaction__section__two__entry__property">
                      {transaction[i].propertyId}
                    </h1>

                    <h1 className="admin__transaction__section__two__entry__userid">
                      {transaction[i].userId}
                    </h1>
                    <h1 className="admin__transaction__section__two__entry__status">
                      <span>
                        <PiCircleFill
                          className={
                            transaction[i].status == 'successful'
                              ? 'ad__student__app__section__two__entry__status__icon successful'
                              : transaction[i].status == 'unsuccessful'
                              ? 'ad__student__app__section__two__entry__status__icon unsuccessful'
                              : 'ad__student__app__section__two__entry__status__icon'
                          }
                        />
                        {transaction[i].status}
                      </span>
                    </h1>
                  </div>
                );
              } else {
                return (
                  <div className="admin__transaction__section__two__entry">
                    <h1 className="admin__transaction__section__two__entry__date">
                      {transaction[i].createdAt}
                    </h1>
                    <h1 className="admin__transaction__section__two__entry__invoice">
                      {transaction[i].invoice_number}
                    </h1>
                    <h1 className="admin__transaction__section__two__entry__ammount">{`${transaction[i].currency}  ${transaction[i].amount}`}</h1>
                    <h1 className="admin__transaction__section__two__entry__property">
                      {transaction[i].propertyId}
                    </h1>

                    <h1 className="admin__transaction__section__two__entry__userid">
                      {transaction[i].userId}
                    </h1>
                    <h1 className="admin__transaction__section__two__entry__status">
                      <span>
                        <PiCircleFill
                          className={
                            transaction[i].status == 'successful'
                              ? 'ad__student__app__section__two__entry__status__icon successful'
                              : transaction[i].status == 'unsuccessful'
                              ? 'ad__student__app__section__two__entry__status__icon unsuccessful'
                              : 'ad__student__app__section__two__entry__status__icon'
                          }
                        />
                        {transaction[i].status}
                      </span>
                    </h1>
                  </div>
                );
              }
            })}
          </section>
        </div>
      )}
    </>
  );
}

export default AdminTransaction;
