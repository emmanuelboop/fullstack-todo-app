import { useState, useEffect } from "react"

type Todo = {
  text: string,
  completed: boolean
}

function App() {
  const [mainInput, setMainInput] = useState("")
  const [todoList, setTodoList] = useState<Todo[]>(()=>{
    const savedTodoList = localStorage.getItem("todoList")
    if (savedTodoList !== null){
      return JSON.parse(savedTodoList)
    }
    return []
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [itemInput, setItemInput] = useState("")

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList))
  }, [todoList])


  return (
    <div style = {{display: "flex", alignItems: "center", flexDirection: "column", }}>

      <div>

        <input
          value={mainInput}
          placeholder="Enter todo item"
          onChange={(e) => {
            setMainInput(e.target.value)
          }}
        />

        <button onClick={() => {
          if (mainInput === ""){
            return
          }
          setTodoList(prev => [...prev, { text: mainInput, completed: false }])
          setMainInput("")
        }}>
          Add item
        </button>

      </div>

      {todoList.map((item, index) => (
        <div 
          key = {index}
          style = {{display: "flex", alignItems: "center", gap: 10, width: "400px" }}
        >
          {editingIndex === index ? (
            <input
              value={itemInput}
              onChange={(e) => {
                setItemInput(e.target.value)
              }}
              onKeyDown = {(e) => {
                if (e.key === "Enter") {
                  setTodoList(prev => prev.map((itm, i) => (
                    index === i ? { text: itemInput, completed: itm.completed } : itm
                  )))

                  setEditingIndex(null)
                  
                }
              }}
            />) : (
            <span style = {{flexGrow: 1, textDecoration: item.completed ? "line-through" : "none"}}>{item.text}</span>
          )
          }
          <button
            onClick={() => {
              setTodoList(prev =>
                prev.filter((_, i) => i !== index)
              )
            }}
          >
            delete
          </button>
          <button
            onClick={() => {
              setEditingIndex(index)
              setItemInput(item.text)
            }}
          >
            edit
          </button>
          <button onClick = {() => {
            setTodoList(prev => prev.map((itm, i) => {
              if (index === i){
                if (item.completed === false){
                  return {text: item.text, completed: true}
                }
                return {text: item.text, completed: false}
              }
              return itm
            }))
          }

          }>
            completed
          </button>
        </div>
      ))}

    </div>
  )
}

export default App;