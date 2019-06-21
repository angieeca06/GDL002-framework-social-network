import React from "react";
import "./Styles/navbar.css";
import firebase from "./Firebase/InicializacionFirebase"

class NavbarComponents extends React.Component{

    constructor(){
        super();
        this.logOut = this.logOut.bind(this);
    }

    logOut(e){
        e.preventDefault();
        firebase.auth().signOut().then(function() {
            console.log("sesion cerrada")
          }).catch(function(error) {
            console.log(error)
          });
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light col-md-12">
                <a className="navbar-brand col-md-3 col-sm-5 col-5" href="/"><img className="logo img-fluid" alt="..." src="https://fotos.subefotos.com/bf6de30544c23d1df2aad093e5688c92o.png" /></a>
                <button className="navbar-toggler col-sm-2 col-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon cool-sm-12 col-12"></span>
                </button>
                <div className="collapse navbar-collapse col-md-9" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto col-md-12">
                        <li className="nav-item active col-md-4">
                            <a className="nav-link" href="/">Perfil <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item dropdown active col-md-4">
                            <a className="nav-link dropdown-toggle " href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categorias
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/">Bebés</a>
                                <a className="dropdown-item" href="/">Niños</a>
                                <a className="dropdown-item" href="/">Adolescentes</a>
                            </div>
                        </li>
                        <li className="nav-item active col-md-4">
                            <a className="nav-link" href="/" onClick={this.logOut}>Cerrar sesion<span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavbarComponents