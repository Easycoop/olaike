import { FaArrowLeft } from "react-icons/fa6";
import { TfiClose } from "react-icons/tfi";
import "./modal.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={`modal${isOpen ? "" : " disable"}`}>
      <div className="modal__content">
        <div className="modal__content__span">
          {/* <FaArrowLeft onClick={onClose} className="modal__content__close" /> */}
          <TfiClose onClick={onClose} className="modal__content__close" />
        </div>

        <div className="modal__content__children">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
