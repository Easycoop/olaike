import "./fees.css";
import { BiPlus } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { TiExportOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { useGetFees } from "../../../redux/actions/miscAction";
import Loading from "../../../components/splash/loading/Loading";
import NoResult from "../../../components/splash/no-result/NoResult";

function Fees() {
  const navigate = useNavigate();
  const getFees = useGetFees();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fees, setFees] = useState([]);

  const handleGetFees = async () => {
    setLoading(true);
    try {
      const response = await getFees();
      if (response?.payload.status === "success") {
        setErrorMessage("");
        setFees(response.payload.data);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFees();
  }, []);

  return (
    <div className="ad__novel">
      <section className="ad__novel__sc__one">
        <input type="text" placeholder="Search" className="" />
      </section>

      <section className="ad__novel__sc__three">
        <div className="admin-table">
          <div className="admin-table-header">
            <div className="admin-table-cell">FEES/DUES</div>
            <div className="admin-table-cell">DATE</div>
            <div className="admin-table-cell">TYPE</div>
            <div className="admin-table-cell">STATUS</div>
          </div>
          {fees.length == 0 && !loading ? (
            <NoResult
              header="No fees"
              content="You dont have any fee history yet"
            />
          ) : (
            <div className="admin-table-body">
              {fees.map((fees, i) => (
                <div key={i} className="admin-table-row">
                  <div className="admin-table-cell">{`${fees.currency} ${fees.amount}`}</div>
                  <div className="admin-table-cell">{fees.createdAt}</div>
                  <div className="admin-table-cell">{fees.type}</div>
                  <div className="admin-table-cell">
                    <span
                      style={{
                        border: `1px solid ${
                          fees.status == "paid" ? "#0BFD15" : "#dc143c"
                        }`,
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        padding: "10px 15px",
                        width: "max-content",
                      }}
                    >
                      <FaCircle
                        color={fees.status == "paid" ? "#0BFD15" : "#dc143c"}
                      />
                      {fees.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {loading && <Loading />}
        </div>
      </section>
    </div>
  );
}

export default Fees;
