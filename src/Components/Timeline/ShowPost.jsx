import React from "react";
import firebase from "../Firebase/InicializacionFirebase";
import "../Styles/posts.css";
import Swal from "sweetalert2";

class ShowPost extends React.Component{
    constructor(){
        super();

        this.state={
            posts: []
        }
        this.deletePost = this.deletePost.bind(this);
    }

    componentWillMount(){
        function timeLinePosts(snapshot){
            let posts = []

            snapshot.forEach(post => {
                const items = post.val();
                posts.unshift(items)
            });
            return posts
        }
        const dbPostsRef = firebase.database().ref();
        const postsRef = dbPostsRef.child("posts/");
        postsRef.on("value", s=>{
            const postForArray = timeLinePosts(s);
            this.setState({
                posts: postForArray
            })
        })
    }

    deletePost = (e) => {
        e.preventDefault()
        const postId = e.target.id;
        const userId = firebase.auth().currentUser.uid;
        const dbPostsRef = firebase.database().ref();
        const postsRef = dbPostsRef.child("posts/");
        const postUserRef = dbPostsRef.child("user-posts/" + userId)
        Swal.fire({
            title: '¿Segur@ que quieres eliminar tu publicación?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#CEE161',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡Eliminar!'
            }).then((result) => {
                console.log(result)
            if (result.value) {
                Swal.fire({
                    type: 'success',
                    title: 'Listo!',
                    showConfirmButton: false,
                    html: 'Tu post ha sido eliminado!',
                    timer: 1000,
                }).then((result) => {
                    if (
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        console.log('I was closed by the timer')
                    }
                })
                postsRef.child(postId).remove();
                postUserRef.child(postId).remove();
            }
            })
       
    }

    render(){
        return(
            <div className="col-md-11 align-content-center mx-auto">
                {this.state.posts.map((post, i) =>
                    <div className="card border-dark mb-3 align-content-center" key={i}>
                        <div className="card-header header-color container col-md-12 col-sm-12">
                            <div className="row">
                                <div className="col col-md-1 col-sm-1 col-1">
                                    <img className="photoPost" src={post.foto} alt="..."/>
                                </div>
                                <div className="col col-md-9 col-sm-9 col-8 letter-color">
                                    <span className="letter-color">{post.autor}</span>
                                </div>
                                <div className="col col-md-2 col-sm-2 col-3">
                                    <div className="dropdown bg-transparent">
                                        <div className="container">
                                            <button className="btn dropdown-toggle col-md-11 dropdown-letter" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fas fa-ellipsis-h options"></i>                                            
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                {/* <button className="dropdown-item">Editar</button> */}
                                                <button type="button" onClick={this.deletePost} id={post.id} className="dropdown-item color btn">Eliminar</button>
                                            </div>
                                            
                                        </div>                           
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="card-body text-dark content-color">
                                <small className="card-title">{post.fecha}</small>
                                <h4 className="card-text">{post.contenido}</h4>
                            </div>
                        
                    </div>
                )}
            </div>
        )
    }   
}

export default ShowPost;