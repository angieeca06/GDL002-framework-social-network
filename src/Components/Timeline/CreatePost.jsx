import React from "react";
import Post from "../Images/Post.png";
import firebase from "../Firebase/InicializacionFirebase";
import moment from "moment";

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
        firebase.database().ref().update(updates);
        this.setState({ messagePost: ""})
    }

    render(){
        console.log(this.state.messagePost)
        return(
            <div className="input-group flex-nowrap col-md-12">
                <span className="input-group-text " id="addon-wrapping"><img className="icon" src={Post} alt="..."/></span>
                <button type="button" className="form-control col-md-11 " placeholder="Crear un nueva publicación" data-toggle="modal" data-target="#exampleModal" aria-describedby="addon-wrapping">Crear una publicación</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{this.props.infoUser.displayName}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Que quisieras compartir?</label>
                                <textarea class="form-control" value={this.state.messagePost} id="messagePost" onChange={this.handleChange} placeholder="¿Sobre qué quieres hablar?
                                    - Tips
                                    - Experiencias
                                    - Anecdotas
                                    - Recomendaciones" />
                            </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" onClick={this.sendPostToFirebase} data-dismiss="modal" class="btn btn-primary">Publicar</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePost;