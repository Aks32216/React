import { useState } from "react";

const Toggle = ({ title, children }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={isOpen ? "toggle is-open" : "toggle"}>
      <button className="toggle-head" onClick={() => setOpen(!isOpen)}>
        <span className="toggle-title">{title}</span>
        <span className="toggle-icon">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="toggle-body">{children}</div>}
    </div>
  );
};

export default Toggle;
