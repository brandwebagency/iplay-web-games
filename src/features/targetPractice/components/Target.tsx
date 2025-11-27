import React from "react";

type Props = {
  x: number;
  y: number;
  size?: number;
  onClick: (e: React.MouseEvent) => void;
};

const Target: React.FC<Props> = ({ x, y, size = 50, onClick }) => {
  const style: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: size,
    height: size,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "crosshair",
    userSelect: "none",
    WebkitUserSelect: "none",
    WebkitUserDrag: "none",
    // lightweight visual
    background:
      "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(255,255,255,0)), linear-gradient(45deg, #ff4d4f 0%, #ff7a45 100%)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
  };

  const handleDragStart = (e: React.DragEvent) => e.preventDefault();
  const handleMouseDown = (e: React.MouseEvent) => e.preventDefault(); // prevent selection

  return (
    <div
      role="button"
      aria-label="target"
      draggable={false}
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
      onClick={onClick}
      style={style}
    />
  );
};

export default Target;
