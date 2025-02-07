import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ token }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`${apiKey}/tasks`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, [token]);

  const addTask = async () => {
    if (text.trim() === "") return;

    const res = await fetch(`${apiKey}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ text }),
    });

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setText("");
  };

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="font-semibold py-5">Tasks</h3>
      </div>
      <div className="flex justify-center space-x-5">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New Task"
          className="bg-gray-200 pl-2"
        />
        <button onClick={addTask} className="bg-amber-300 p-2 rounded">
          Add Task
        </button>
      </div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          setTasks={setTasks}
          token={token}
        />
      ))}
    </div>
  );
};

export default TaskList;
