import React from "react";
import NavbarComponents from "../NavbarComponents";
import "../Styles/profile.css";
import firebase from "../Firebase/InicializacionFirebase";
import options from "../Images/options.png";

class Profile extends React.Component{
    constructor(){
        super();
        this.state = {

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
        const userId = firebase.auth().currentUser;
        const dbPostsRef = firebase.database().ref();
        const postsRef = dbPostsRef.child("user-posts/");
        console.log(userId)
        // postsRef.on("value", s=>{
        //     const postForArray = timeLinePosts(s);
        //     this.setState({
        //         posts: postForArray
        //     })
        // })
    }
    
    render(){
        return(
            <div>
                <NavbarComponents/>
                <div className="card">
                    <img src={this.props.user.photo} className="card-img-top img-fluid img" alt={this.props.user.name}/>
                    <div className="card-body">
                        <h1 className="card-text text-center">{this.props.user.name}</h1>
                    </div>
                    {/* <div className="col-md-11 align-content-center mx-auto">
                        {this.state.posts.map((post, i) =>
                            <div className="card border-dark mb-3 align-content-center" key={i}>
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
                                                    </div>
                                                </div>                           
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body text-dark content-color">
                                        <h5 className="card-title">{post.fecha}</h5>
                                        <p className="card-text">{post.contenido}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Profile; 