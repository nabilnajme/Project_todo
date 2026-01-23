import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import { useState } from "react";

export default function EditTodo() {
  const location = useLocation();
  const userName = location.state.userName;

  const { id } = useParams();
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const todo = todos.find((elem) => elem.id == id);
  const [text, setText] = useState(todo.text);

  function save() {
    dispatch({ type: "edit", payload: { id: todo.id, text: text } });
    navigate("/home", { state: { userName } });
  }

  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit Task</h2>
      <input
        className="edit-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Update your task..."
      />
      <div className="edit-actions">
        <button className="btn save-btn" onClick={save}>
          Save
        </button>
        <button
          className="btn cancel-btn"
          onClick={() => navigate("/home", { state: { userName } })}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
