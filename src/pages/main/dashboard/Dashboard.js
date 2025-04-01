import "./dashboard.css";
import { FaArrowTrendUp, FaCircle, FaCopy } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useGetTransactions } from "../../../redux/actions/transactionAction";
import { useSelector } from "react-redux";
import Loading from "../../../components/splash/loading/Loading";
import NoResult from "../../../components/splash/no-result/NoResult";
import { useGetWallets } from "../../../redux/actions/walletAction";
import Button from "../../../components/ui/button/Button";
import toastManager from "../../../components/ui/toast/ToasterManager";
import {getUserWallet, debitEntranceFee} from "../../../services/walletService";
import Modal from "../../../components/ui/modal/Modal";
import {ClipLoader} from "react-spinners";
import {getUserSociety} from "../../../services/societyService";

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
  const [openModal, setOpenModal] = useState(false);
  const [userSociety, setUserSociety] = useState({});
  const [kegowWallet, setKegowWallet] = useState(localStorage.getItem('kegowWallet') &&  localStorage.getItem('kegowWallet') != "undefined" ? JSON.parse(localStorage.getItem('kegowWallet')) : null);

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

  const copyToClipBoard = async (text) => {
    await navigator.clipboard.writeText(text)
    toastManager.addToast({
      message: `copied`,
      type: "success",
  });
  }


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

  const userWallet = async() => {
    try {
      const response = await getUserWallet(user.id);
      if(response?.status === 'success'){
        localStorage.setItem('kegowWallet', JSON.stringify(response?.data?.kegowData));
        setKegowWallet(response?.data?.kegowData); 
        return true           
      }else{
        setLoading(false);
        toastManager.addToast({
          message: `Complete your KYC to proceed`,
          type: "error",
        })
        navigate('/main/kyc')
      }
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data);
      if(error?.response?.data?.message === "User not found" && error?.response?.data?.status === "fail"){
        toastManager.addToast({
          message: `Complete your KYC to proceed`,
          type: "error",
        })
        navigate('/main/kyc')
      }
     
      
    }
    
  }

  const getSocietyFee = async () => {
    setLoading(true);
    const society = await getUserSociety(user?.id);
    if(society?.status === "success"){
      setUserSociety(society?.data);
      setOpenModal(true);
      setLoading(false);
    }else{
      setLoading(false);
    }
  
  };

  const payEntranceFee = async () => {
    setLoading(true);
    const user_wallet_data = await userWallet();
    if(user_wallet_data){
      if(kegowWallet?.balance < userSociety?.entrance_fee){
        toastManager.addToast({
          message: `Insufficient balance`,
          type: "error",
        })
        setLoading(false);
      }else{
        handleEntranceFeeDebit()
      }
    }
    // setOpenModal(true);
  };

  const handleEntranceFeeDebit = async () => {
    setLoading(true);
    const response = await debitEntranceFee(user.id);
    if(response?.status === "success"){
      setLoading(false)
      toastManager.addToast({
        message: response?.message,
        type: "success",
      });
      setLoading(false);
    }else{
      setLoading(false);
      console.log(response);
      
    }
  }

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
    // if(!kegowWallet){
      userWallet();
    // }
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
            <div style={{fontSize:"15px", display:"block"}}>
              <div>
                Account no. <br /><strong>{kegowWallet?.topUpAccountDetails?.accountNumber}</strong> <strong style={{cursor:"pointer", fontSize:"20px"}} onClick={() => copyToClipBoard("909888773")}><FaCopy /></strong>
              </div>
             
              <div style={{marginTop:"10px"}}>
                Account name. <br /> <strong>{kegowWallet?.topUpAccountDetails?.accountName}</strong> <strong style={{cursor:"pointer", fontSize:"20px"}} onClick={() => copyToClipBoard("909888773")}></strong>
              </div>
            </div>
          </span>
          <div className="dashboard__section__one__block" style={{padding:"10px"}}>
            {/* <h5>Kegow Wallet</h5>
            <h3>{`${parseFloat(kegowWallet?.topUpAccountDetails?.balance).toFixed(2)} ${wallets?.wallet?.currency}`}</h3>
            <div style={{fontSize:"15px", display:"block"}}>
              <div>
                Account no. <br /><strong>{kegowWallet?.topUpAccountDetails?.accountNumber}</strong> <strong style={{cursor:"pointer", fontSize:"20px"}} onClick={() => copyToClipBoard("909888773")}><FaCopy /></strong>
              </div>
             
              <div style={{marginTop:"10px"}}>
                Account name. <br /> <strong>{kegowWallet?.topUpAccountDetails?.accountName}</strong> <strong style={{cursor:"pointer", fontSize:"20px"}} onClick={() => copyToClipBoard("909888773")}></strong>
              </div>
            </div> */}
            <h5>Entrance Fee</h5>
            <p>You are required to pay your entrance fee to get a membership ID from your Society</p>
              <Button
                type="button"
                typeOf="primary"
                // className="signup__create__button"
                onClick={getSocietyFee}
              >
                Pay entrance fee
              </Button>
            
          </div>
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

      {openModal && 
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div className="modal__withdraw1">
          <h3>{userSociety?.entranceFee} naira will be debited from your wallet</h3>
          
          <Button className="modal__withdraw1__button" onClick={payEntranceFee}>
            {loading ? <ClipLoader color="#fff" size={20} /> : "Proceed to Fund wallet"}
          </Button>
        </div>
      </Modal>
      }
    </div>
  );
}

export default Dashboard;
