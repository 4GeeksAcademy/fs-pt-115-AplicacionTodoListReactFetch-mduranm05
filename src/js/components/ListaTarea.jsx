import { renderToNodeStream } from "react-dom/server"

export const ListaTarea = () => {
    return (
        <ul className="list-group">
            {tareas.length === 0 ? (
                <li className="list-group-item text-center">
                    no hay tareas por hacer
                </li>
            ) : (
                tareas.map((tarea, index) => (
                    <li key={index}
                    className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            {tarea.label}
                        </span>
                        <button className="btn btn-danger">X</button>
                    </li>
                ))
            )}
        </ul>
    )
}