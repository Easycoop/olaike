import { toFixedDown } from "../../../utils/truncate";

const PayLoanBtn = ({rep, setAmount, setIsOpen, setLatenessFee, setRepaymentId, setLoanId}) => {
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
        }}
        >Make Payment
    </button>
    );
}

export default PayLoanBtn;