import React from "react";
import Post from "../Images/Post.png"

class CreatePost extends React.Component{
    render(){
        return(
            <div className="input-group flex-nowrap">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="addon-wrapping"><img className="icon" src={Post} alt="..."/></span>
                </div>
                <input type="text" className="form-control" placeholder="Crear un nueva publicación" aria-label="Username" aria-describedby="addon-wrapping" />
            </div>
        )
    }
}

export default CreatePost;