import React, {useState} from "react";
// import "../../../pages/main/loans/user_loans.css"; 
import "./AccountDetail.css";
import { BiCopy, BiLoaderCircle  } from "react-icons/bi";
import { copyToClipBoard, generateRandomString } from "../../../utils/generic";
import { useSimulateWebHook } from "../../../redux/actions/transactionAction";

const AccountDetailsModal = ({ isOpen, onClose, account, amount }) => {  
    const simulateWebHook = useSimulateWebHook();
    const [checking, setChecking] = useState(false);

    if (!isOpen) return null;

    const handleWebHookSimulation = async () => {
        const response = await simulateWebHook({
            transactionType:"INWARD__TRANSFER_SUCCESS",
            amount:amount,
            receiverAccount:account?.number,
            transactionReference:await generateRandomString(15),
            narration:"entrance_fee"
        });
    }

    return (
        <div className="modal-overlay" >
        <div className="modal-container">
            <button className="modal-close bg-red-500" onClick={onClose}>
            ✖ close
            </button>

            <div className="modal-content">
                <div className="modal-instruction">
                <p>Please transfer the sum of <strong>₦{amount}</strong> to the account details below.</p>
                <p> Once payment is made, click "I have paid" button below.</p>
                </div>
                
                <h1 className="modal-title mt-3">Account Details</h1> <hr />

                <div className="account-details">
                <p>
                    <strong>Name:</strong> {account?.name}
                </p>
                <p className="flex items-center gap-1">
                    <strong>Account Number:</strong> {account?.number} <span onClick={() => {copyToClipBoard(account?.number); alert("Account number Copied ")}} className="cursor-pointer"><BiCopy /></span>
                </p>
                <p>
                    <strong>Bank:</strong> {account?.bank}
                </p>
                </div>

                <div className="modal-actions">
                {   checking ? 
                    
                    <button 
                        className="withdraw__modal__button flex justify-center items-center gap-1 flex-col" 
                        onClick={() => {setChecking(true); simulateWebHook();}}
                        disabled={true}
                    >
                        {/* <BiLoaderCircle className="animate-spin text-2xl text-blue-600 text-white"/>   */}
                       
                        
                        <span style={{fontSize:"12px"}}>
                            {"checking transaction status"}
                        </span>
                         <div className="flex space-x-2">
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.3s]"></span>
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.6s]"></span>
                            
                        </div>
                        
                    </button>
                    
                    
                         : 
                    <button className="withdraw__modal__button" 
                        onClick={() => {setChecking(true); handleWebHookSimulation();}}
                    >
                    I have paid 
                    </button>
                }
                
                </div>
            </div>
            
        </div>
        </div>
    );
};



export default AccountDetailsModal;
