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
        user: {},
        userDB : {}
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
        this.setState({ 
          userDB: {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
          }
        })
      }else{
        this.setState({user: null});
      }
    })
  }

  render(){
    return (
      <HashRouter basename="/">
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => this.state.user ? (<Timeline user={this.state.user}/>) : (<SignIn userDB={this.state.userDB}/>)} />
            <Route exact path="/SignIn" render={ () => this.state.user ? (<Timeline user={this.state.user}/>) : (<Register userBD={this.state.userDB}/>)} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
  
}

export default App;
