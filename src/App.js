import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";
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

function App() {
  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route path="/main" element={<Main />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="payment" element={<Payment />} />
              <Route path="loans" element={<Loan />} />
              <Route path="referrals" element={<Referrals />} />
              <Route path="fees" element={<Fees />} />
              <Route path="withdrawal" element={<Withdrawal />} />
              <Route path="donation" element={<Donation />} />
            </Route>
          </Route>

          {/* PRIVATE ROUTES */}
          <Route element={<PrivateRoute allowedRoles={ADMIN_ROLES} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
