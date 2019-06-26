import React from "react";
import firebase from "../Firebase/InicializacionFirebase";
import "../Styles/posts.css";
import options from "../Images/options.png";
import DeletePost from "./DeletePost";

class ShowPost extends React.Component{
    constructor(){
        super();

        this.state={
            posts: []
        }
        this.deletePost = this.deletePost.bind(this)
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
        const dbPostsRef = firebase.database().ref();
        const postsRef = dbPostsRef.child("posts/");
        const userId = firebase.auth().currentUser.uid;
        const postUserRef = dbPostsRef.child("user-posts/" + userId)
        const postId = e.target.id;
        console.log(postId);
        postsRef.child(postId).remove();
        postUserRef.child(postId).remove();
    }

    render(){
        return(
            <div className="col-md-11 align-content-center mx-auto">
                {this.state.posts.map((post, i) =>
                    <div className="card border-dark mb-3 align-content-center" key={i}>
                        {console.log(post)}
                        <div className="card-header header-color container col-md-12 col-sm-12">
                            <div className="row">
                                <div className="col col-md-2 col-sm-2 col-2">
                                    <img className="photoPost" src={post.foto} alt="..."/>
                                </div>
                                <div className="col col-md-8 col-sm-8 col-7">
                                    <span className=" letter-color">{post.autor}</span>
                                </div>
                                <div className="col col-md-2 col-sm-2 col-3">
                                    <div className="dropdown bg-transparent">
                                        <div className="container">
                                            <button className="btn dropdown-toggle col-md-11 dropdown-letter" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <img className="options" src={options} alt="options"/>
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <button className="dropdown-item">Editar</button>
                                                <button onClick={this.deletePost}  id={post.id} className="dropdown-item color">Eliminar</button>
                                                {/* <DeletePost /> */}
                                            </div>
                                        </div>                           
                                    </div>
                                </div>
                            </div>
                            {/* <br /> */}
                            <div className="card-body text-dark content-color">
                                <h5 className="card-title">{post.fecha}</h5>
                                <p className="card-text">{post.contenido}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }   
}

export default ShowPost;