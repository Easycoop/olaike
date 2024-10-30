import "./loan-active.css";
import loan from "../../../assets/images/main/rb_4941.png";

function LoanActive() {
  return (
    <div className="loan-completed">
      <img src={loan} alt="" />
      <h4>You have an active loan</h4>
      <p>Pay back to be eligible for another loan</p>
    </div>
  );
}

export default LoanActive;
