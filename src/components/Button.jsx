const Button = ({ label, onClick }) => {
  return (
    <div>
      <button className="buttonStyle" onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default Button;
