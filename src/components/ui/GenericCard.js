const GenericCard = ({ title, description, buttonText, buttonAction, amount }) => {
  return (
    <div className="w-full sm:w-5/12 lg:w-4/12 bg-white shadow-md rounded-2xl border border-gray-100 p-3" style={{height:"200px"}}>
      {/* Header */}
      <div className="flex justify-between items-center  mb-4">
        <h2 className="text-xs sm:text-sm font-semibold text-[#003399]">
          {title}
        </h2>
         <div className="bg-[#ED6E0A]/10 text-[#ED6E0A] font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-base sm:text-lg md:text-xl">
          ₦{amount?.toLocaleString()}
        </div>
      </div>

      {/* Instructions */}
        <div className="mt-4 text-gray-600 text-xs">
            <p className="mb-3">{description}</p>
        </div>

      {/* Fund Wallet Button */}

      
      <button
        onClick={buttonAction}
        className="w-full bg-[#003399] hover:bg-[#002080] text-white text-xs sm:text-sm font-medium py-2 rounded-lg transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default GenericCard;
