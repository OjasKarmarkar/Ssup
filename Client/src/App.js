import React from "react";
import Login from "./Components/Login";
import { Router, Route} from 'react-router-dom'
import Register from "./Components/Register";
import createBrowserHistory from './history';
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
    <div>
      <Router history={createBrowserHistory}>
        <div>
         <Route path="/" exact component={Login}/>
         <Route path="/dashboard" exact component={Home}/>
         <Route path="/register" exact component={Register}/>
        </div>
      </Router>
    </div>
     
    </div>
  );
}

export default App;
