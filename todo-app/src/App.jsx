import React from "react";
import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import TodoList from "./TodoList";
import EditTodo from "./EditTodo";
import Welcom from "./Welcom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="nav">
          <Link to="/"></Link>
          <Link to="/home"></Link>
        </nav>

        <Routes>
          <Route path="/" element={<Welcom />} />
          <Route path="/home" element={<TodoList />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
