import React from "react";
import firebase from "../Firebase/InicializacionFirebase";

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
            <div>
                <br/>
                <button className="borderBtn bg-transparent col-lg-12 col-sm-12 " onClick={this.signinWithFacebook}><i class="fab fa-facebook-square iconO"></i></button>
            </div>
        )
    }
}

export default LoginWithFacebook;