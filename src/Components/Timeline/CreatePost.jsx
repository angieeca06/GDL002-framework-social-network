import React from "react";
import firebase from "../Firebase/InicializacionFirebase";
import moment from "moment";
import "../Styles/createPost.css";
import Swal from "sweetalert2";
import FileUploader from 'react-firebase-file-uploader';

class CreatePost extends React.Component{

    constructor(props){
        super(props);
        this.state={
            messagePost: "",
            image: " ",
            imageURL: " "
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
        const photo = user.photoURL;
        const date = moment().format('lll');
        const postKey = firebase.database().ref("users/" + userId).child("post").push().key;
        const post ={
            autor: userName,
            contenido: this.state.messagePost,
            fecha: date,
            foto: photo,
            id: postKey,
            photoUrl : this.state.imageURL
        };
        console.log(user)
        var updates = {};
        updates['/posts/' + postKey] = post;
        updates['/user-posts/' + userId + '/' + postKey] = post;
        firebase.database().ref().update(updates);
        this.setState({ messagePost: ""})
            Swal.fire({
                type: 'success',    
                title: 'Listo!',
                showConfirmButton: false,
                html: 'Tu post ha sido publicado!',
                timer: 1500,
            }).then((result) => {
                if (
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
            })
    }

    handleUploadStart = () => {
        this.setState({
          progress: 0 ,
          progress: 100
        })
    }

    handleUploadSuccess = fileName => {
        this.setState({
            image: fileName,
        })

        firebase.storage().ref('photos').child(fileName).getDownloadURL()
            .then(url => this.setState({
                imageURL: url
            }))
            .then(()=>{
                Swal.fire({
                    type: 'success',    
                    title: 'Tu foto ha sido cargada',
                    showConfirmButton: true,
                })
            })
    }

    resetPhoto = () =>{
        this.setState({
            imageURL: "",
            FileUploader: []
        })
        console.log("resetPhoto")
    }

    render(){
        return(
            <div className="input-group flex-nowrap col-md-8 d-flex justify-content-center createPost">
                <span className="input-group-text " id="addon-wrapping"><i class="fas fa-plus"></i></span>
                <button type="button" 
                    onClick={this.resetPhoto} 
                    className="form-control col-md-11 color" 
                    placeholder="Crear un nueva publicación" 
                    data-toggle="modal" data-target="#exampleModal" 
                    aria-describedby="addon-wrapping">
                        Haz click para crear una publicación
                </button>
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
                            <div className="form-group letterPost">
                                <label className="col-form-label letterPost">¿Qué quisieras compartir?</label>
                                <textarea autoFocus className="form-control font-color" value={this.state.messagePost} id="messagePost" onChange={this.handleChange} placeholder="¿Sobre qué quieres hablar?
                                    - Tips
                                    - Experiencias
                                    - Anecdotas
                                    - Recomendaciones" />
                            </div>
                            </form>
                            <div clasName="container">
                                <p>Espera a que tu foto se carge</p>
                                {this.state.image && <img src= { this.state.imageURL } />}

                                <FileUploader 
                                accept = "image/*"
                                name ='image'
                                storageRef = { firebase.storage().ref('photos')}
                                onUploadSuccess = { this.handleUploadSuccess }
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn font-color cancelar" data-dismiss="modal">Cancelar</button>
                            <button type="button" onClick={this.sendPostToFirebase} data-dismiss="modal" className="btn font-color publicar">Publicar</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePost;