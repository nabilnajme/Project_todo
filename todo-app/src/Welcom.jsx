import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";

export default function Welcom() {
  const [name, setName] = useState("");
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
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="welcome-input"
        />
        <button type="submit" className="btn welcome-btn">
          Enter
        </button>
      </form>
    </div>
  );
}
