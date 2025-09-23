import { Link } from "react-router-dom";
import { copyToClipBoard } from "../../utils/generic";
import { FaCopy } from "react-icons/fa6";

const WalletCard = ({ WalletTitle,  balance, actionLink, actionTitle, description }) => {
  return (
    <div className=" bg-white shadow-md rounded-2xl border border-gray-100 p-2" style={{height:"150px"}}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 gap-1">
        <h2 className="text-xs sm:text-sm font-semibold text-[#003399]">
          {WalletTitle}
        </h2>
        <div className="bg-[#ED6E0A]/10 text-[#ED6E0A] font-bold px-1 sm:px-1 py-1 sm:py-1 rounded-lg text-base sm:text-lg">
          ₦{balance?.toLocaleString()}
        </div>
      </div>

      

      {/* Instructions */}
      <div className="mt-4 text-gray-600 text-xs">
        <p className="mb-3">{description}.</p>
        <Link to={actionLink} className="text-[#003399]" style={{textDecoration:"underline"}}>{actionTitle}</Link>
      </div>

      
    </div>
  );
};

export default WalletCard;
