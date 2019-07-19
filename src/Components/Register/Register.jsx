import React from "react";
import "../Styles/Register.css";
import firebase from "../Firebase/InicializacionFirebase";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

class Register extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            photoURL: "https://drogaspoliticacultura.net/wp-content/uploads/2017/09/placeholder-user.jpg"
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginWithEmailAndPassword = this.loginWithEmailAndPassword.bind(this)
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value,
        });
        
    }

    loginWithEmailAndPassword(e){
        e.preventDefault();
        const displayName = this.state.displayName;
        console.log(this.state);
        const email = this.state.email;
        const password = this.state.password;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(){
            const user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: displayName,
                photoURL: "https://drogaspoliticacultura.net/wp-content/uploads/2017/09/placeholder-user.jpg"
            })
        })
        .catch(function(error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
                footer: 'Vuelve a intetarlo'
              })
          });
    }


    render(){
        return(
            <div className="register">
                <img src="https://fotos.subefotos.com/bf6de30544c23d1df2aad093e5688c92o.png" alt="..." className="img-fluid imgR col-md-4 col-sm-4" />
                <form className="style col-md-8 ">
                    <div className="form-row">
                        <div className="col-md-11 mb-3">
                            <label for="name">Nombre completo</label>
                            <input type="text" onChange={this.handleChange} className="form-control input" id="displayName" placeholder="Nombre" required/>
                        </div>
                        <div className="col-md-11 mb-3">
                            <label for="email">Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrepend2"><i class="far fa-envelope icon"></i></span>
                                </div>
                                <input type="email" onChange={this.handleChange} className="form-control input" id="email" placeholder="Username" aria-describedby="inputGroupPrepend2" required/>
                            </div>
                        </div>
                        <div className="col-md-11 mb-3">
                            <label for="validationDefaultUsername">Contraseña</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrepend2"><i class="fas fa-lock icon"></i></span>
                                </div>
                                <input type="password" onChange={this.handleChange} className="form-control input" id="password" placeholder="Contraseña" aria-describedby="inputGroupPrepend2" required/>
                            </div>
                        </div>
                        <div className="form-group text-center">
                            <Link to="/">
                                <a className="form-check-label " for="invalidCheck2">
                                    Ya tienes una cuenta
                                </a>
                            </Link>
                        </div>
                    </div>
                    <button className=" btnStyles btn position col-lg-11 col-sm-11 col-md-11 inline " type="submit" onClick={this.loginWithEmailAndPassword}>Registrarme</button>
                </form>
                <br/>
            </div>
            
        )
    }
}

export default Register