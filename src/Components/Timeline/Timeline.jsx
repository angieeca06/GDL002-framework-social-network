import React from "react";
import firebase from "../Firebase/InicializacionFirebase"
import NavbarComponents from "../NavbarComponents";
import CreatePost from "./CreatePost";

class Timeline extends React.Component{

    componentWillReceiveProps(){
        const userDB = this.props.user
        console.log(userDB)
        const userBD = { 
            uid: userDB.uid,
            name: userDB.displayName,
            email: userDB.email,
            photo: userDB.photoURL
         }
         if(userBD.uid === undefined){
             console.log("no");
         }else{
            const userRef = firebase.database().ref("users/" + userDB.uid);
            userRef.set(userBD)
         }
       
    }
    
    render(){
        return(
            <div>
                <NavbarComponents/>
                <br/>
                <CreatePost />
            </div>
        )
    }
    
    
}

export default Timeline;