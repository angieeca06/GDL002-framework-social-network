import React from "react";
import Post from "../Images/Post.png";
import firebase from "../Firebase/InicializacionFirebase";
import moment from "moment";
import "../Styles/createPost.css"

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
        const photo = user.photoURL;
        const date = moment().format('lll');
        const postKey = firebase.database().ref("users/" + userId).child("post").push().key;
        const post ={
            autor: userName,
            contenido: messagePost,
            fecha: date,
            foto: photo,
            id: postKey
        };
        console.log(postKey)
        var updates = {};
        updates['/posts/' + postKey] = post;
        updates['/user-posts/' + userId + '/' + postKey] = post;
        firebase.database().ref().update(updates);
        this.setState({ messagePost: ""})
    }

    render(){
        return(
            <div className="input-group flex-nowrap col-md-12">
                <span className="input-group-text " id="addon-wrapping"><img className="icon" src={Post} alt="..."/></span>
                <button type="button" className="form-control col-md-11 color" placeholder="Crear un nueva publicación" data-toggle="modal" data-target="#exampleModal" aria-describedby="addon-wrapping">Crear una publicación</button>
                <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.props.infoUser.displayName}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                            <div className="form-group">
                                <label className="col-form-label">Que quisieras compartir?</label>
                                <textarea autoFocus className="form-control font-color" value={this.state.messagePost} id="messagePost" onChange={this.handleChange} placeholder="¿Sobre qué quieres hablar?
                                    - Tips
                                    - Experiencias
                                    - Anecdotas
                                    - Recomendaciones" />
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn font-color" data-dismiss="modal">Cerrar</button>
                            <button type="button" onClick={this.sendPostToFirebase} data-dismiss="modal" className="btn font-color">Publicar</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePost;