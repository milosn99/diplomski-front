import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login.js";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost.js";
import Profile from "./components/Profile";
import ProjectEdit from "./components/ProjectEdit";
import ProjectInfo from "./components/ProjectInfo";
import StudentProfile from "./components/StudentProfile";

function App() {
  return (
    <Router>
      {localStorage.getItem("token") && <Navbar />}
      <div className='content'>
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
