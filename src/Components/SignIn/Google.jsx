import React from "react";
import firebase from "../Firebase/InicializacionFirebase"
import Google from "../Images/google.png";

class LoginWithGoogle extends React.Component{

    constructor(){
        super();

        this.state = {
            user: {}
        }
        this.signinWithGoogle = this.signinWithGoogle.bind(this);
    }

    componentWillMount(){
        // console.log(this.props.user)
        // this.setState({ user:{
        //     name: user. 
        //     }
        // })
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
            <button className="borderBtn bg-transparent col-lg-12 col-sm-12 " onClick={this.signinWithGoogle}><img className="iconO col-lg-4  col-sm-2 inline" src={Google} alt="..."/></button>
        )
    }
}

export default LoginWithGoogle;