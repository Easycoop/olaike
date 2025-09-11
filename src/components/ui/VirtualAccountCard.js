import { copyToClipBoard } from "../../utils/generic";
import { FaCopy } from "react-icons/fa6";

const VirtualAccountCard = ({ accountName, accountNumber, bankName, balance, onFundWallet }) => {
  return (
    <div className="w-full sm:w-6/12 md:w-4/12 bg-white shadow-md rounded-2xl border border-gray-100 p-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs sm:text-sm font-semibold text-[#003399]">
          Virtual Account Details
        </h2>
        <div className="bg-[#ED6E0A]/10 text-[#ED6E0A] font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-base sm:text-lg md:text-xl">
          ₦{balance?.toLocaleString()}
        </div>
      </div>

      {/* Account Info */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-xs sm:text-sm text-gray-500">
            Account Name:
          </span>
          <span className="font-medium text-gray-900 text-xs sm:text-sm">
            {accountName}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs sm:text-sm text-gray-500">
            Account Number:
          </span>
          <div className="flex gap-1">
            <span className="font-medium text-gray-900 text-xs sm:text-sm">
              {accountNumber}
            </span>
            <strong
              className="cursor-pointer text-sm sm:text-base md:text-lg"
              onClick={() => copyToClipBoard(accountNumber)}
            >
              <FaCopy />
            </strong>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-xs sm:text-sm text-gray-500">
            Bank:
          </span>
          <span className="font-medium text-gray-900 text-xs sm:text-sm">
            {bankName}
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-gray-600 text-xs">
        <p className="mb-3">⚡ To fund your wallet, transfer funds to the virtual account.</p>
        <p className="mb-3">⚡ Click on the "I just funded my wallet" button below after making the transfer.</p>
      </div>

      {/* Fund Wallet Button */}
      <button
        onClick={onFundWallet}
        className="w-full bg-[#003399] hover:bg-[#002080] text-white text-xs sm:text-sm font-medium py-2 rounded-lg transition-colors"
      >
        I just funded my wallet
      </button>
    </div>
  );
};

export default VirtualAccountCard;
