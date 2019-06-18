import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import "./Components/Styles/App.css"
import Register from "./Components/Register/Register";
import SignIn from './Components/SignIn/SignIn';
import firebase from "./Components/Firebase/InicializacionFirebase";
import Timeline from "./Components/Timeline/Timeline"

class App extends React.Component{

    constructor(){
      super();

      this.state = {
        user: {}
      }
      this.authListener = this.authListener.bind(this);
    }

  componentDidMount(){
    this.authListener();
  }

  authListener(){
    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        this.setState({user});
      }else{
        this.setState({user: null});
      }
    })
  }

  render(){
    console.log(this.state.user)
    return (
      <HashRouter basename="/">
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => this.state.user ? (<Timeline/>) : (<SignIn/>)} />
            <Route exact path="/SignIn" render={ () => this.state.user ? (<Timeline/>) : (<Register />)} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
  
}

export default App;
