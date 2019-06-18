import React from "react";
import Email from "../Images/correo.png";
import Password from "../Images/Password.png";
import "../Styles/Register.css";

class Register extends React.Component{
    constructor(){
        super();

        this.state = {
            name : '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value,
        });
        
      }

    render(){
        return(
            <div>
                <img src="https://fotos.subefotos.com/bf6de30544c23d1df2aad093e5688c92o.png" alt="..." className="img-fluid img col-md-4 col-sm-4" />
                <form className="style col-md-10 ">
                    <div class="form-row">
                        <div class="col-md-5 mb-3">
                            <label for="name">Nombre completo</label>
                            <input type="text" class="form-control input" id="name" placeholder="Nombre" required/>
                        </div>
                        <div class="col-md-11 mb-3">
                            <label for="email">Email</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupPrepend2"><img className="icon" src={Email}/></span>
                                </div>
                                <input type="email" class="form-control input" id="email" placeholder="Username" aria-describedby="inputGroupPrepend2" required/>
                            </div>
                        </div>
                        <div class="col-md-11 mb-3">
                            <label for="validationDefaultUsername">Contraseña</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupPrepend2"><img className="icon" src={Password}/></span>
                                </div>
                                <input type="password" class="form-control input" id="validationDefaultUsername" placeholder="Contraseña" aria-describedby="inputGroupPrepend2" required/>
                            </div>
                        </div>
                        <div class="form-group text-center">
                            <a class="form-check-label" for="invalidCheck2" href="/#/">
                                Ya tienes una cuenta
                            </a>
                        </div>
                    </div>
                    <button class="btn btn-primary position col-lg-11 col-sm-11 inline" type="submit">Submit form</button>
                </form>
            </div>
            
        )
    }
}

export default Register