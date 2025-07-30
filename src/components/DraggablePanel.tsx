import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../hook/reduxHook";
import { login } from "../redux/thunk/login";

const DraggablePanel = () => {
  const dispatch = useAppDispatch();
  const panelRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const panel = panelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  return (
    <div
      ref={panelRef}
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: "240px",
        padding: "12px",
        background: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        zIndex: 1000,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        userSelect: "none",
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          marginBottom: "12px",
          cursor: "move",
        }}
      >
        <span>Drag Panel</span>
        <span
          onClick={() => setDropdown(!dropdown)}
          style={{ cursor: "pointer", fontSize: "18px" }}
        >
          {dropdown ? "▼" : "▲"}
        </span>
      </div>

      {dropdown && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* <button
            type="button"
            onClick={() => setAuthorized(!authorized)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              backgroundColor: "#007acc",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Toggle Authentication
          </button> */}
          <button
            type="button"
            onClick={() =>
              dispatch(login({ email: "a2@gmail.com", password: "@123" }))
            }
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              backgroundColor: "#28a745",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Admin Login
          </button>
          <button
            type="button"
            onClick={() => localStorage.removeItem("user-auth")}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              backgroundColor: "#dc3545",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default DraggablePanel;
