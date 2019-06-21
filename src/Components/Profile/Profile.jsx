import React from "react";
import NavbarComponents from "../NavbarComponents";
import "../Styles/profile.css"

class Profile extends React.Component{
    
    render(){
        console.log(this.props.user)
        return(
            <div>
                <NavbarComponents/>
                <div className="card">
                    <img src={this.props.user.photo} className="card-img-top img-fluid img" alt={this.props.user.name}/>
                    <div className="card-body">
                        <h1 className="card-text text-center">{this.props.user.name}</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile; 