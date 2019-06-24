import React from "react";
import firebase from "../Firebase/InicializacionFirebase"
import NavbarComponents from "../NavbarComponents";
import CreatePost from "./CreatePost";
import ShowPost from "./ShowPost";

class Timeline extends React.Component{

    componentWillReceiveProps(){
        const userDB = this.props.user
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
            userRef.set(userBD);
         }
    }

    
    render(){
        const infoUser = this.props.user
        return(
            <div>
                <NavbarComponents/>
                <br />
                <CreatePost infoUser = {infoUser}/>
                <br />
                <ShowPost infoUser = {infoUser}/>
            </div>
        )
    }
    
    
}

export default Timeline;