import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login.js";
import Messenger from "./pages/Messenger";
import Navbar from "./components/Navbar";
import NewPost from "./pages/NewPost.js";
import NewProject from "./pages/NewProject";
import Profile from "./pages/Profile";
import ProjectEdit from "./pages/ProjectEdit";
import ProjectInfo from "./pages/ProjectInfo";
import StudentProfile from "./pages/StudentProfile";

function App() {
  return (
    <Router>
      {localStorage.getItem("token") && <Navbar />}
      <div>
        <Switch>
          <Route exact path='/'>
            {localStorage.getItem("token") ? <Dashboard /> : <Login />}
          </Route>
          <Route exact path='/posts/new'>
            <NewPost />
          </Route>
          <Route exact path='/me'>
            <Profile />
          </Route>
          <Route exact path='/edit'>
            <EditProfile />
          </Route>
          <Route exact path='/project/:id'>
            <ProjectInfo />
          </Route>
          <Route exact path='/project/:id/edit'>
            <ProjectEdit />
          </Route>
          <Route exact path='/student/:id'>
            <StudentProfile />
          </Route>
          <Route exact path='/projects/new'>
            <NewProject />
          </Route>
          <Route exact path='/messenger'>
            <Messenger />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
