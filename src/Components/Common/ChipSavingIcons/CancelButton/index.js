export function CancelButton({ onClick }) {
  const size = "large";
  const CancelButtonStyle = {
    textDecoration: "underline",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "80px",
    height: "40px",
    color: "red",
  };
  return (
    <div>
      <button
        className="btn-lg"
        style={CancelButtonStyle}
        size={size}
        onClick={onClick}
      >
        Cancel
      </button>
    </div>
  );
}
