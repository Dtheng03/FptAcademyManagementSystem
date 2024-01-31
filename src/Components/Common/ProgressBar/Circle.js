import React from "react";

export const Circle = ({ className, children, label, progressColor  }) => {
  return (
    <div className={className} style={{ borderColor: progressColor, backgroundColor: progressColor }}>
      <div className="label">{label}</div>
      {children}
    </div>
  );
};
