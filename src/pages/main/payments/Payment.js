import "./payment.css";
import "../fees/fees.css";  
import "../../../components/ui/modal/modal-children-styles/modal-withdraw1.css";
import Button from "../../../components/ui/button/Button";
import payment from "../../../assets/images/main/payment.png";
import Modal from "../../../components/ui/modal/Modal";
import { useEffect, useState, useContext } from "react";
import Input from "../../../components/ui/form-elements/input";
import { useSelector } from "react-redux";
import {
  useInitializeTransaction,
  useVerifyTransactionFund,
  useVerifyTransactionFundLoan,
  useVerifyTransactionFundSavings,
  usePayThrift
} from "../../../redux/actions/transactionAction";
import { ClipLoader } from "react-spinners";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { FaCircle } from "react-icons/fa6";
import Loading from "../../../components/splash/loading/Loading";
import { useGetActiveProgram } from "../../../redux/actions/societyAction";
import { formatUnixToDate, ngDateTimeFormat } from "../../../utils/time";
import { useGetWallets } from "../../../redux/actions/walletAction";
import {ConfigContext} from "../../../context/ConfigProvider";


const Payment = ()  => {
  const paymentProcessor = process.env.REACT_APP_PAYMENT_PROVIDER
;
  const PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  // custom hooks
  const initializeTransaction = useInitializeTransaction();
  const verifyTransactionFund = useVerifyTransactionFund();
  const verifyTransactionFundSavings = useVerifyTransactionFundSavings();
  const verifyTransactionFundLoan = useVerifyTransactionFundLoan();
  const getActiveProgram = useGetActiveProgram();
  const getWallets = useGetWallets();
  const payThrift = usePayThrift();

  // contexts
  const { config } = useContext(ConfigContext);

  // states
  const { user } = useSelector((state) => state.auth);
 
  // const latenessCharge = user.loanStatus == "active" ? 500 : 100;
  const [wallets, setWallets] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [type, setType] = useState("");
  const [isOpen, setIsOpen] = useState({
    fund: false,
    savings: false,
    loan: false,
  });
  
  const [thriftId, setThriftId] = useState(null);
  const [latenessFee, setLatenessFee] = useState(0);
  const [minValue, setMinValue] = useState(650+latenessFee);

  const [activeProgram, setActiveProgram] = useState([]);
  const [activeLoan, setActiveLoan] = useState(null);
  const [savingsWallet, setSavingsWallet] = useState(null);
  
  // const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setIsOpen({
      fund: false,
      savings: false,
      loan: false,
    });
    setErrorMessage("");
    setAmount(null);
  };

  const getLatenessCharge = (thriftDueDate) => {
    
    if(thriftDueDate > activeLoan?.approvalDate){
      if (config.settings?.thriftControl === "Society") {
        return parseFloat(user.Group.loanee_thrift_lateness_fee) ?? 0;
        
      }
      if (config.settings?.thriftControl === "Union") {
        return parseFloat(config.settings.union.thriftLatenessFee) ?? 0;
      }
      // return 500
    }else{
      if (config.settings?.thriftControl === "Society") {
        return parseFloat(user.Group.thrift_lateness_fee) ?? 0;
        
      }
      if (config.settings?.thriftControl === "Union") {
        return parseFloat(config.settings.union.thriftLatenessFee) ?? 0;
      }
    }
  };

  const handleModalClick = (option) => {
    closeModal();
    if (option === "fund") {
      setIsOpen((prev) => ({ ...prev, fund: true }));
    } else if (option === "savings") {
      setIsOpen((prev) => ({ ...prev, savings: true }));
    } else if (option === "loan") {
      setIsOpen((prev) => ({ ...prev, loan: true }));
    } else return;
  };

  const handleFund = async () => {
    if (!amount) {
      setErrorMessage("Please enter amount you want to fund");
      return;
    }else if(amount < minValue){
      setErrorMessage("Minimum amount is NGN "+minValue);
      return;
    }


    if (type == "loan" && amount > user.loanBalance) {
      setErrorMessage("This amount is bigger than the amount you are owing");
      return;
    }
    // Initialize transaction from backend
    if(paymentProcessor === "paystack"){
      return await initalisePaystack();
    }

    if(paymentProcessor === "kegow"){
      return payWithKegow();
    }
    
  };

  const initalisePaystack = async()=>{
      try {
        setLoading(true);
        const response = await initializeTransaction({
          email: user.email,
          amount: amount,
          description: "thrift",
          thrift_id: thriftId,
          lateness_fee:latenessFee,
        });

        const { reference } = response.payload.data.data;

        closeModal();

        // Open Paystack modal to complete payment
        const handler = window.PaystackPop.setup({
          key: PAYSTACK_KEY, // Paystack public key
          email: user.email,
          amount: amount * 100,
          currency: "NGN",
          ref: reference, // Reference from backend initialization
          callback: function (res) {
            // Payment completed, verify the payment
            const verifyPayment = async () => {
              try {
                let response;

                if (type == "fund") {
                  response = await verifyTransactionFund(res.reference); // Await the verification
                }
                if (type == "savings") {
                  response = await verifyTransactionFundSavings(res.reference); // Await the verification
                }
                if (type == "loan") {
                  response = await verifyTransactionFundLoan(res.reference); // Await the verification
                }

                if (
                  response?.payload.status === 200 ||
                  response?.payload.status === "success"
                ) {
                  toastManager.addToast({
                    message: "Payment Successful",
                    type: "success",
                  });
                  fetchActivePrograms();
                  // handleModalClick("done");
                } else {
                  toastManager.addToast({
                    message: "Payment failed: Could not verify payment",
                    type: "error",
                  });
                }
              } catch (error) {
                console.error("Verification error:", error);
                toastManager.addToast({
                  message: "Payment failed: Could not verify payment",
                  type: "error",
                });
              }
            };

            // Call the async function inside the synchronous callback
            verifyPayment();
          },

          onClose: function () {
            toastManager.addToast({
              message: "Payment canceled",
              type: "error",
            });
          },
        });

        handler.openIframe(); // Open the Paystack modal
      } catch (error) {
        console.error("Payment initialization failed:", error);
        toastManager.addToast({
          message: "Payment initialization failed",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
  }

  const payWithKegow = async () => {
    try {
        setLoading(true);
        const response = await payThrift({
          description: "thrift",
          amount: amount,
          thrift_id: thriftId,
          lateness_fee:latenessFee
        });

        setLoading(false);
        console.log(response);
        if (response?.payload.status === "success") {
          toastManager.addToast({
            message: "Payment Successful",
            type: "success",
          });
          fetchActivePrograms();
          closeModal()
        } else {
          toastManager.addToast({
            message: "Payment failed: Could not verify payment",
            type: "error",
          });
        }
    } catch (error) {
      setLoading(false);
      console.error("Payment  failed: ");
      console.log(error);
      toastManager.addToast({
        message: "Payment  failed",
        type: "error",
      });
    }
   
  }

  const fetchActivePrograms = async () =>{
    setLoading(true);
    try{
      const response = await getActiveProgram(user.groupId);
      console.log(response);
      
      if (response?.payload.status === "success") {
        setActiveProgram(response?.payload?.data)
        setActiveLoan(response?.payload?.active_loan)
      } else {
        setErrorMessage(response.message);
      }
    
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };


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
  
  useEffect(()=>{
    
    handleGetWallets();
    fetchActivePrograms()
  }, []);

  useEffect(() => {
    let minThrift;
    if (config.settings?.thriftControl === "Society") {
       minThrift =  parseFloat(user.Group.minimum_thrift_amount) ?? 0;
      
    }
    if (config.settings?.thriftControl === "Union") {
      minThrift =  parseFloat(config.settings.union.minimumThriftAmount) ?? 0;
    }
    
    setMinValue(minThrift+latenessFee);

    
  }, [latenessFee]);

  useEffect(() => {
    const sWallet = wallets?.subWallets?.find(wallet => wallet?.name === "Savings Wallet");
    setSavingsWallet(sWallet);
  }, [wallets])

  
  return (
    <div className="withdraw">
     
      <div className="dashboard-root">
        <div className="dashboard-wrapper">
          <div className="card primary-card">
            <h2>Thrift and Savings</h2>
            <p>
              Here, you can manage your weekly thrift and also do special savings. The "Special Savings" button is for your special savings while the  table below is for the "Weekly Thrift"
            </p>
          </div>
          
          <div className="card secondary-card">
            <h3>Special Savings</h3>
            <div className="balance">₦{`${savingsWallet?.balance.toLocaleString()}`} </div>
            <button className="fund-button" 
              onClick={() => {
              setType("savings");
              handleModalClick("savings");
            }}
            >Click here to save</button>
          </div>

          <div className="card secondary-card">
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>
              <h3>Contibution Programs</h3>

              <div className="balance"> Thrift Balance: ₦{`${wallets?.subWallets?.find(wallet => wallet?.name === "Thrift")?.balance.toLocaleString()} `}  </div>
            </div>

            <section className="ad__novel__sc__three"> 
                {activeProgram.length == 0 && !loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                      gap: "20px",
                    }}
                  >
                    <p>No active contribution program found yet </p>
                  </div>
                ) : (
                  <div className="admin-table-body">
                    {activeProgram.map((program, i) => (
                      
                      <div key={i} className="">
                        <div className="admin-table">
                          <div className="admin-table-header">
                            <div className="admin-table-cell">Title</div>
                            <div className="admin-table-cell">Min Amount</div>
                            <div className="admin-table-cell">Started on</div>
                            <div className="admin-table-cell">Ends on</div>
                            <div className="admin-table-cell">Weekly Deadlines</div>
                            <div className="admin-table-cell">Status </div>
                          
                          </div>
                          
                        </div>

                        <div className="admin-table-row">
                          <div className="admin-table-cell">{program.title}</div>
                          <div className="admin-table-cell">{`${program.currency} ${program.minAmount}`}</div>
                          <div className="admin-table-cell">{program.startDate}</div>
                          <div className="admin-table-cell">{program.endDate}</div>
                          <div className="admin-table-cell">{program.deadline}</div>
                          <div className="admin-table-cell">
                            <span
                              style={{
                                border: `1px solid ${
                                  program.status == "active" ? "#0BFD15" : "#dc143c"
                                }`,
                                borderRadius: "20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "15px",
                                padding: "10px 15px",
                                width: "max-content",
                              }}
                            >
                              <FaCircle
                                color={program.status == "active" ? "#0BFD15" : "#dc143c"}
                              />
                              {program.status}
                            </span>
                          </div>
                        </div>

                        <h3>You Thrift Payments</h3>

                          <div className="admin-table">
                            <div className="admin-table-header">
                              <div className="admin-table-cell">Amount Paid</div>
                              <div className="admin-table-cell">Date Paid</div>
                              <div className="admin-table-cell">Due Date</div>
                              <div className="admin-table-cell">Lateness Fee (NGN)</div>
                              <div className="admin-table-cell">Action</div>
                            
                            </div>
                            
                          </div>
                          {
                            program.ThriftRecords?.map(thrift=>(
                              <div className="admin-table-row">
                                <div className="admin-table-cell">{thrift.transaction?.amount ? thrift.transaction?.amount : 0.00}</div>
                                <div className="admin-table-cell">{thrift.transaction?.createdAt ? ngDateTimeFormat(thrift.transaction?.createdAt) : "N/A"}</div>
                                <div className="admin-table-cell">{formatUnixToDate(thrift.dueDate)}</div>
                                <div className="admin-table-cell">
                                  {thrift.transaction && thrift.transaction.status == 'success' ? 
                                  thrift.fees?.length > 0 && thrift.fees.find((fee) => fee.type === "late_recurrent_payment") ? thrift.fees.find((fee) => fee.type === "late_recurrent_payment").amount : "N/A"
                                  :
                                  thrift.dueDate < Math.floor(Date.now() / 1000) ? getLatenessCharge(thrift.dueDate) :" N/A"
                                }
                                </div>

                                <div className="admin-table-cell">{!(thrift.transaction && thrift.transaction.status == 'success') ?
                                thrift.dueDate < Math.floor(Date.now() / 1000) ? 
                                  <button onClick={() => {
                                    setType("fund");
                                    handleModalClick("fund");
                                    setLatenessFee(getLatenessCharge(thrift.dueDate))
                                    setThriftId(thrift.id)
                                  }}>Pay Thrift</button> :
                                    <button onClick={() => {
                                    setType("fund");
                                    handleModalClick("fund");
                                    setLatenessFee(0)
                                    setThriftId(thrift.id)
                                  }}>Pay Thrift</button>
                                :
                                <span className="paid">Paid</span>
                                }
                                </div>
                              </div>
                            ))
                          }
                        
                      </div>
                    ))}
                  </div>
                )}
                {loading && <Loading />}
            </section>
            
          </div>

          
        </div>
      </div>

      
      

      {/* FUND AMOUNT MODAL */}
      <Modal isOpen={isOpen.fund} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Enter how much you want to fund</h3>
          {latenessFee > 0 && <small className="modal__withdraw1__error">Attention! <br/> You have a lateness fee of {latenessFee} naira for this week's thrift</small>}
          
          <small className="text-danger">Minimum of {minValue} naira {latenessFee > 0 && "(Lateness fee inclusive)"}</small>
          <Input
            type="number"
            placeholder="Enter an amount"
            name="amount"
            min="{minValue}"
            disabled={loading}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errorMessage && (
            <h5 className="modal__withdraw1__error">{errorMessage}</h5>
          )}
          <Button className="modal__withdraw1__button" onClick={handleFund}>
            {loading ? <ClipLoader color="#fff" size={20} /> : "Fund wallet"}
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isOpen.savings} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Enter how much you want to save</h3>
          <Input
            type="number"
            placeholder="Enter an amount"
            name="amount"
            value={amount}
            disabled={loading}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errorMessage && (
            <h5 className="modal__withdraw1__error">{errorMessage}</h5>
          )}
          <Button className="modal__withdraw1__button" onClick={handleFund}>
            {loading ? <ClipLoader color="#fff" size={20} /> : "Save"}
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isOpen.loan} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Enter how much you want to repay from loan</h3>
          <Input
            type="number"
            placeholder="Enter an amount"
            name="amount"
            value={amount}
            disabled={loading}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errorMessage && (
            <h5 className="modal__withdraw1__error">{errorMessage}</h5>
          )}
          <Button className="modal__withdraw1__button" onClick={handleFund}>
            {loading ? <ClipLoader color="#fff" size={20} /> : "Repay loan"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Payment;
