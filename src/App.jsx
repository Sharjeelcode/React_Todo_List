import { useEffect, useState } from "react"
import todoLogo from './assets/icon.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, database, storage } from "./Firebase/Firebaseconfig";
import { addDoc, collection, getDocs  } from "firebase/firestore";
function App() {
  const navigate = useNavigate()
  const [activeUserName, setActiveUserName] = useState("")
  const [userImg, setUserImg] = useState("")
  const [email , setemail] = useState()
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user && user.uid === auth.currentUser.uid) {
        setActiveUserName(auth.currentUser.displayName.toLocaleUpperCase())
        setUserImg(auth.currentUser.photoURL)
        setemail(auth.currentUser.email)
      } else {
        navigate('/signin');
      }
    });
  }, []);


  const [input, setinput] = useState("")
  const [todo, settodo] = useState([])
  const [empty, setempty] = useState("hidden")
  const [icon, seticon] = useState("➕")
  const [index, setindex] = useState()
  useEffect(() => {
    let storedTodo = localStorage.getItem('todos')
    if (storedTodo) {
      settodo(JSON.parse(storedTodo))
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(todo));
    }, 100)
  }, [todo]);

  const handleAddTodo = async() => {
    if (input == "") {
      setempty("block text-red-500")
    } else if (icon === "➕") {
      setempty("hidden")
      settodo(prevTodo => [...prevTodo, input]);
      setinput("");
      updateLocalStorage();
    } if (icon === "✅") {
      const newTodo = [...todo]
      newTodo.splice(index, 1, input)
      settodo(newTodo)
      seticon("➕")
      setinput("")
      updateLocalStorage()
    }

    try {
      const docRef = await addDoc(collection(database, email),{
        todovalue : input
      })
      console.log("doc  id", docRef.id);
    }
     catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (index) => {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    settodo(newTodo);
    updateLocalStorage()
  };

  const handleUpdate = (index) => {
    if (icon === "➕") {
      setempty("hidden")
      seticon("✅")
      setinput(todo[index])
      setindex(index)
    } else {
      const updateTodo = [...todo];
      updateTodo[index] = input
      settodo(updateTodo)
      setempty("hidden")
      setinput("")
      seticon("➕")
      setindex(null);
      updateLocalStorage()
    }
  }
  const updateLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todo))
  }

  const querySnapshot = async()=>{
  const querySnapshot =   await getDocs(collection(database, email));
    // querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    // });
  console.log(querySnapshot);
  }

  querySnapshot()



  return (
    <>
      <div className="flex items-center justify-end mx-4 my-2 ">
        <h1 className="px-2">{activeUserName}</h1>
        <img src={userImg} className="w-12 rounded-full" />
      </div>
      <div
        className="flex justify-center  items-center mt-10 "
      >
        <div
          id="todo_div"
          className="min-h-32 md:min-w-96 rounded flex flex-col px-4 mb-4 py-2"
        >
          <div
            className="flex items-center justify-center"
          >
            <span
              className=" font-bold text-2xl pr-2"
            >
              To-Do's
            </span>
            <img
              src={todoLogo}
              className="w-16"
            />
          </div>
          <div
            className="flex bg-white rounded shadow-lg"
          >
            <input
              type="text"
              className=" py-1 w-full border-none outline-none pl-2 rounded"
              value={input}
              onChange={(e) => setinput(e.target.value)}
            />
            <button
              className="bg-black rounded px-2 font-extrabold text-lg text-white "
              onClick={handleAddTodo}
            >
              {icon}
            </button>
          </div>
          <p className={empty}>Enter Something to Display</p>
          <div className="flex flex-col mt-2">
            {
              todo.map((list, index) => (
                <>
                  <div
                    key={index}
                    className="flex bg-none shadow-lg mt-1 mb-1 rounded"
                  >
                    <p
                      className=" py-1 px-2 w-full"
                    >
                      {list}
                    </p>
                    <button
                      className=" px-2 font-extrabold text-white "
                      onClick={() => {
                        handleUpdate(index)
                        setindex(index)
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="px-2 font-extrabold text-white "
                      onClick={() => {
                        handleDelete(index)
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
