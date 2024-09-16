import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin.dashoard/Admin.dashboard";
import AdminTransaction from "./pages/admin.transaction/Admin.transaction";
import AdminSettings from "./pages/admin.settings/Admin.settings";
import DashboardUser from "./pages/dashboard.user/Dashboard.user";
import AdminCreateUser from "./pages/admin.create.user/Admin.create.user";
import AdminLoanApplication from "./pages/admin.loan.applications/Admin.loan.applications";
import SingleLoanApplications from "./pages/admin.single.loan.applications/Admin.single.loan.application";
import Admin from "./pages/admin/Admin";
import NotFound from "./pages/not-found/NotFound";
import ErrorBoundary from "./pages/error-boundary/ErrorBoundary";
import ScrollToTop from "./utils/ScrollToTop";
import "./app.css";
import AdminSingleUser from "./pages/admin.single.user/Admin.single.user";
import AdminEditUser from "./pages/admin.edit.user/Admin.edit.user";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Admin />}>
              <Route index element={<AdminDashboard />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/users" element={<DashboardUser />} />
              <Route path="/transaction" element={<AdminTransaction />} />
              <Route path="/user" element={<AdminSingleUser />} />
              <Route path="/edit-user" element={<AdminEditUser />} />
              <Route path="/setting" element={<AdminSettings />} />
              <Route path="/create-user" element={<AdminCreateUser />} />
              <Route
                path="/loan-applications"
                element={<AdminLoanApplication />}
              />
              <Route
                path="/loan-application/:applicationId"
                element={<SingleLoanApplications />}
              />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
