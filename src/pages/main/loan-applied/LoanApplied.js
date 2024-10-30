import "./loan-applied.css";
import loanCompleted from "../../../assets/images/main/rb_24007.png";

function LoanApplied() {
  return (
    <div className="loan-completed">
      <img src={loanCompleted} alt="" />
      <h4>You have a pending loan application</h4>
      <p>We will get back to you soon</p>
    </div>
  );
}

export default LoanApplied;
