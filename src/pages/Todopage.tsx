import { useState, useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL

type Todo = {
  id: number,
  text: string,
  completed: boolean
}

function Todopage() {
  const token = localStorage.getItem("token");

  const [mainInput, setMainInput] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [itemInput, setItemInput] = useState("")
  const [username, setUsername] = useState("");

  async function getUserProfile(){
    const response = await fetch(`${API_URL}/me`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (data.success){
      setUsername(data.username)
    }

  }

  getUserProfile()


  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList))

  }, [todoList])

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`${API_URL}/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })

      const result = await response.json()

      if (result.success) {
        setTodoList(result.data)
      }
    }
    fetchTodos()
  }, [])


  async function createTodo(text: string) {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        text
      })
    })

    const data = await response.json()

    if (data.success) {
      console.log("row from backend: ", data.data)
      setTodoList(prev => [...prev, data.data])
    }


  }

  async function updateTodo(todoItem: Todo) {

    console.log("in update todo")

    const response = await fetch(`${API_URL}/todos/${todoItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        todoItem: todoItem,
      })
    })

    const data = await response.json()

    console.log("data from backend: ", data)

    if (data.success) {
      console.log("updated successfully")
    }

  }

  async function deleteTodo(id: number){
    console.log("in delete todo")
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (data.success){
      console.log("deleted todo successfully")
    }

  }

  return (

    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "5px" }}>
      <div>
        <h1>Logged in as {username}</h1>
      </div>
      <div>
        <input
          value={mainInput}
          onChange={(e) => {
            setMainInput(e.target.value)
          }}
          placeholder="Enter todo item"
        />
        <button
          onClick={() => {
            if (mainInput === "") {
              return
            }
            createTodo(mainInput)
            setMainInput("")
          }}
        >
          Add item
        </button>
      </div>

      {
        todoList.map((item, index) => (
          <div
            key={item.id}
            style={{ display: "flex", gap: "8px", width: "300px" }}
          >

            {
              editingIndex === index ? (
                <input
                  value={itemInput}
                  onChange={(e) => {
                    setItemInput(e.target.value)
                  }}
                  onKeyDown={(e) => {

                    if (e.key === "Enter") {
                      const updatedTodo = { ...item, text: itemInput }
                      updateTodo(updatedTodo)
                      setTodoList(prev => prev.map((todo, i) => {
                        if (index === i) {
                          return { ...todo, text: itemInput }
                        }
                        return todo
                      }))

                      setEditingIndex(null)
                    }

                  }}
                />
              ) : (
                <span style={{ flexGrow: 1, textDecoration: item.completed ? "line-through" : "none" }}>
                  {item.text}
                </span>
              )
            }

            <button
              onClick={() => {
                setEditingIndex(index)
                setItemInput(item.text)
              }}
            >
              edit
            </button>
            <button
              onClick={() => {

                deleteTodo(item.id)
                setTodoList(prev => prev.filter((_, i) =>
                  index !== i

                ))
              }

              }
            >
              delete
            </button>
            <button
              onClick={() => {
                const updatedTodo = { ...item, completed: !item.completed }
                updateTodo(updatedTodo)

                setTodoList(prev => prev.map((itm, i) => {
                  if (index === i) {
                    return { ...itm, completed: !itm.completed }
                  }
                  return itm
                }

                ))


              }

              }
            >
              completed
            </button>
          </div>

        ))

      }

    </div>

  )

}

export default Todopage;