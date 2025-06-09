import './user_loans.css';
import { ClipLoader } from "react-spinners";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/ui/form-elements/input";
import Modal from "../../../components/ui/modal/Modal";
import { formatUnixToDate, formatUnixToDateTime, ngDateFormat } from "../../../utils/time";
import { useState } from "react";
import {useInitializeTransaction, useVerifyTransactionFundLoan} from "../../../redux/actions/transactionAction";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { toFixedDown } from "../../../utils/truncate";

const UserLoans = ({ loans, user, fetchUserLoans }) => {
    const PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

    // custom hooks
    const initializeTransaction = useInitializeTransaction();
    const verifyTransactionFundLoan = useVerifyTransactionFundLoan();

    // state variables
    const [activeApp, setActiveApp] = useState(loans[0]?.id || null);
    const [amount, setAmount] = useState(null);
    const [expectedAmount, setExpectedAmount] = useState(0);
    const [latenessFee, setLatenessFee] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [repaymentId, setRepaymentId] = useState(null);
    const [loanId, setLoanId] = useState(null);

    // functions
    const toggleApplication = (id) => {
        setActiveApp(id);
    };

    const sumRepaymentTransactionsAmount = (transactions) => {
        return transactions.reduce((total, transaction) => {
            // transaction.transaction 
            return transaction.transaction ?  total + parseFloat(transaction.transaction?.amount) : total
        }, 0);
    }

    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false);
        setAmount(null);
    };
    
    const handleFund = async () => {
        if (!amount) {
          setErrorMessage("Please enter amount you want to fund");
          return;
        }
    
    
        if ( amount > expectedAmount) {
          setErrorMessage("This amount is bigger than the amount you are owing");
          return;
        }
        // Initialize transaction from backend
        try {
          setLoading(true);
          const response = await initializeTransaction({
            email: user.email,
            amount: amount,
            description: "loan repayment",
            repayment_id : repaymentId,
            loan_id: loanId,
            repayment_option:"scheduled_payment"
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
                  let response = await verifyTransactionFundLoan(res.reference); // Await the verification
    
                  if (
                    response?.payload.status === 200 ||
                    response?.payload.status === "success"
                  ) {
                    toastManager.addToast({
                      message: "Payment Successful",
                      type: "success",
                    });
                    fetchUserLoans();
                    // handleModalClick("done");
                  } else {
                    toastManager.addToast({
                      message: "Payment failed: Could not verify payment",
                      type: "error",
                    });
                    fetchUserLoans();
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
    };

    

  return (
    <div className="loan-container">
      {loans?.active?.map((app) => (
        <div key={app.id} className="loan-card">
          <div
            className={`loan-header ${activeApp === app.id ? "active" : ""}`}
            onClick={() => toggleApplication(app.id)}
          >
            <div>
              <div className="loan-title">Loan Application #{app.id}</div>
              <div className="loan-subtitle">
                Amount: ₦{app.amount.toLocaleString()} | Status: {app.status} | Date:{" "}
                {formatUnixToDate(app.approvalDate)}
              </div>
            </div>
            <span className="loan-toggle-icon">{activeApp === app.id ? "▼" : "▶"}</span>
          </div>

          {activeApp === app.id && (
            <div className="loan-body">
              <table className="loan-table">
                <thead>
                  <tr>
                    <th>Due Date</th>
                    <th>Amount Due</th>
                    <th>Interest Due</th>
                    <th>Amount Paid</th>
                    <th>Status</th>
                    
                    <th>Paid On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                
                {app.pastUnpaid.length > 0 && 
                <tr>
                    Past Due 
                </tr>
                }
                 {app.pastUnpaid.map((rep, idx) => (
                    <tr key={idx}>
                      <td>{formatUnixToDateTime(rep.dueDate)}</td>
                      <td>₦{rep.weeklyAmount.toLocaleString()}</td>
                      <td>₦{rep.weeklyInterest.toLocaleString()}</td>
                      <td>₦{sumRepaymentTransactionsAmount(rep.transactions)}</td>
                      <td>
                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) ? "paid" : (rep.transactions.length > 0)  ? 'Partly paid' :"unpaid"} 
                          {(rep.dueDate < Date.now() / 1000) && sumRepaymentTransactionsAmount(rep.transactions) < (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) && 
                          <>
                          <br /><span className="status-badge overdue">  Overdue </span>
                          </>
                          }
                      </td>
                      <td>
                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) 
                         ? ngDateFormat(rep.transactions[rep.transactions?.length -1]?.createdAt)  : "—"}
                      </td>
                      
                      <td>
                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) 
                         ? 
                        <span className="paid-label">Paid</span>  :
                        
                        <button 
                            className="pay-btn"
                            onClick={() => {
                                setAmount(toFixedDown((parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) - sumRepaymentTransactionsAmount(rep.transactions)));

                                setExpectedAmount(toFixedDown((parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) - sumRepaymentTransactionsAmount(rep.transactions)));

                                setIsOpen(true);
                                setLatenessFee(parseFloat(rep.weeklyInterest))
                                setRepaymentId(rep.id);
                                setLoanId(rep.loanApplicationId)
                            }}
                            >Make Payment</button>}
                       
                       
                      </td>
                     
                    </tr>
                  ))}

                {app.nextFutureUnpaid?.length > 0 && 
                
                <tr>
                  Upcoming
                  
                </tr>
                }
                
                {app.nextFutureUnpaid?.map((rep, idx) => (
                    <tr key={idx}>
                      <td>{formatUnixToDateTime(rep.dueDate)}</td>
                      <td>₦{rep.weeklyAmount.toLocaleString()}</td>
                      <td>₦{rep.weeklyInterest.toLocaleString()}</td>
                      <td>₦{sumRepaymentTransactionsAmount(rep.transactions)}</td>
                      <td>
                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) ? "paid" : (rep.transactions.length > 0)  ? 'Partly paid' :"unpaid"} 
                          {(rep.dueDate < Date.now() / 1000) && sumRepaymentTransactionsAmount(rep.transactions) < (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) && 
                          <>
                          <br /><span className="status-badge overdue">  Overdue </span>
                          </>
                          }
                      </td>
                      <td>
                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) 
                         ? ngDateFormat(rep.transactions[rep.transactions?.length -1]?.createdAt)  : "—"}</td>
                      <td>

                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) 
                         ? 
                        <span className="paid-label">Paid</span>  :
                        
                        <button 
                            className="pay-btn"
                            onClick={() => {
                                setAmount(toFixedDown((parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) - sumRepaymentTransactionsAmount(rep.transactions)));

                                setExpectedAmount(toFixedDown((parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) - sumRepaymentTransactionsAmount(rep.transactions)));

                                setIsOpen(true);
                                setLatenessFee(parseFloat(rep.weeklyInterest))
                                setRepaymentId(rep.id);
                                setLoanId(rep.loanApplicationId)
                            }}
                            >Make Payment</button>}
                       
                       
                      </td>
                     
                    </tr>
                  ))}

                

                {app.pastPaid?.length > 0 && 
                <>
                  <tr>
                    <td colSpan="7"><hr /></td>
                  </tr>
                   <td colSpan="7">Paid</td>
                </>
                
                }
                {app.pastPaid?.map((rep, idx) => (
                    <tr key={idx}>
                      <td>{formatUnixToDateTime(rep.dueDate)}</td>
                      <td>₦{rep.weeklyAmount.toLocaleString()}</td>
                      <td>₦{rep.weeklyInterest.toLocaleString()}</td>
                      <td>₦{sumRepaymentTransactionsAmount(rep.transactions)}</td>
                      <td>
                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) ? "paid" : (rep.transactions.length > 0)  ? 'Partly paid' :"unpaid"} 
                          {(rep.dueDate < Date.now() / 1000) && sumRepaymentTransactionsAmount(rep.transactions) < (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) && 
                          <>
                          <br /><span className="status-badge overdue">  Overdue </span>
                          </>
                          }
                      </td>
                      <td>
                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) 
                         ? ngDateFormat(rep.transactions[rep.transactions?.length -1]?.createdAt)  : "—"}</td>
                      <td>

                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) 
                         ? 
                        <span className="paid-label">Paid</span>  :
                        
                        <button 
                            className="pay-btn"
                            onClick={() => {
                                setAmount(toFixedDown((parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) - sumRepaymentTransactionsAmount(rep.transactions)));

                                setExpectedAmount(toFixedDown((parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) - sumRepaymentTransactionsAmount(rep.transactions)));

                                setIsOpen(true);
                                setLatenessFee(parseFloat(rep.weeklyInterest))
                                setRepaymentId(rep.id);
                                setLoanId(rep.loanApplicationId)
                            }}
                            >Make Payment</button>}
                       
                       
                      </td>
                     
                    </tr>
                  ))}
                

                {app.futurePaid?.map((rep, idx) => (
                    <tr key={idx}>
                      <td>{formatUnixToDateTime(rep.dueDate)}</td>
                      <td>₦{rep.weeklyAmount.toLocaleString()}</td>
                      <td>₦{rep.weeklyInterest.toLocaleString()}</td>
                      <td>₦{sumRepaymentTransactionsAmount(rep.transactions)}</td>
                      <td>
                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) ? "paid" : (rep.transactions.length > 0)  ? 'Partly paid' :"unpaid"} 
                          {(rep.dueDate < Date.now() / 1000) && sumRepaymentTransactionsAmount(rep.transactions) < (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) && 
                          <>
                          <br /><span className="status-badge overdue">  Overdue </span>
                          </>
                          }
                      </td>
                      <td>
                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) 
                         ? ngDateFormat(rep.transactions[rep.transactions?.length -1]?.createdAt)  : "—"}</td>
                      <td>

                        {sumRepaymentTransactionsAmount(rep.transactions) >= (parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) 
                         ? 
                        <span className="paid-label">Paid</span>  :
                        
                        <button 
                            className="pay-btn"
                            onClick={() => {
                                setAmount(toFixedDown((parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) - sumRepaymentTransactionsAmount(rep.transactions)));

                                setExpectedAmount(toFixedDown((parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest)) - sumRepaymentTransactionsAmount(rep.transactions)));

                                setIsOpen(true);
                                setLatenessFee(parseFloat(rep.weeklyInterest))
                                setRepaymentId(rep.id);
                                setLoanId(rep.loanApplicationId)
                            }}
                            >Make Payment</button>}
                       
                       
                      </td>
                     
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {/* FUND AMOUNT MODAL */}
        <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="modal__withdraw1">
            <h3>Enter how much you want to pay</h3>  <small className="text-success">Due amount is <b>{expectedAmount}</b> naira</small>
            {latenessFee > 0 && <small className="modal__withdraw1__error">Attention! <br/> You have an interest of {latenessFee} naira for this week's payment</small>}
            
            <Input
                type="number"
                placeholder="Enter an amount"
                name="amount"
                defaultValue={amount}
                disabled={loading}
                onChange={(e) => setAmount(e.target.value)}
            />
            {errorMessage && (
                <h5 className="modal__withdraw1__error">{errorMessage}</h5>
            )}
            <Button className="modal__withdraw1__button" onClick={handleFund}>
                {loading ? <ClipLoader color="#fff" size={20} /> : "Make Payment"}
            </Button>
            </div>
        </Modal>

      
    </div>
  );
};

export default UserLoans;
