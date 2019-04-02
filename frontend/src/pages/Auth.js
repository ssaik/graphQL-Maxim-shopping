import React, { Component } from 'react';
import './Auth.css'

class Authpage extends Component {

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();     //this means it prevents all the other actions except Submit, i.e. Default.
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if(email.trim().length === 0 || password.trim().length === 0 ) {
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}) {
                        _id
                        email
                    }
                }
            `
        };

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
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
                <button type="button">Switch to Signup</button>
            </div>
        </form>
        )
    }
}

export default Authpage;