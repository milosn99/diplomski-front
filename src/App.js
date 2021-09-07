import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login.js";
import Messenger from "./pages/Messenger";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import ProjectInfo from "./pages/ProjectInfo";
import UserProfile from "./pages/UserProfile";
import SearchStudents from "./pages/SearchStudents";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      {localStorage.getItem("token") && <Navbar />}
      <div>
        <Switch>
          <Route exact path="/">
            {localStorage.getItem("token") ? <Dashboard /> : <Login />}
          </Route>
          <Route exact path="/me">
            <Profile />
          </Route>
          <Route exact path="/edit">
            <EditProfile />
          </Route>
          <Route exact path="/project/:id">
            <ProjectInfo />
          </Route>
          <Route exact path="/user/:id">
            <UserProfile />
          </Route>
          <Route exact path="/messenger">
            <Messenger />
          </Route>
          <Route exact path="/search">
            <SearchStudents />
          </Route>
          <Route exact path="/admin">
            {localStorage.getItem("token") ? (
              <AdminDashboard />
            ) : (
              <AdminLogin />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
