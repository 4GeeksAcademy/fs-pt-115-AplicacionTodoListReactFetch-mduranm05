import { useState } from "react";
import { ListaTarea } from "./ListaTarea";

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





  return (

  )
}