import { Button } from "antd";

export function SaveButton({ title = "Save", onClick }) {
  const size = "large";
  const SaveButtonStyle = {
    minWidth: "80px",
    fontWeight: "bold",
    backgroundColor: "#2D3748",
  };
  return (
    <Button
      className="btn-lg"
      type="primary"
      style={SaveButtonStyle}
      size={size}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
