import { useEffect, useState } from "react";
import io from "socket.io-client";
const App = () => {
  const [socket, setSocket] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const newSocet = io(process.env.PORT || "http://localhost:8000/");
    setSocket(newSocet);
  }, []);

  const removeTask = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };
  return (
    <div className="App">
      <header>
        <h1>ToDoList.app</h1>
      </header>

      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>

        <ul className="tasks-section__list" id="tasks-list">
          {tasks.map((task) => (
            <li key={task.id} className="task">
              {task.name}{" "}
              <button
                className="btn btn--red"
                onClick={() => removeTask(task.id)}
              >
                Remove
              </button>
            </li>
          ))}
          {/* <li className="task">
            Shopping <button className="btn btn--red">Remove</button>
          </li>
          <li className="task">
            Go out with a dog <button className="btn btn--red">Remove</button>
          </li> */}
        </ul>

        <form id="add-task-form">
          <input
            className="text-input"
            autocomplete="off"
            type="text"
            placeholder="Type your description"
            id="task-name"
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </section>
    </div>
  );
};
export default App;
