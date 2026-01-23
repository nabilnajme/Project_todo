import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import "./App.css";

export default function Welcom() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "") return;

    navigate("/home", { state: { userName: name } });
  }

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Enter Your Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="welcome-input"
        />
        <button type="submit" className="btn welcome-btn">
          Enter
        </button>
        <p
          className="welcome-text"
          onClick={() => navigate("/home", { state: { userName: "Guest" } })}
        >
          Enter As Guest
        </p>
      </form>
    </div>
  );
}
