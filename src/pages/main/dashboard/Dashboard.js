import "./dashboard.css";
import { FaArrowTrendUp, FaCircle } from "react-icons/fa6";

function Dashboard() {
  return (
    <div className="dashboard">
      <section className="dashboard__section__one">
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
      </section>
      <section className="dashboard__section__one">
        <h5>Recent Transactions</h5>
        <div className="dashboard__section__two">
          <div className="dashboard-section-two-table-row">
            <div className="dashboard-section-two-table-cell">
              Monthly Salary
            </div>
            <div className="dashboard-section-two-table-cell">Salary</div>
            <div className="dashboard-section-two-table-cell">
              Emmanuel Johnson
            </div>
            <div className="dashboard-section-two-table-cell">
              <FaCircle style={{ color: "#32C398" }} />
              Income
            </div>
            <div className="dashboard-section-two-table-cell">N5,000</div>
            <div
              className="dashboard-section-two-table-cell"
              style={{ flex: 0.25 }}
            >
              ...
            </div>
          </div>
          <div className="dashboard-section-two-table-row">
            <div className="dashboard-section-two-table-cell">
              Design Project
            </div>
            <div className="dashboard-section-two-table-cell">Project</div>
            <div className="dashboard-section-two-table-cell">
              Linda Howsten
            </div>
            <div className="dashboard-section-two-table-cell">
              <FaCircle style={{ color: "#32C398" }} />
              Income
            </div>
            <div className="dashboard-section-two-table-cell">N5,000</div>
            <div
              className="dashboard-section-two-table-cell"
              style={{ flex: 0.25 }}
            >
              ...
            </div>
          </div>
          <div className="dashboard-section-two-table-row">
            <div className="dashboard-section-two-table-cell">
              Monthly Salary
            </div>
            <div className="dashboard-section-two-table-cell">Salary</div>
            <div className="dashboard-section-two-table-cell">
              Emmanuel Johnson
            </div>
            <div className="dashboard-section-two-table-cell">
              <FaCircle style={{ color: "#32C398" }} />
              Income
            </div>
            <div className="dashboard-section-two-table-cell">N5000</div>
            <div
              className="dashboard-section-two-table-cell"
              style={{ flex: 0.25 }}
            >
              ...
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
