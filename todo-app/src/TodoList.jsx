import { useSelector, useDispatch } from "react-redux";
import { useState , useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function TodoHome() {
  const location = useLocation();
  const userName = location.state?.userName || "Guest";

  const todos = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 useEffect(() => {
    inputRef.current.focus();
  }, []);
  function addTodo() {
    if (text.trim() === "") return;

    dispatch({
      type: "add",
      payload: {
        id: Date.now(),
        text: text,
      },
    });

    setText("");
  }
  const inProgresssearch = todos
    .filter((t) => !t.completed)
    .filter((t) => t.text.toLowerCase().includes(searchTerm.toLowerCase()));

  const inProgress = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);
  const total1 = inProgress.length;
  const total2 = completed.length;

  return (
    <div className="container">
      <div className="account-bar">
        <span className="account-icon">👤</span>
        <button className="btn logout-btn" onClick={() => navigate("/")}>
          Log out
        </button>
      </div>

      <div className="container">
        <h1 className="app-title">Welcome, {userName}💕 </h1>
      </div>
      <h1 className="app-title">Task Manager  🐲</h1>

      {/* ADD */}
      <section className="top-sec">
        <div className="add-box">
          <input
          ref={inputRef}
            type="text"
            placeholder="What do you need to do?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn add-btn" onClick={addTodo}>
            + Add
          </button>
        </div>

        {/* SEARCH */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <div className="Listcontainer">
        {/* IN PROGRESS */}
        <section className="section">
          <h2 className="section-title">In Progress</h2>
          <hr />
          {total1 === 0 && <p className="empty">No tasks in progress</p>}
          {inProgress.map((t) => (
            <div key={t.id} className={`task-card `}>
              <p className="task-text">{t.text}</p>

              <div className="task-actions">
                <button
                  className="btn done-btn"
                  onClick={() =>
                    dispatch({ type: "toggle", payload: { id: t.id } })
                  }
                >
                  Done
                </button>

                <Link to={`/edit/${t.id}`} className="btn edit-btn">
                  Edit
                </Link>

                <button
                  className="btn delete-btn"
                  onClick={() =>
                    dispatch({ type: "delete", payload: { id: t.id } })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <p className="empty">{total1} tasks in progress</p>
        </section>

        {/* COMPLETED */}
        <section className="section">
          <h2 className="section-title">Completed</h2>
          <hr />

          {completed.length === 0 && (
            <p className="empty">No completed tasks</p>
          )}

          {completed.map((t) => (
            <div key={t.id} className="task-card completed">
              <p className="task-text">{t.text}</p>

              <div className="task-actions">
                <button
                  className="btn undo-btn"
                  onClick={() =>
                    dispatch({ type: "toggle", payload: { id: t.id } })
                  }
                >
                  Undo
                </button>

                <button
                  className="btn delete-btn"
                  onClick={() =>
                    dispatch({ type: "delete", payload: { id: t.id } })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <p className="empty">{total2} tasks completed</p>
        </section>
      </div>

      {/* SEARCH RESULTS */}
      {searchTerm.trim() !== "" && (
        <div className="search-results">
          <h2 className="section-title">Search Results</h2>
          <hr />
          {inProgresssearch.length === 0 && (
            <p className="empty">No matching tasks</p>
          )}
          {inProgresssearch.map((t) => (
            <div key={t.id} className="task-card">
              <p className="task-text">{t.text}</p>
              <div className="task-actions">
                <button
                  className="btn done-btn"
                  onClick={() =>
                    dispatch({ type: "toggle", payload: { id: t.id } })
                  }
                >
                  Done
                </button>
                <Link to={`/edit/${t.id}`} className="btn edit-btn">
                  Edit
                </Link>
                <button
                  className="btn delete-btn"
                  onClick={() =>
                    dispatch({ type: "delete", payload: { id: t.id } })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
