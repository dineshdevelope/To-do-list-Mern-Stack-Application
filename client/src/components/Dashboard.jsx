import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";

const Dashboard = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <div>
      <h2 className="bg-green-500 p-5 text-white text-center">Dashboard</h2>

      <TaskList token={token} />
      <div className="flex justify-center pt-20 ">
        <button
          onClick={handleLogout}
          className="bg-red-600 p-2 rounded text-white my-5"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
