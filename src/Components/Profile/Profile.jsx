import React from "react";
import NavbarComponents from "../NavbarComponents";
import "../Styles/profile.css";
import firebase from "../Firebase/InicializacionFirebase";

let postForArray = []

class Profile extends React.Component{
    constructor(){
        super();
        this.state = {
            posts : []
        }
        this.timeLinePostsProfile = this.timeLinePostsProfile.bind(this);
    }

    componentWillReceiveProps(){
        const userId = this.props.objectUser;
        console.log(userId)
        userId ? this.timeLinePostsProfile(userId.uid) : console.log("error")
    }

    componentDidMount(){
        this.componentWillReceiveProps();
    }

    timeLinePostsProfile(userId){
        function timeLinePosts(snapshot){
            let posts = []

            snapshot.forEach(post => {
                const items = post.val();
                posts.unshift(items)
            });
            return posts
        }
        const dbPostsRef = firebase.database().ref();
        const postsRef = dbPostsRef.child("user-posts/" + userId);
        console.log(userId);
        postsRef.on("value", s=>{
            postForArray = timeLinePosts(s);
            this.setState({
                posts: postForArray
            })
        })
        this.render()
    }
    
    render(){
        console.log(this.state.posts)
        return(
            <div>
                <NavbarComponents/>
                <div className="card cardColor">
                    <img src={this.props.user.photo} className="card-img-top img-fluid img" alt={this.props.user.name}/>
                    <div className="card-body">
                        <h1 className="card-text text-center">{this.props.user.name}</h1>
                    </div>
                    <div className="col-md-11 align-content-center mx-auto">
                        {postForArray !== [] || undefined ? this.state.posts.map((post, i) =>
                            <div className="card border-dark mb-3 align-content-center" key={i}>
                                <div className="card-header header-color container col-md-12 col-sm-12">
                                    <div className="row">
                                        <div className="col col-md-1 col-sm-1 col-2">
                                            <img className="photoPost" src={post.foto} alt="..."/>
                                        </div>
                                        <div className="col col-md-9 col-sm-9 col-6 letter-color">
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
                                                        <button onClick={this.deletePost}  id={post.id} className="dropdown-item color">Eliminar</button>
                                                    </div>
                                                </div>                           
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body text-dark content-color">
                                        <small className="card-title">{post.fecha}</small>
                                        <h4 className="card-text">{post.contenido}</h4>
                                        <img className="imagePost" src={post.photoUrl} alt="photo" />
                                    </div>
                                </div>
                            </div>
                        ): console.log("error")}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile; 