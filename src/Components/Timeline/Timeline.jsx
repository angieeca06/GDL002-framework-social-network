import React from "react";
import firebase from "../Firebase/InicializacionFirebase"

class Timeline extends React.Component{
    constructor(){
        super();
        this.logOut = this.logOut.bind(this);
    }

    logOut(e){
        e.preventDefault();
        firebase.auth().signOut().then(function() {
            console.log("sesion cerrada")
          }).catch(function(error) {
            console.log(error)
          });
    }
    
    render(){
        return(
            <div>Timeline
                <button onClick={this.logOut}>Cerrar sesión</button>
            </div>
        )
    }
    
    
}

export default Timeline;