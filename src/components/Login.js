import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Header1 from './Header1';
import Header from './Header';

export default class Login extends Component {
    state = {
        success_notication:"",
        email_notification:"",
        password_notification:"",
        user_mail: '',
        user_password: '',
        user_login:''
    }
    onChangeMail = (e) => {
        this.setState({
            user_mail:e.target.value
        });
    }
    onChangePassword = (e) => {
        this.setState({
            user_password:e.target.value
        });
    }
    Login = (e) => {
        e.preventDefault();
        const postData = {
            email:this.state.user_mail,
            password: this.state.user_password,
        }
        axios
            .post("http://localhost:4000/login", postData)
            .then((res) => {
                        console.log(res)
                        if(res.data.mailloginSuccess === false){
                            this.setState({
                                email_notification:"Unknown email address. Please check again",
                                password_notification:"",
                                success_notication:""
                            })
                        }
                        else if(res.data.passwordloginSuccess === false){
                            this.setState({
                                password_notification:"Wrong Password. Please check again",
                                email_notification:"",
                                success_notication:""
                            })
                        }
                        else {
                           
                            this.setState({
                                success_notication:"Welcome  " + res.data.name + "!",
                                email_notification:"",
                                password_notification:"",
                                user_login:res.data.name
                            })
                         
                        }                    
                    }    
            )
            .catch((err) => {
                console.log("err get data : ", err.message);
                    });
    }
    render() {
        if(this.state.user_login == ''){
            return(
                <div>
                    <Header />
                    <div className = "login">
                    <p className = "form-title">Login</p>
                    <form onSubmit = {this.Login} autoComplete="on">
                        <div className = "form-group">
                            <label>Email:</label><br />
                            <input type = "text" onChange = {this.onChangeMail} value = {this.state.user_mail} placeholder = "Type your email" required />
                            <p className = "warn">{this.state.email_notification}</p>
                        </div>
                        <div className = "form-group">
                            <label>Password:</label><br />
                            <input type = "password" onChange = {this.onChangePassword} value = {this.state.user_password} placeholder = "Type a password" required />
                            <p className = "warn">{this.state.password_notification}</p>
                        </div>
                        <div className = "form-group">
                            <input type = "submit" value = "Sign me in" className = "btn btn-primary" />
                        </div>
                    </form>
                    <div className = "already">
                        <p className = "tocreate">Don't have an account?</p>
                        <Link to="/create" className="nav-link">Register</Link>
                    </div>
                    <div className = "form-group">
                        <Link to = "/forget" className = "nav-link">Forget Password?</Link>
                    </div>
                </div>
            </div>
            )
        }
        else{
            var redirect = `/dashboard?${this.state.user_login}&${this.state.user_password}`
            return <Redirect to = {redirect}/>;
        }
    }
}
