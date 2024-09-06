import "./referrals.css";
import { FaLink } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { RiArrowRightSLine } from "react-icons/ri";

function Referrals() {
  return (
    <div className="referrals">
      <h5>Share your your referrals codes to your friends</h5>
      <span className="referrals__input__link__wrap">
        <input
          type="text"
          className="referrals__input__code"
          placeholder="https://.referralscodebynabungin.com/ujexnpyc"
        />
        <button>
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
      <div className="referrals__options">
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
      <div className="referrals__options">
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
      <div className="referrals__options">
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
    </div>
  );
}

export default Referrals;
