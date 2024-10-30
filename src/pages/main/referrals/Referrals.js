import { BsPatchMinusFill } from "react-icons/bs";
import "./referrals.css";
import { FaLink } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { MdAccountTree, MdInsertLink } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useState } from "react";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { useSendReferralEmail } from "../../../redux/actions/miscAction";
import { ClipLoader } from "react-spinners";

function Referrals() {
  const sendReferralEmail = useSendReferralEmail();
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const referralString = user.referralCode;

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/signup/rc/${referralString}`
      );
      toastManager.addToast({
        message: "Referral link copied to clipboard",
        type: "success",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralString);
      toastManager.addToast({
        message: "Referral code copied to clipboard",
        type: "success",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleSendEmail = async () => {
    if (!email) {
      toastManager.addToast({
        message: "Please enter an email address",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await sendReferralEmail({
        email: email,
        id: user.id,
      });

      if (
        response?.payload.status === 200 ||
        response?.payload.status === "success"
      ) {
        setErrorMessage("");
        toastManager.addToast({
          message: "Referral email sent successfully",
          type: "success",
        });
        setEmail("");
        return;
      } else {
        toastManager.addToast({
          message: "Error sending mail",
          type: "error",
        });
        setErrorMessage(response.message);
      }
    } catch (error) {
      toastManager.addToast({
        message: "Error sending mail",
        type: "error",
      });
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="referrals">
      <h5>Share your your referral link to your friends</h5>
      <span className="referrals__input__link__wrap">
        <input
          type="text"
          className="referrals__input__code"
          placeholder={`http://localhost:3000/signup/rc:${referralString}`}
          disabled={true}
        />
        <button onClick={copyLinkToClipboard}>
          <FaLink />
          Copy link
        </button>
      </span>
      {/* <div className="referrals__users">
        <div>
          <span>
            <IoPeopleSharp />
          </span>
          <div>
            <h6>Referred Users</h6>
            <p>See all the users you have referred</p>
          </div>
        </div>

        <RiArrowRightSLine />
      </div> */}
      <div className="referrals__options" onClick={copyCodeToClipboard}>
        <div>
          <span>
            <MdInsertLink color="#000000" />
          </span>
          <div>
            <h6>Referral Code</h6>
            <p>Your referral code: {referralString}</p>
          </div>
        </div>
        {/* <RiArrowRightSLine /> */}
      </div>
      <span className="referrals__input__email__wrap">
        <input
          type="text"
          className="referrals__input__email__code"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSendEmail} disabled={loading}>
          {loading ? (
            <ClipLoader color="#fff" size={20} />
          ) : (
            "Send referral email"
          )}
        </button>
      </span>
      {/* <div className="referrals__options">
        <div>
          <span>
            <BsPatchMinusFill color="#000000" />
          </span>
          <div>
            <h6>New Users Promo</h6>
            <p>The latest promo for the new user you got</p>
          </div>
        </div>
        <RiArrowRightSLine />
      </div>
      <div className="referrals__options">
        <div>
          <span>
            <FaCrown color="#000000" />
          </span>
          <div>
            <h6>Leaderboard</h6>
            <p>Ratings from your referrals and friends</p>
          </div>
        </div>
        <RiArrowRightSLine />
      </div> */}
      {/* <div className="referrals__options">
        <div>
          <span>
            <MdAccountTree color="#000000" />
          </span>
          <div>
            <h6>Referrals Statistics</h6>
            <p>Detailed satustics of yur referrals</p>
          </div>
        </div>
        <RiArrowRightSLine />
      </div> */}
    </div>
  );
}

export default Referrals;
