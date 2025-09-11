import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./utils/ScrollToTop";
import { ADMIN_ROLES } from "./config/adminRoles";
import PublicRoute from "./route/publicRoute";
import PrivateRoute from "./route/privateRoute";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Main from "./pages/main/main/Main";
import Dashboard from "./pages/main/dashboard/Dashboard";
import Payment from "./pages/main/payments/Payment";
import Referrals from "./pages/main/referrals/Referrals";
import Loan from "./pages/main/loans/Loan";
import Fees from "./pages/main/fees/Fees";
import Withdrawal from "./pages/main/withdrawal/Withdrawal";
import Donation from "./pages/main/donation/Donation";
import SignupComplete from "./pages/auth/signup-complete/SignupComplete";
import LoanApplicationCompleted from "./pages/main/loan-completed/LoanCompleted";
import ToasterContainer from "./components/ui/toast/ToasterContainer";
import SignupReferral from "./pages/auth/signup-referral/SignupReferral";
import MessagingFeature from "./pages/main/chat/Messaging";
import SelectChat from "./pages/main/chat/SelectChat";
import LoanApplied from "./pages/main/loan-applied/LoanApplied";
import LoanRedirect from "./pages/main/loans/loanRedirect";
import LoanActive from "./pages/main/loan-active/LoanActive";
import NotFound from "./pages/extra/not-found/notFound";
import KYC from "./pages/main/kyc/Kyc";
import KycStrictRoute from "./route/kycStrictRoute";
import OtpScreen from "./pages/auth/otp/OtpScreen";
import ForgotPassword from "./pages/auth/password/ForgotPassword";
import UpdateProfile from "./pages/main/user/UpdateProfile";

function App() {
  return (
    <div className="app">
      <Router>
        <ToasterContainer />
        <ScrollToTop />
        <Routes>
          {/* PRIVATE ROUTES */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/main" element={<Main />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="fund" element={<Payment />} />
              <Route path="loans" element={<KycStrictRoute />}>
                <Route path="index" element={<Loan />} /> 
              </Route>
              <Route
                path="loan-completed"
                element={<LoanApplicationCompleted />}
              />
              <Route path="loan-active" element={<LoanActive />} />
              <Route path="loan-applied" element={<LoanApplied />} />
              <Route path="loan-redirect" element={<LoanRedirect />} />
              <Route path="referrals" element={<Referrals />} />
              <Route path="fees/dues" element={<Fees />} />
              <Route path="withdrawal" element={<Withdrawal />} />
              <Route path="donation" element={<Donation />} />
              <Route path="message" element={<SelectChat />} />
              <Route path="message-user/:id" element={<MessagingFeature />} />
              <Route path="/main/profile">
                <Route path="edit" element={<UpdateProfile />} />
                <Route path="kyc" element={<KYC />} />
              </Route>
            </Route>
          </Route>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="otp" element={<OtpScreen />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="signup/rc/:referralCode"
              element={<SignupReferral />}
            />
            <Route path="signup-complete" element={<SignupComplete />} />
          </Route>

          {/* CATCH ALL ROUTES */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
