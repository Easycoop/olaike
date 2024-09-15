import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import Home from "./user/pages/home/Home";
import Listproperty from "./user/pages/listproperty/Listproperty";
import Becomeahost from "./user/pages/becomeahost/Becomeahost";
import Becomeahostsuccess from "./user/pages/becomeahostsuccess/Becomeahostsuccess";
import ScrollToTop from "./utils/ScrollToTop";
import Product from "./user/pages/product/Product";
import Payment from "./user/pages/payment/Payment";
import NotFound from "./common-pages/not-found/NotFound";
import Layout from "./route/Layout";
import RequireAuth from "./route/RequiredAuth";
import Unauthorized from "./common-pages/unauthorized/Unauthorized";
import Properties from "./user/pages/properties/Properties";
import PersistLogin from "./route/PersistLogin";
import PersonalInfo from "./user/pages/personal.info/PersonalInfo";
import AccountStudent from "./user/pages/account.student/Account.student";
import AccountPayment from "./user/pages/account.payment/AccountPayment";
import AccountLogin from "./user/pages/account.login/account.login";
import AccountNotifications from "./user/pages/account.notifications/account.notifications";
import AccountPrivacy from "./user/pages/account.privacy/Account.privacy";
import AccountTransaction from "./user/pages/account.transactions/Account.transaction";
import Wishlist from "./user/pages/wishlist/Wishlist";
import StudentProperty from "./user/pages/student.property/Student.property";
import Agents from "./user/pages/agents/Agents";
import SingleAgent from "./user/pages/single.agent/Single.agent";
import SingleAgency from "./user/pages/single.agency/Single.agency";
import Helpcenter from "./user/pages/helpcentre/Helpcenter";
import BecomeAnAgent from "./user/pages/become.an.agent/Become.an.agent";
import BecomeStudent from "./user/pages/become.a.student/Become.a.student";
import StudentListing from "./user/pages/student.listing/Student.listing";
import PropertyManagement from "./user/pages/property.management/Property.management";
import DashboardUser from "./admin/pages/dashboard.user/Dashboard.user";
import DashboardProperties from "./admin/pages/dashboard.properties/Dashboard.properties";
import UtilitySchedule from "./admin/pages/utility.schedule/Utility.schedule";
import AdminMessage from "./admin/pages/admin.message/Admin.message";
import AdminNotice from "./admin/pages/admin.notice/Admin.notice";
import AdminSingleNotice from "./admin/pages/admin.single.notice/Admin.single.notice";
import Admin from "./admin/pages/admin/Admin";
import AdminDashboard from "./admin/pages/admin.dashoard/Admin.dashboard";
import AdminTransaction from "./admin/pages/admin.transaction/Admin.transaction";
import AdminSingleUser from "./admin/pages/admin.single.user/Admin.singlel.user";
import AdminSettings from "./admin/pages/admin.settings/Admin.settings";
import AdminEdituser from "./admin/pages/admin.edit.user/Admin.edit.user";
import AdminTicket from "./admin/pages/admin.ticket/Admin.ticket";
import AdminCreateTicket from "./admin/pages/admin.create.ticket/Admin.create.ticket";
import AdminSingleticket from "./admin/pages/admin.single.ticket/Admin.single.ticket";
import AdminCreateUser from "./admin/pages/admin.create.user/Admin.create.user";
import AdminCreateProperty from "./admin/pages/admin.create.new.property/Admin.create.new.property";
import AdminSingleProperty from "./admin/pages/admin.single.property/Admin.single.property";
import AdminPropertyApplication from "./admin/pages/admin.property.applications/Admin.property.applications";
import AdminStudentApplication from "./admin/pages/admin.student.applications/Admin.student.applications";
import AdminAgentApplication from "./admin/pages/admin.agent.application/Admin.agent.application";
import AdminAgencyApplication from "./admin/pages/admin.agency.applications/Admin.agency.applications";
import SinglePropertyApplications from "./admin/pages/admin.single.property.applications/Admin.single.property.applications";
import SingleAgencyApplications from "./admin/pages/admin.single.agency.applications/Admin.single.agency.application";
import SingleAgentApplications from "./admin/pages/admin.single.agent.application/Admin.single.agent.applications";
import SingleStudentApplications from "./admin/pages/admin.single.student.applications/Admin.single.student.application";
import Login from "./user/pages/login/Login";
import StudentListingComplete from "./user/pages/student.listing.complete/Student.listing.complete";
import BecomeAnAgentSuccess from "./user/pages/become.an.agent.success/Become.an.agent.success";
import Inbox from "./user/pages/inbox/Inbox";
import Ticket from "./user/pages/Ticket/Ticket";
import AdminEditProperty from "./admin/pages/admin.edit.property/Admin.edit.property";
import Terms from "./user/pages/terms/Terms";
import Contact from "./user/pages/contact/Contact";
import Account from "./user/pages/account/account";
import Loading from "./common-pages/loading/Loading";
import ErrorBoundary from "./common-pages/error-boundary/ErrorBoundary";

const allowedRoles = ["Admin", "SuperAdmin"];

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<PersistLogin />}>
                {/* Admin route */}
                <Route element={<RequireAuth allowedRoles={allowedRoles} />}>
                  <Route element={<Admin />}>
                    <Route path="/admin/users" element={<DashboardUser />} />
                    <Route
                      path="/admin/properties"
                      element={<DashboardProperties />}
                    />
                    <Route
                      path="/admin/dashboard"
                      element={<AdminDashboard />}
                    />
                    <Route
                      path="/admin/utility/schedule"
                      element={<UtilitySchedule />}
                    />
                    <Route path="/admin/message" element={<AdminMessage />} />
                    <Route
                      path="/admin/notice-board"
                      element={<AdminNotice />}
                    />
                    <Route
                      path="/admin/notice/:noticeId"
                      element={<AdminSingleNotice />}
                    />
                    <Route
                      path="/admin/transaction"
                      element={<AdminTransaction />}
                    />
                    <Route path="/admin/user" element={<AdminSingleUser />} />
                    <Route
                      path="/admin/edit-user"
                      element={<AdminEdituser />}
                    />
                    <Route
                      path="/admin/edit-property"
                      element={<AdminEditProperty />}
                    />

                    <Route path="/admin/setting" element={<AdminSettings />} />
                    <Route path="/admin/tickets" element={<AdminTicket />} />
                    <Route
                      path="/admin/create-ticket"
                      element={<AdminCreateTicket />}
                    />
                    <Route
                      path="/admin/ticket/:ticketId"
                      element={<AdminSingleticket />}
                    />
                    <Route
                      path="/admin/create-user"
                      element={<AdminCreateUser />}
                    />
                    <Route
                      path="/admin/create-property"
                      element={<AdminCreateProperty />}
                    />
                    <Route
                      path="/admin/property"
                      element={<AdminSingleProperty />}
                    />
                    <Route
                      path="/admin/property-applications"
                      element={<AdminPropertyApplication />}
                    />
                    <Route
                      path="/admin/student-applications"
                      element={<AdminStudentApplication />}
                    />
                    <Route
                      path="/admin/agent-applications"
                      element={<AdminAgentApplication />}
                    />
                    <Route
                      path="/admin/agency-applications"
                      element={<AdminAgencyApplication />}
                    />
                    <Route
                      path="/admin/property-application/:applicationId"
                      element={<SinglePropertyApplications />}
                    />
                    <Route
                      path="/admin/student-application/:applicationId"
                      element={<SingleStudentApplications />}
                    />
                    <Route
                      path="/admin/agent-application/:applicationId"
                      element={<SingleAgentApplications />}
                    />
                    <Route
                      path="/admin/agency-application/:applicationId"
                      element={<SingleAgencyApplications />}
                    />
                  </Route>
                </Route>
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
