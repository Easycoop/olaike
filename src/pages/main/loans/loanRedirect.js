import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoanRedirect = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.loanStatus == "pending") {
      navigate("/main/loan-applied");
    } else if (user.loanStatus == "inactive") {
      navigate("/main/loans");
    } else if (user.loanStatus == "active") {
      navigate("/main/loan-active");
    } else {
      // Redirect to home page or any other default page
    }
  }, []);

  return;
};

export default LoanRedirect;
