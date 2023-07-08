import { useEffect, useState } from "react";
import shortid from "shortid";
import io from "socket.io-client";
const App = () => {
  const [socket, setSocket] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    const newSocket = io(process.env.PORT || "http://localhost:8000/");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("addTask", (taskData) => {
        addTask(taskData);
      });
      socket.on("removeTask", (taskId) => {
        removeTask(taskId);
      });
      socket.on("updateData", (tasksData) => {
        updateData(tasksData);
      });
    }
  }, [socket]);

  const updateData = (tasks) => {
    setTasks(tasks);
  };

  const removeTask = (id, isLocal) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
    if (isLocal) {
      socket.emit("removeTask", id);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const taskData = { name: taskName, id: shortid() };
    addTask(taskData);

    socket.emit("addTask", taskData);
    setTaskName("");
  };

  const addTask = (task) => {
    setTasks((tasks) => [...tasks, task]);
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
              {task.name}
              <button
                className="btn btn--red"
                onClick={() => removeTask(task.id, true)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <form id="add-task-form" onSubmit={(e) => submitForm(e)}>
          <input
            className="text-input"
            autoComplete="off"
            type="text"
            placeholder="Type your description"
            id="task-name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
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
