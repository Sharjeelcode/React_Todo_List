import { useState } from "react"

function App() {
  const [input, setinput] = useState("")
  const [todo, settodo] = useState([])
  const [empty, setempty] = useState("hidden")

  // useEffect(() => {

  // }, [todo])


  const handleAddTodo = () => {
    if (input == "") {
      setempty("block text-red-500")
    }
    else {
      setempty("hidden")
      settodo([...todo, input]);
      setinput("");
    }
  };

  const handleDelete = (index ) => {
    const newTodo = [...todo]; 
    newTodo.splice(index, 1); 
    settodo(newTodo);
  };

  const handleUpdate = (index , e)=>{
    const updateTodo = [...todo];
    if (e === "✏️") {
      e = "✅"
      setinput(updateTodo[index])
    }else{
      updateTodo[index] = input
      settodo(updateTodo)
      e = "✏️"
      setinput("")
    }

  }

  return (
    <>
      <div
        className="flex justify-center  items-center mt-10 "
      >
        <div
          id="todo_div"
          className="min-h-32 min-w-96 rounded flex flex-col px-4 mb-4 py-2"
        >
          <h1
            className="text-center mt-4 font-bold text-2xl">
            Todo List
          </h1>
          <div
            className="flex bg-white"
          >
            <input
              type="text"
              className=" py-1 w-full border-none outline-none pl-2 rounded"
              value={input}
              onChange={(e) => setinput(e.target.value)}
            />
            <button
              className="bg-white rounded px-2 font-extrabold text-lg text-white "
              onClick={handleAddTodo}
            >
             ➕
            </button>
          </div>
          <p className={empty}>Enter Something to Display</p>
          <div className="flex flex-col mt-2">
            {
              todo.map((list, index) => (
                <>
                  <div
                    className="flex bg-gray-100 mt-1 mb-1 rounded"
                  >
                    <p
                      key={index}
                      className=" py-1 px-2 w-full "
                    >
                      {list}
                    </p>
                    <button
                      className=" px-2 font-extrabold text-white "
                      onClick={(e)=>{
                        handleUpdate(index, e.target.value)
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="px-2 font-extrabold text-white "
                      onClick={()=>{
                        handleDelete(index )
                      }}
                    >
                      ❌
                    </button>
                  </div>
                </>
              ))
            }

          </div>
        </div>
      </div>

    </>
  )
}

export default App
