import React from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';


class Auth extends React.Component {
    constructor() {
        super()

        this.state = {
            username: "",
            password: "",
            disabled: true,
            error: "",
        }
    }

    buttonDisable = () => {
        if (this.state.username === "" || this.state.password === "") {
            this.setState({
                disabled: true
            })
        } else {
            this.setState({
                disabled: false
            })
        }
    }

    handleChange = (e) => {
        if (e.target.placeholder === "User Name") {
            this.setState({
                username: e.target.value
            }, () => {this.buttonDisable()})
        } else if (e.target.placeholder === "Password") {
            this.setState({
                password: e.target.value
            }, () => {this.buttonDisable()})
        }
    }

    handleSignIn = (e) => {
        e.preventDefault();
        this.props.handleSignIn(this.state.username, this.state.password);
    }

    handleSignUp = (e) => {
        e.preventDefault();
        this.props.handleSignUp(this.state.username, this.state.password);
    }

    componentDidMount() {
        document.getElementById("name-field").focus();
        setInterval(() => {
            this.setState({
                error: "al;f kasflka l;fa ;fkal; fma;lfm a;lfa ;dkal; fkla;f kla;kf as;l kfaslfak;f"
            })
        }, 1500);
    
    }

    componentWillReceiveProps() {
        document.getElementById("name-field").focus();
    }


    render() {
        let authJSX, authButtonClasses, errorJSX;
        if (this.props.match.path === "/signin") {
            authJSX = 
                <div className="auth-box">
                    <div className="auth-header">Sign In</div>
                    <form className="auth-form" onSubmit={this.handleSignIn}>
                        <input className="auth-form-input" autocomplete="off" ref="username" id="name-field" type="text" placeholder="User Name" onChange={this.handleChange}/>
                        <input className="auth-form-input" autocomplete="off" ref="password" type="password" placeholder="Password"  onChange={this.handleChange}/>
                        <br/>
                        <button disabled={this.state.disabled} className="auth-form-button">Sign In</button>
                    </form>
                    <div className="change-auth-option">
                        Don't have an account?
                        <Link className="auth-link" to="/signup"> Sign Up</Link>
                    </div>
                </div>
        } else if (this.props.match.path === "/signup") {
            authJSX = 
                <div className="auth-box">
                    <div className="auth-header">Sign Up</div>
                    <form className="auth-form" onSubmit={this.handleSignUp}>
                        <input className="auth-form-input" autocomplete="off" ref="username" id="name-field" type="text" placeholder="User Name"  onChange={this.handleChange}/>
                        <input className="auth-form-input" autocomplete="off" ref="password" type="password" placeholder="Password"  onChange={this.handleChange}/>
                        <br/>
                        <button disabled={this.state.disabled} className="auth-form-button">Sign Up</button>
                    </form>
                    <div className="change-auth-option">
                        Already have an account?  <Link className="auth-link" to="/signin">Sign In</Link>
                    </div>
                </div>
        }
        if (this.state.error === "") {
            errorJSX = 
                    <div className="auth-error-container-invisible">
                         <p className="error-message"></p>
                    </div>
        } else {   
            errorJSX =  
                    <div className="auth-error-container-visible">
                        <p className="error-message">{this.state.error}</p>
                    </div>
        }

        return(
            <div className="auth-container">
                    { authJSX }
                    <div className="auth-error-positioner">
                        { errorJSX } 
                    </div>
            </div>
        )
    }
} 

export default Auth;