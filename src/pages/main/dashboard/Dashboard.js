import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import { useGetTransactions } from "../../../redux/actions/transactionAction";
import { useSelector } from "react-redux";
import Loading from "../../../components/splash/loading/Loading";
import NoResult from "../../../components/splash/no-result/NoResult";
import { useGetWallets, useGetWalletBalance } from "../../../redux/actions/walletAction";
import Button from "../../../components/ui/button/Button";
import { useGetDashboardData, useDebitEntranceFee } from "../../../redux/actions/userAction";
import {getUserWallet} from "../../../services/walletService";
import toastManager from "../../../components/ui/toast/ToasterManager";
import VirtualAccountCard from "../../../components/ui/VirtualAccountCard";
import GenericCard from "../../../components/ui/GenericCard";
import { ConfigContext } from "../../../context/ConfigProvider";
import Modal from "../../../components/ui/modal/Modal";
import WalletCard from "../../../components/ui/WalletCard";
import { ngDateTimeFormat } from "../../../utils/time";



const Dashboard = ()  => {
  const navigate = useNavigate();
  const { config } = useContext(ConfigContext);
  const getTransactions = useGetTransactions();
  const getWallets = useGetWallets();
  const getDashboardData = useGetDashboardData();
  const getWalletBalance = useGetWalletBalance();

  const [wallets, setWallets] = useState({});
  const pageRef = useRef(null); // ensure this is null initially
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  // const [dashboardData, setDashboardData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // const [kegowWallet, setKegowWallet] = useState(localStorage.getItem('kegowWallet') &&  localStorage.getItem('kegowWallet') != "undefined" ? JSON.parse(localStorage.getItem('kegowWallet')) : null);

  const debitEntranceFee = useDebitEntranceFee();
  
  const [entranceFee, setEntranceFee] = useState();


  const handleGetWallets = async () => {
    setLoading(true);
    try {
      const response = await getWallets(user.id);
      if (response?.payload.status === "success") {
        
        setWallets(response.payload.data);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error.response.message);
    } finally {
      setLoading(false);
    }
  };



  const handleGetDashboardData = async () => {
    setLoading(true);
    try {
      const response = await getDashboardData(user.id);
      if (response?.payload.status === "success") {
        
        // setDashboardData(response.payload.data);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetTransactions = async () => {
    setLoading(true);
    try {
      const response = await getTransactions({ userId: user.id, page: page });
      console.log('transactions response');
      console.log(response);
      if (response?.payload.status === "success") {
        
        const newData = response.payload.data.result;
        setTransactions(newData);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error.response.message);
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

  const userWallet = async() => {
    try {
      const response = await getUserWallet(user.id);
      if(response?.status === 'success'){
        localStorage.setItem('kegowWallet', JSON.stringify(response?.data?.kegowData));
        // setKegowWallet(response?.data?.kegowData); 
        return true           
      }else{
        setLoading(false);
        toastManager.addToast({
          message: `Complete your KYC to proceed`,
          type: "error",
        })
        navigate('/main/profile/kyc')
      }
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data);
      if((error?.response?.data?.message === "User not found" && error?.response?.data?.status === "fail") || error?.response?.data?.error === "no_kegow_account" ){
        toastManager.addToast({
          message: `Complete your KYC to proceed`,
          type: "error",
        })
        navigate('/main/profile/kyc')
      }
     
      
    }
    
  }

  const payEntranceFee = async () => {
    try {
        if(!entranceFee){
        toastManager.addToast({
          message: `Entrance fee not set`,
          type: "error",
        })
        return;
      }
      setLoading(true);
      const user_wallet_data = await userWallet();
     
      if(user_wallet_data){
        if(user.Wallet?.balance < entranceFee){
          toastManager.addToast({
            message: `Insufficient balance`,
            type: "error",
          })
           setLoading(false);
        }else{
          handleEntranceFeeDebit()
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
    
    // setOpenModal(true);
  };

  const handleEntranceFeeDebit = async () => {
    try { 
      const response = await debitEntranceFee(user.id);
      console.log('entrance fee resp')
      console.log(response)
      if(response?.payload?.status === "success"){
        setLoading(false)
        toastManager.addToast({
          message: response?.payload.data.transfer.message,
          type: "success",
        });
        setLoading(false);
        setIsOpen(false);
        getWalletBalance();
      }else{
        setLoading(false);
        
      }
      
    } catch (error) {
       console.log('entrance fee error')
      console.log(error)
      setLoading(false);
      toastManager.addToast({
        message: error?.message,
        type: "error",
      })
    }
   
  }

  useEffect(() => {
    handleGetTransactions();
  }, [page]);

  useEffect(() => {
    getWalletBalance();
    // console.log('user',user)
  }, []);

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
    if(!user.address){
       toastManager.addToast({
          message: `Complete your profile to proceed`,
          type: "error",
        })
      navigate('/main/profile/edit')
    }else{
      userWallet();
      handleGetWallets();
      handleGetDashboardData();
    }
    
  }, []);

   useEffect(() => {
    if (config.settings?.entranceFeeControl === "Society") {
      setEntranceFee(user.Group.entrance_fee ?? "");
      
    }
    if (config.settings?.entranceFeeControl === "Union") {
      setEntranceFee(config.settings.union.entranceFee ?? "");
    }
  }, [config]);
// config.settings?.loanSettingsControl === 'Union' ? config.settings.union.entranceFee : user.Group.entranceFee
  return (
    <div
      className="dashboard"
      ref={pageRef}
      // style={{ height: "40vh", overflowY: "auto" }}
    >
      <section className="dashboard__section__one">
        {/* <h5 >My wallets</h5> */}
        
        <div className="flex justify-between gap-1 ">
          <VirtualAccountCard 
            accountName={user?.Wallet?.kegow_account_name} 
            accountNumber={user?.Wallet?.kegow_account} 
            bankName={process.env.REACT_APP_KEGOW_BANK_NAME} 
            balance={user?.Wallet?.balance} 
            onFundWallet={getWalletBalance}
          />
          {
            user.GroupMembership ? 
            <div className="flex gap-2 flex-wrap w-full sm:w-6/12 lg:w-9/12 justify-end">
              {wallets?.subWallets?.map((wallet, i) => {
                return (
                  <WalletCard 
                    key={i} 
                    WalletTitle={wallet?.name} 
                    balance={wallet?.balance} 
                    description={wallet?.name ==="Loan" ? "Your loan balance" :(wallet?.name === "Savings Wallet"?"Your savings balance":"Your thrift balance") } 
                    actionLink={wallet?.name ==="Loan" ? "/main/loans/index" :(wallet?.name === "Savings Wallet"?"/main/fund":"/main/fund")} 
                    actionTitle={wallet?.name ==="Loan" ? "Manage" :(wallet?.name === "Savings Wallet"?"See savings":"Manage thrift")} 
                  />
                 
                );
              })}
              </div>
            :
            <GenericCard title="Entrance Fee" description={`You are required to pay your entrance fee of ₦${entranceFee} to get a membership ID from your Society.`} buttonText="Pay entrance fee" buttonAction={()=>setIsOpen(true)} amount={entranceFee} loading={loading} />
          }
          
         
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
                    {ngDateTimeFormat(transaction.createdAt)}
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

      
      <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)} children={
        <div>
          <p>To Pay entrance fee, the sum of {entranceFee} naira will be deducted from your wallet</p>
          <div className="flex justify-between gap-3 mt-3">
            <Button
                type="button"
                typeOf="danger"
                // className="signup__create__button"
                onClick={()=>setIsOpen(false)}
              >
                Cancel
            </Button>
            <Button
                type="button"
                typeOf="primary"
                // className="signup__create__button"
                onClick={payEntranceFee}
                disabled={loading}
              >
                {loading ? 'processing...' : 'proceed to pay'}
              </Button>
          </div>
      </div>
      } />
    </div>
  );
}

export default Dashboard;
