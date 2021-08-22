import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login.js";
import Messenger from "./components/Messenger";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost.js";
import NewProject from "./components/NewProject";
import Profile from "./components/Profile";
import ProjectEdit from "./components/ProjectEdit";
import ProjectInfo from "./components/ProjectInfo";
import StudentProfile from "./components/StudentProfile";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: "5%",
  },
}));

function App() {
  const classes = useStyles();
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
