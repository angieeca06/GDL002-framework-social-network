import React from "react";
import firebase from "../Firebase/InicializacionFirebase"

class LoginWithGoogle extends React.Component{

    constructor(){
        super();

        this.state = {
            user: {}
        }
        this.signinWithGoogle = this.signinWithGoogle.bind(this);
    }

    signinWithGoogle(e){
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            let user = result.user;
            return user;
          })
          .catch(function(error) {
              console.log(error);
          });
        }

    render(){
        return(
            <div>
                <br/>
                <button className="borderBtn bg-transparent col-lg-12 col-sm-12 " onClick={this.signinWithGoogle} ><i class="fab fa-google iconO iconG"></i></button>
            </div>
        )
    }
}

export default LoginWithGoogle;