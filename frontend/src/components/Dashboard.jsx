// import React from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import TasksOverview from "./TasksOverview";
// import RoomsOverview from "./RoomsOverview";
// import "./App.css";

// function Dashboard() {
//   return (
//     <div className="dashboard-container">
//       <h1>Dashboard Page</h1>
//       <Sidebar />
//       <div className="main-content">
//         <Header />
//         <TasksOverview />
//         <RoomsOverview />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React from "react";

const Dashboard = () => {
  const storedToken = localStorage.getItem("token");
  console.log(storedToken);
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
