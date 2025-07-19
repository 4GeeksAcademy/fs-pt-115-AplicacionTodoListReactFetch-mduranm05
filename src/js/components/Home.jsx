

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import React, { useState, useEffect } from "react";

export const TodoList = () => {
  const [input, setInput] = useState("");
  const [tareas, setTareas] = useState([]);

  const USERNAME = "michael"; 

  const getTareas = async () => {
    const response = await fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`);
    if (!response.ok) {
      await crearUsuario();
      return;
    }
    const data = await response.json();
    setTareas(data.todos || []);
  };

  const crearUsuario = async () => {
    await fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`, {
      method: "POST",
    });
  };

  const crearTarea = async (texto) => {
    const nuevaTarea = { label: texto, done: false };

    await fetch(`https://playground.4geeks.com/todo/todos/${USERNAME}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaTarea),
    });

    getTareas();
  };

  const eliminarTarea = async (id) => {
    await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    });

    getTareas();
  };

  const eliminarTodas = async () => {
    await fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`, {
      method: "DELETE",
    });

    setTareas([]);
    crearUsuario();
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">📝 Lista de Tareas</h2>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Escribe una nueva tarea y presiona Enter"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter" && input.trim() !== "") {
                  crearTarea(input.trim());
                  setInput("");
                }
              }}
            />
          </div>

          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item text-center text-muted">
                No hay tareas pendientes
              </li>
            ) : (
              tareas.map((tarea) => (
                <li
                  key={tarea.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {tarea.label}
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => eliminarTarea(tarea.id)}
                  >
                    ❌
                  </button>
                </li>
              ))
            )}
          </ul>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-muted">
              Total: {tareas.length} tarea{tareas.length !== 1 && "s"}
            </span>
            <button className="btn btn-warning btn-sm" onClick={eliminarTodas}>
              Limpiar Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;