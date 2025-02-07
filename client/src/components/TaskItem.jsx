const TaskItem = ({ task, setTasks, token }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const toggleComplete = async () => {
    const res = await fetch(`${apiKey}/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ text: task.text, completed: !task.completed }),
    });

    const updatedTask = await res.json();
    console.log(updatedTask);

    setTasks((tasks) =>
      tasks.map((t) => (t._id === task._id ? updatedTask : t))
    );
  };

  const deleteTask = async () => {
    await fetch(`${apiKey}/tasks/${task._id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    setTasks((tasks) => tasks.filter((t) => t._id !== task._id));
  };

  return (
    <div className="mt-5">
      <div className="bg-blue-400 flex items-center justify-between px-5 ">
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.text}
        </span>
        <div className="space-x-5">
          <button
            onClick={toggleComplete}
            className="bg-teal-600 p-1 rounded text-white my-2 cursor-pointer"
          >
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button
            onClick={deleteTask}
            className="bg-red-500 p-1 rounded text-white my-2 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
