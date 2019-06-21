import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import "./Components/Styles/App.css"
import Register from "./Components/Register/Register";
import SignIn from './Components/SignIn/SignIn';
import firebase from "./Components/Firebase/InicializacionFirebase";
import Timeline from "./Components/Timeline/Timeline";
import Profile from "./Components/Profile/Profile"

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
        console.log(user.displayName);
        if(user.displayName === null){
          this.setState({
            userDB: {
              email: user.email,
              photo: "https://drogaspoliticacultura.net/wp-content/uploads/2017/09/placeholder-user.jpg",
              name: user.displayName
            }
          })
        }else{
          this.setState({ 
            userDB: {
              name: user.displayName,
              email: user.email,
              photo: user.photoURL
            }
          })
        }
      }else{
        this.setState({user: null});
      }
    })
    console.log(this.state.userDB)
  }

  render(){
    return (
      <HashRouter basename="/">
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => this.state.user ? (<Timeline user={this.state.user}/>) : (<SignIn userDB={this.state.userDB}/>)} />
            <Route exact path="/SignIn" render={ () => this.state.user ? (<Timeline  user={this.state.user}/>) : (<Register userBD={this.state.userDB}/>)} />
            <Route exact path="/Profile" render={() => <Profile user = {this.state.userDB}/>}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
  
}

export default App;
