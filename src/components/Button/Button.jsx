function Button({ children, onClick, disabled = false, type = "button", className = "" }) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
