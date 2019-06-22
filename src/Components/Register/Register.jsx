import React from "react";
import Email from "../Images/correo.png";
import Password from "../Images/Password.png";
import "../Styles/Register.css";
import firebase from "../Firebase/InicializacionFirebase"

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
          });
    }


    render(){
        return(
            <div>
                <img src="https://fotos.subefotos.com/bf6de30544c23d1df2aad093e5688c92o.png" alt="..." className="img-fluid img col-md-4 col-sm-4" />
                <form className="style col-md-10 ">
                    <div className="form-row">
                        <div className="col-md-11 mb-3">
                            <label for="name">Nombre completo</label>
                            <input type="text" onChange={this.handleChange} className="form-control input" id="displayName" placeholder="Nombre" required/>
                        </div>
                        <div className="col-md-11 mb-3">
                            <label for="email">Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrepend2"><img className="icon" src={Email} alt="..."/></span>
                                </div>
                                <input type="email" onChange={this.handleChange} className="form-control input" id="email" placeholder="Username" aria-describedby="inputGroupPrepend2" required/>
                            </div>
                        </div>
                        <div className="col-md-11 mb-3">
                            <label for="validationDefaultUsername">Contraseña</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrepend2"><img className="icon" src={Password} alt="..."/></span>
                                </div>
                                <input type="password" onChange={this.handleChange} className="form-control input" id="password" placeholder="Contraseña" aria-describedby="inputGroupPrepend2" required/>
                            </div>
                        </div>
                        <div className="form-group text-center">
                            <a className="form-check-label" for="invalidCheck2" href="/#/">
                                Ya tienes una cuenta
                            </a>
                        </div>
                    </div>
                    <button className=" btnStyles btn btn-primary position col-lg-11 col-sm-11 col-md-11 inline " type="submit" onClick={this.loginWithEmailAndPassword}>Registrarme</button>
                </form>
            </div>
            
        )
    }
}

export default Register