import { toFixedDown } from "../../../utils/truncate";

const PayLoanBtn = ({rep, setAmount, setIsOpen, setLatenessFee, setRepaymentId, setLoanId, setRepaymentOption}) => {
    return (
    <button 
        className="pay-btn"
        onClick={() => {
            setAmount(
                toFixedDown(
                    parseFloat(rep.weeklyAmount) + parseFloat(rep.weeklyInterest) - parseFloat(rep.amountPaid) - parseFloat(rep.interestPaid)
                )
            );

            setIsOpen(true);
            setLatenessFee(parseFloat(rep.weeklyInterest))
            setRepaymentId(rep.id);
            setLoanId(rep.loanApplicationId)
            setRepaymentOption("scheduled_payment")
        }}
        >Make Payment
    </button>
    );
}

export default PayLoanBtn;