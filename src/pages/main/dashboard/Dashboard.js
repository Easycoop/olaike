import "./dashboard.css";
import { FaArrowTrendUp } from "react-icons/fa6";

function Dashboard() {
  return (
    <div className="dashboard">
      <sectin className="dashboard__section__one">
        <h5>My wallets</h5>
        <div className="dashboard__section__one__block__wrap">
          <span className="dashboard__section__one__block">
            <h5>Main Wallet</h5>
            <h3>N50,000</h3>
            <div>
              24.44% <FaArrowTrendUp />
            </div>
          </span>
          <span className="dashboard__section__one__block">
            <h5>Savings Wallet</h5>
            <h3>N50,000</h3>
            <div>
              24.44% <FaArrowTrendUp />
            </div>
          </span>
          <span className="dashboard__section__one__block">
            <h5>Home Savings Wallet</h5>
            <h3>N50,000</h3>
            <div>
              24.44% <FaArrowTrendUp />
            </div>
          </span>
          <span className="dashboard__section__one__block">
            <h5>Holiday Wallet</h5>
            <h3>N50,000</h3>
            <div>
              24.44% <FaArrowTrendUp />
            </div>
          </span>
        </div>
      </sectin>
    </div>
  );
}

export default Dashboard;
