import React from "react";
import "../Styles/Register.css";
import Image from "../Images/Password.png";
import Email from "../Images/correo.png";
import firebase from "../Firebase/InicializacionFirebase";
import Google from "./Google";
import Facebook from "./Facebook";

class SignIn extends React.Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value,
        });
    }

    login(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error)=>{
            console.log(error);
        });
    }

    render(){
        return(
            <div >
                <img src="https://fotos.subefotos.com/bf6de30544c23d1df2aad093e5688c92o.png" alt="..." className="img-fluid img col-md-4 col-sm-4" />
                <form className="style col-md-8 " >
                    <div className="form-row">
                        <div className="col-md-12 mb-3 sm-3">
                            <label for="email">Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text input" id="inputGroupPrepend2"><img className="icon" src={Email} alt="..."/></span>
                                </div>
                                <input type="text" onChange={this.handleChange} className="form-control input" id="email" placeholder="Email" aria-describedby="inputGroupPrepend2" required/>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3 sm-3">
                        <label for="password">Contraseña</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text input" id="inputGroupPrepend2"><img className="icon" src={Image} alt="..."/></span>
                                </div>
                                <input type="password" onChange={this.handleChange} className="form-control input" id="password" placeholder="Contraseña" required/>
                            </div>
                        </div>
                        <div className="form-group text-center">
                            <a className="form-check-label" for="invalidCheck2" href="/#/SignIn">
                                No tienes una cuenta 
                                ¡Registrate!
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-12 inline col-sm-12">
                        <button className="btn btn-primary position col-lg-11 col-sm-11 inline" type="submit" onClick={this.login}>Iniciar sesión</button>
                    </div>
                </form>
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-3 col-md-3 col-sm-3">
                        </div>
                        <div className="col col-lg-3 col-md-3 col-sm-3">
                            <Facebook />
                        </div>
                        <div className="col col-lg-3 col-md-3 col-sm-3">
                            <Google />
                        </div>
                        <div className="col col-lg-3 col-md-3 col-sm-3">
                        </div>
                    </div>
                </div>
                <div className="col-lg-10 col-sm-10 inline">
                    
                </div>
            </div>
        )
    }
}

export default SignIn;