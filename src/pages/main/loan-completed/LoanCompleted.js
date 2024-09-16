import "./loan-completed.css";
import loanCompleted from "../../../assets/images/main/loan-completed.png";

function LoanApplicationCompleted() {
  return (
    <div className="loan-completed">
      <img src={loanCompleted} alt="" />
      <h4>Loan Application Completed</h4>
      <p>We will get back to you in 3 Business Days</p>
    </div>
  );
}

export default LoanApplicationCompleted;
