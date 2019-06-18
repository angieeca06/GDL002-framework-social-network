import React from "react";
import firebase from "../Firebase/InicializacionFirebase";
import Facebook from "../Images/facebook.png";

class LoginWithFacebook extends React.Component{

    constructor(){
        super();
        this.signinWithFacebook = this.signinWithFacebook.bind(this);
    }

    signinWithFacebook(e){
        e.preventDefault();
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user;
            console.log(user);
          }).catch(function(error) {
           console.log(error);
          });
    }

    render(){
        return(
            <button className="borderBtn bg-transparent col-lg-12 col-sm-12 " onClick={this.signinWithFacebook}><img className="iconO col-lg-4  col-sm-2 inline" src={Facebook} alt="..."/></button>
        )
    }
}

export default LoginWithFacebook;