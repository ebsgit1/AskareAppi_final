import React, { useState, useEffect } from "react";
import "../App.css";
import logo from "../components/askareappi.png";

// Use the REACT_APP_API_URL environment variable
const API_URL = process.env.REACT_APP_API_URL;

const TasksPage = () => {
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOverdueTasks(data.overdue || []);
        setTodaysTasks(data.today || []);
        setUpcomingTasks(data.upcoming || []);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const toggleTaskStatus = async (taskId) => {
    const updateTaskInList = (tasks) =>
      tasks.map((task) =>
        task.task_id === taskId
          ? {
              ...task,
              status: task.status === "not done" ? "completed" : "not done",
            }
          : task
      );

    setOverdueTasks((prevTasks) => updateTaskInList(prevTasks));
    setTodaysTasks((prevTasks) => updateTaskInList(prevTasks));
    setUpcomingTasks((prevTasks) => updateTaskInList(prevTasks));

    await fetch(`${API_URL}/tasks/${taskId}/toggle`, {
      method: "PATCH",
      credentials: true,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task updated:", data);
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
        setOverdueTasks((prevTasks) => updateTaskInList(prevTasks));
        setTodaysTasks((prevTasks) => updateTaskInList(prevTasks));
        setUpcomingTasks((prevTasks) => updateTaskInList(prevTasks));
      });
  };

  return (
    <div>
      <img
        src={logo}
        alt="logo"
        style={{ width: "20%", height: "11%", marginTop: "0" }}
      />
      <h1>Tasks</h1>
      <div className="task-container">
        <section className="today-tasks">
          <h2>Today's Tasks</h2>
          <ul>
            {todaysTasks.map((task) => (
              <li key={task.task_id}>
                <span
                  className={`task-status ${
                    task.status === "completed" ? "completed" : "not-done"
                  }`}
                  onClick={() => toggleTaskStatus(task.task_id)}
                ></span>
                <span>{task.name}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="overdue-tasks">
          <h2>Overdue Tasks</h2>
          <ul>
            {overdueTasks.map((task) => (
              <li key={task.task_id}>
                <span
                  className={`task-status ${
                    task.status === "completed" ? "completed" : "not-done"
                  }`}
                  onClick={() => toggleTaskStatus(task.task_id)}
                ></span>
                <span>{task.name}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="upcoming-tasks">
          <h2>Upcoming Tasks</h2>
          <ul>
            {upcomingTasks.map((task) => (
              <li key={task.task_id}>
                <span
                  className={`task-status ${
                    task.status === "completed" ? "completed" : "not-done"
                  }`}
                  onClick={() => toggleTaskStatus(task.task_id)}
                ></span>
                <span>{task.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TasksPage;
