import './Toggle.css';

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle__container">
      <input type="checkbox" id="check" className="toggle" onChange={handleChange} checked={isChecked} />
      <label htmlFor="check" className="toggle__label">
        <span className="toggle__label__text">Dark mode</span>
      </label>
    </div>
  );
};
