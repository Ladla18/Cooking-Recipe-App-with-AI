import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import UserAuth from "./pages/UserAuth";

const App = () => {
  const [user, setUser] = useState("h");

  const handleLogin = (userData) => {
    // Here you would typically validate the user data with your backend
    // For this example, we'll just set the user state
    setUser(userData);
  };

  return (
    <div>
      {user ? <Dashboard user={user} /> : <UserAuth onLogin={handleLogin} />}
    </div>
  );
};

export default App;
