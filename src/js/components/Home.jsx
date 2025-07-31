import { useEffect, useState } from "react";
import { ListaTarea } from "./ListaTarea"

export const Home = () => {

  const [tareas, setTareas] = useState([])
  const [inputValue, setInputValue] = useState("")

  const crearUsuario = async() => {
    const respuesta = await fetch("https://playground.4geeks.com/todo/users/michael",{
      method: "POST"
    })
  
  }

  const getTareas = async() => {
    const respuesta = await fetch("https://playground.4geeks.com/todo/users/michael")

    if(!respuesta.ok) {
      crearUsuario()
    }
    const data = await respuesta.json()
    setTareas(data.todos)
  }

  const crearTarea = async() => {
    const respuesta = await fetch("https://playground.4geeks.com/todo/todos/michael", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "label": inputValue,
        "is_done": false
      })
    })
    const data = await respuesta.json()
    console.log(data);
    getTareas()
    setInputValue("")
  }

  const eliminarTarea = async(id) => {
    const respuesta = await fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
      method: "DELETE"
    })
    getTareas()
  }

  const handleKeyUp = (e) =>{
    if (e.key === "Enter" && inputValue.trim() !=="") {
      crearTarea()
    }
  }  


  useEffect(()=>{
    getTareas()
  },[])





  return (
    <div className="container text-center mt-5">

    
      <input 
        type="text" 
        placeholder="escribir tarea"
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <ListaTarea tareas={tareas} eliminarTarea={eliminarTarea}/>
    </div> 
  )
}