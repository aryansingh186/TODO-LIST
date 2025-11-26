import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2, Edit2, Plus, Calendar } from "lucide-react";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000";


  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  // Get current date info
  const getCurrentDate = () => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()]
    };
  };

  const currentDate = getCurrentDate();
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  // Fetch all todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/todos`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      setTodos(data.todos || data);
    } catch (err) {
      console.log("Error fetching todos:", err);
      toast.error("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  // Create or Update todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      toast.warning("Please enter a task");
      return;
    }

    try {
      if (editingId !== null) {
        // Update existing todo
        const response = await fetch(`${API_URL}/todos/${editingId}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({ text: task, completed: false }),
        });
        const data = await response.json();
        setTodos(todos.map((todo) => (todo._id === editingId ? data.todo : todo)));
        setEditingId(null);
        toast.success("Todo updated successfully! ");
      } else {
        // Create new todo
        const response = await fetch(`${API_URL}/todos`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({ text: task, completed: false }),
        });
        const data = await response.json();
        setTodos([...todos, data.todo]);
       
      }
      setTask("");
    } catch (err) {
      console.log("Error saving todo:", err);
      toast.error("Failed to save todo");
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, { 
        method: "DELETE",
        headers: getAuthHeaders()
      });
      setTodos(todos.filter((todo) => todo._id !== id));
     
    } catch (err) {
      console.log("Error deleting todo:", err);
      toast.error("Failed to delete todo");
    }
  };

  // Edit todo
  const handleEdit = (id) => {
    const todo = todos.find((t) => t._id === id);
    setTask(todo.text);
    setEditingId(id);
  };

  // Toggle completed
  const handleToggle = async (id, completed) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ text: todo.text, completed: !completed }),
      });
      const data = await response.json();
      setTodos(todos.map((t) => (t._id === id ? data.todo : t)));
    } catch (err) {
      console.log("Error toggling todo:", err);
      toast.error("Failed to update todo");
    }
  };

  return (
    <div className="min-h-screen relative flex justify-center items-center p-6">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"></div>

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

      {/* Todo Card */}
      <div className="w-full max-w-2xl bg-white relative z-10 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <Calendar size={28} />
              <div>
                <h2 className="text-2xl font-bold">{currentDate.day}, {currentDate.date}</h2>
                <p className="text-indigo-100 text-sm">{currentDate.month}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{todos.length}</p>
              <p className="text-sm text-indigo-100">Total Tasks</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-4">
            <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-xs text-indigo-100">Pending</p>
            </div>
            <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{completedCount}</p>
              <p className="text-xs text-indigo-100">Completed</p>
            </div>
          </div>
        </div>

        {/* Add Task Input */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              placeholder={editingId ? "Update your task..." : "Add a new task..."}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              className={`${
                editingId 
                  ? "bg-amber-500 hover:bg-amber-600" 
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition shadow-md hover:shadow-lg`}
            >
              {editingId ? (
                <>
                  <Edit2 size={10} />
                  Update
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Add
                </>
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setTask("");
                  toast.info("Edit cancelled");
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-3 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Task List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No tasks yet</p>
              <p className="text-gray-400 text-sm">Add your first task to get started!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo, index) => (
                <li
                  key={todo._id}
                  className="group bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggle(todo._id, todo.completed)}
                        className="w-5 h-5 cursor-pointer accent-indigo-600"
                      />
                      <span
                        className={`flex-1 ${
                          todo.completed 
                            ? "line-through text-gray-400" 
                            : "text-gray-800 font-medium"
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(todo._id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Progress: {completedCount}/{todos.length} tasks completed</span>
              <div className="w-48 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${todos.length > 0 ? (completedCount / todos.length) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;