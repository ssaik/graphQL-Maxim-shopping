import React, { Component } from 'react';
import './Auth.css'

import AuthContext from '../context/auth-context';

class Authpage extends Component {

    state = {
        isLogin: true
    }

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        })
    }

    submitHandler = (event) => {
        event.preventDefault();     //this means it prevents all the other actions except Submit, i.e. Default.
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if(email.trim().length === 0 || password.trim().length === 0 ) {
            return;
        }
        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };

        if(!this.state.isLogin){
             requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {email: "${email}", password: "${password}"}) {
                            _id
                            email
                        }
                    }
                `
            };
        }

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status !== 200 && res.status !== 201) {
                console.log('----',res);
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            if (resData.data.login.token) {
                this.context.login(             //It is referencing to App.js -> login(...) method
                  resData.data.login.token,     //It will set token in App.js's state.
                  resData.data.login.userId,    //It will set userId in App.js's state.
                  resData.data.login.tokenExpiration    //It will set tokenExpiration in App.js's state.
                );
            }
        })
        .catch(err => {
            console.log(err);
        });
        console.log(email, password);
    }

    render () {
        return (
        <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" ref={this.emailEl} />    {/*This will automatically validates*/}
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordEl} />
            </div>
            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Signup' : 'Signin'}</button>
            </div>
        </form>
        )
    }
}

export default Authpage;