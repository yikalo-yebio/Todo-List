import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { email, token } = useAuth();

  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;

      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/tasks", {
          method: "GET",
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        const todos = data.tasks || [];

        const total = todos.length;
        const completed = todos.filter(
          (todo) => todo.isCompleted
        ).length;
        const active = total - completed;

        setTodoStats({
          total,
          completed,
          active,
        });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  const completionPercentage =
    todoStats.total > 0
      ? Math.round(
          (todoStats.completed / todoStats.total) * 100
        )
      : 0;

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>

      <div>
        <h2>Account Information</h2>
        <p>Email: {email}</p>
        <p>Status: Logged In</p>
      </div>

      <div>
        <h2>Todo Statistics</h2>
        <p>Total Todos: {todoStats.total}</p>
        <p>Completed Todos: {todoStats.completed}</p>
        <p>Active Todos: {todoStats.active}</p>

        {todoStats.total > 0 && (
          <p>
            Completion Rate: {completionPercentage}%
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
