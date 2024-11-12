import "./dashboard.css";
import { FaArrowTrendUp, FaCircle } from "react-icons/fa6";
import chart from "../../../assets/images/main/chart.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useGetTransactions } from "../../../redux/actions/transactionAction";
import { useSelector } from "react-redux";
import Loading from "../../../components/splash/loading/Loading";
import NoResult from "../../../components/splash/no-result/NoResult";
import { useGetWallets } from "../../../redux/actions/walletAction";
import Button from "../../../components/ui/button/Button";

function Dashboard() {
  const navigate = useNavigate();
  const getTransactions = useGetTransactions();
  const getWallets = useGetWallets();
  const [wallets, setWallets] = useState({});
  const pageRef = useRef(null); // ensure this is null initially
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);

  const handleGetWallets = async () => {
    setLoading(true);
    try {
      const response = await getWallets(user.id);
      if (response?.payload.status === "success") {
        setErrorMessage("");
        setWallets(response.payload.data);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetTransactions = async () => {
    setLoading(true);
    try {
      const response = await getTransactions({ userId: user.id, page: page });
      if (response?.payload.status === "success") {
        setErrorMessage("");
        const newData = response.payload.data.result;
        setTransactions((prevData) => [...prevData, ...newData]);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  useEffect(() => {
    handleGetTransactions();
  }, [page]);

  // Detect when user scrolls to the bottom
  const handleScroll = () => {
    if (
      pageRef.current &&
      pageRef.current.scrollTop + pageRef.current.clientHeight >=
        pageRef.current.scrollHeight - 500 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Set up scroll event listener on the scrollable container
  useEffect(() => {
    const pageElement = pageRef.current; // Get the scrollable container

    if (pageElement) {
      const debouncedHandleScroll = debounce(handleScroll, 200);
      pageElement.addEventListener("scroll", debouncedHandleScroll);
      return () =>
        pageElement.removeEventListener("scroll", debouncedHandleScroll);
    }
  }, [loading]);

  useEffect(() => {
    handleGetWallets();
  }, []);

  return (
    <div
      className="dashboard"
      ref={pageRef}
      // style={{ height: "40vh", overflowY: "auto" }}
    >
      <section className="dashboard__section__one">
        <h5>My wallets</h5>
        <div className="dashboard__section__one__block__wrap">
          <span className="dashboard__section__one__block">
            <h5>Main Wallet</h5>
            <h3>{`${wallets?.wallet?.balance} ${wallets?.wallet?.currency}`}</h3>
            <div>
              <FaArrowTrendUp />
            </div>
          </span>
          {wallets?.subWallets?.map((wallet, i) => {
            return (
              <span className="dashboard__section__one__block">
                <h5>{wallet?.name}</h5>
                <h3>{`${wallet?.balance} ${wallet?.currency}`}</h3>
                <div>
                  <FaArrowTrendUp />
                </div>
              </span>
            );
          })}
        </div>
      </section>
      <section className="dashboard__section__two">
        <h5>Money highlights</h5>
        <div className="dashboard__section__two__wrap">
          <div className="dashboard__section__two__wrap__start">
            <div className="dashboard__section__two__wrap__start__block">
              <h3>Outstanding loan </h3>
              <h4>{`${user.loanBalance} ${wallets?.wallet?.currency}`}</h4>
            </div>

            <div className="dashboard__section__two__wrap__start__block">
              <h3>Start saving your money</h3>
              <Button
                type="submit"
                typeOf="primary"
                // className="signup__create__button"
                onClick={() => navigate("/main/fund")}
              >
                Save now
              </Button>
            </div>
            <div className="dashboard__section__two__wrap__start__block">
              <h3>Apply for loan</h3>
              <Button
                type="submit"
                typeOf="primary"
                // className="signup__create__button"
                onClick={() => navigate("/main/loan-redirect")}
              >
                Apply
              </Button>
            </div>
          </div>
          {/* <div className="dashboard__section__two__wrap__end">
            <img src={chart} alt="" />
          </div> */}
        </div>
      </section>
      <section className="dashboard__section__one">
        <h5>Transaction history</h5>
        <div className="dashboard__section__two">
          <div className="dashboard__section__two__header">
            <h1 className="dashboard__section__two__header__date">
              Transaction Date
            </h1>
            <h1 className="dashboard__section__two__header__amount">Amount</h1>
            <h1 className="dashboard__section__two__header__description">
              Description
            </h1>
            <h1 className="dashboard__section__two__header__currency">
              Currency
            </h1>

            <h1 className="dashboard__section__two__header__type">Type</h1>
            <h1 className="dashboard__section__two__header__transid">
              Transaction ID
            </h1>
            <h1 className="dashboard__section__two__header__status">Status</h1>
          </div>
          {transactions.length == 0 ? (
            <NoResult
              header="No transaction"
              content="You dont have any transaction history yet"
            />
          ) : (
            transactions.map((transaction, i) => {
              return (
                <div className="dashboard__section__two__entry">
                  <div className="dashboard__section__two__entry__date">
                    {transaction.createdAt}
                  </div>
                  <div className="dashboard__section__two__entry__amount">
                    {transaction.amount}
                  </div>
                  <div className="dashboard__section__two__entry__description">
                    {transaction.description}
                  </div>
                  <div className="dashboard__section__two__entry__currency">
                    {transaction.currency}
                  </div>
                  <div className="dashboard__section__two__entry__type">
                    {/* <FaCircle style={{ color: "#32C398" }} /> */}
                    {transaction.type}
                  </div>
                  <div className="dashboard__section__two__entry__transid">
                    {transaction.id}
                  </div>
                  <div className="dashboard__section__two__entry__status">
                    {transaction.status}
                  </div>
                </div>
              );
            })
          )}
          {loading && <Loading />}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
