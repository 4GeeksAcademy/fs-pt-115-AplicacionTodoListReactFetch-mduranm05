

export const ListaTarea = ({tareas, eliminarTarea}) => {
    return (
        <ul className="list-group">
            {tareas.length === 0 ? (
                <li className="list-group-item text-center">
                    no hay tareas por hacer
                </li>
            ) : (
                tareas.map((tarea) => (
                    <li key={tarea.id}
                    className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            {tarea.label}
                        </span>
                        <button className="btn btn-danger" onClick={()=> eliminarTarea(tarea.id)}>X</button>
                    </li>
                ))
            )}
        </ul>
    )
}