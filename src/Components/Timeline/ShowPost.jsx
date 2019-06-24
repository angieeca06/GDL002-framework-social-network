import React from "react";
import firebase from "../Firebase/InicializacionFirebase";
import "../Styles/posts.css"

class ShowPost extends React.Component{
    constructor(){
        super();

        this.state={
            posts: []
        }
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

    render(){
        return(
            <div className="col-md-11 align-content-center mx-auto">
                {this.state.posts.map((post, i) =>
                    <div className="card border-dark mb-3 align-content-center">
                        <div className="card-header header-color ">
                            <img className="photoPost col-md-1" src={post.foto}/>
                            <span className="col-md-10 letter-color">{post.autor}</span>
                            <button className="button-align">icon</button>
                        </div>
                        <div className="card-body text-dark content-color">
                            <h5 className="card-title">{post.fecha}</h5>
                            <p className="card-text">{post.contenido}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    
}

export default ShowPost;