import React from "react";
import Post from "../Images/Post.png";
import firebase from "../Firebase/InicializacionFirebase";
import moment from "moment"

class CreatePost extends React.Component{

    constructor(props){
        super(props);
        this.state={
            user: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendPostToFirebase = this.sendPostToFirebase.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value,
          });
    }

    sendPostToFirebase(){
        const userId = firebase.auth().currentUser.uid;
        const user = firebase.auth().currentUser;
        const userName = user.displayName;
        const messagePost = this.state.messagePost;
        const date = moment().format('lll')
        const post ={
            autor: userName,
            contenido: messagePost,
            fecha: date,
        };
        const postKey = firebase.database().ref("users/" + userId).child("post").push().key;
        var updates = {};
        updates['/posts/' + postKey] = post;
        updates['/user-posts/' + userId + '/' + postKey] = post;
        return firebase.database().ref().update(updates);
    }

    render(){
        return(
            <div className="input-group flex-nowrap col-md-12">
                <span className="input-group-text " id="addon-wrapping"><img className="icon" src={Post} alt="..."/></span>
                <input type="text" onChange={this.handleChange} className="form-control col-md-8" id="messagePost" placeholder="Crear un nueva publicación" aria-label="Username" aria-describedby="addon-wrapping" />
                <button className=" form-control col-md-3" onClick={this.sendPostToFirebase}>Publicar</button>
            </div>
        )
    }
}

export default CreatePost;