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

function Referrals() {
  const { user } = useSelector((state) => state.auth);

  const referralLink = user.referral;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        toastManager({
          message: "Referral link copied to clipboard",
          type: "success",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="referrals">
      <h5>Share your your referrals codes to your friends</h5>
      <span className="referrals__input__link__wrap">
        <input
          type="text"
          className="referrals__input__code"
          placeholder={`http://localhost:3000/?referral-code=${referralLink}`}
          disabled={true}
        />
        <button onClick={copyToClipboard}>
          <FaLink />
          Copy link
        </button>
      </span>
      <div className="referrals__users">
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
      </div>
      <span className="referrals__input__email__wrap">
        <input
          type="text"
          className="referrals__input__email__code"
          placeholder="Enter email address"
        />
        <button>Send Email</button>
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
      <div className="referrals__options">
        <div>
          <span>
            <MdInsertLink color="#000000" />
          </span>
          <div>
            <h6>Referred Code</h6>
            <p>Your referral code</p>
          </div>
        </div>
        <RiArrowRightSLine />
      </div>
    </div>
  );
}

export default Referrals;
