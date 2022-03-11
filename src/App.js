import React from 'react'; 
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageAfterLogIn from './pages/HomePageAfterLogIn';
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';
import Signup from './pages/Signup'
import RecordList from './components/RecordList';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><HomePage /></Route>
        <Route exact path="/HomePageAfterLogIn"><HomePageAfterLogIn /></Route>      
        <Route exact path="/LogIn"><LogIn /></Route>
        <Route exact path="/Signup"><Signup /></Route>
        <Route exact path="/RecordList"><RecordList /></Route>
      </Switch>
    </Router>
  );
}

export default App;

{/*
AuthContext is an authorization method?  Saved old code here for future reference.  Will delete once authorization problem is solved/approved.
import {useState} from 'react';
//  export const AuthContext = React.createContext()
  // const [authState, setAuthState] = useState(localStorage.getItem("user") ? true : false)
        function App(){
        return(
          { <AuthContext.Provider value={[authState, setAuthState]}> }
          /*{Routes Here}
           { </AuthContext.Provider>}
);
}

*/}