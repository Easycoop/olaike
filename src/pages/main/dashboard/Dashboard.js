import "./dashboard.css";
import { FaArrowTrendUp, FaCircle } from "react-icons/fa6";
import chart2 from "../../../assets/images/main/chart2.png";
import chart3 from "../../../assets/images/main/chart3.png";
import chart from "../../../assets/images/main/chart.png";

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
            <h3>N20,000</h3>
            <div>
              24.44% <FaArrowTrendUp />
            </div>
          </span>
          <span className="dashboard__section__one__block">
            <h5>Home Savings Wallet</h5>
            <h3>N35,560</h3>
            <div>
              24.44% <FaArrowTrendUp />
            </div>
          </span>
          <span className="dashboard__section__one__block">
            <h5>Holiday Wallet</h5>
            <h3>N10,200</h3>
            <div>
              24.44% <FaArrowTrendUp />
            </div>
          </span>
        </div>
      </section>
      <section className="dashboard__section__two">
        <h5>Money highlights</h5>
        <div className="dashboard__section__two__wrap">
          <div className="dashboard__section__two__wrap__start">
            <div className="dashboard__section__two__wrap__start__block">
              <img src={chart2} alt="" />
            </div>
            <div className="dashboard__section__two__wrap__start__block">
              <img src={chart3} alt="" />
            </div>
          </div>
          <div className="dashboard__section__two__wrap__end">
            <img src={chart} alt="" />
          </div>
        </div>
      </section>
      <section className="dashboard__section__one">
        <h5>Recent Transactions</h5>
        <div className="dashboard__section__two">
          <div className="dashboard-section-two-table-row-wrap">
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
              <div className="dashboard-section-two-table-cell">...</div>
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
              <div className="dashboard-section-two-table-cell">...</div>
            </div>
            <div className="dashboard-section-two-table-row">
              <div className="dashboard-section-two-table-cell">
                Paypal Topup
              </div>
              <div className="dashboard-section-two-table-cell">Topup</div>
              <div className="dashboard-section-two-table-cell">Paypal inc</div>
              <div className="dashboard-section-two-table-cell">
                <FaCircle style={{ color: "#6345D5" }} />
                Expenses
              </div>
              <div className="dashboard-section-two-table-cell">N5000</div>
              <div className="dashboard-section-two-table-cell">...</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
