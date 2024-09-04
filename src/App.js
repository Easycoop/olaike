import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";
import ScrollToTop from "./utils/ScrollToTop";
import { ADMIN_ROLES } from "./config/adminRoles";
import PublicRoute from "./route/publicRoute";
import PrivateRoute from "./route/privateRoute";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";

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
          </Route>

          {/* PRIVATE ROUTES */}
          <Route element={<PrivateRoute allowedRoles={ADMIN_ROLES} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
