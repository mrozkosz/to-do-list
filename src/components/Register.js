
import React from "react";
import { Form, Button, Alert } from 'react-bootstrap';

import MainSlider from './MainSlider';
import Background from '../img/bg.jpg';


class Register extends React.Component {
    constructor(props) {
        super(props);

        // localStorage.clear();
    }
    state = {
        name: "",
        email: "",
        password: "",
        error: false,
        message: [],
        token: "",
        refreshToken: "",
        expiresIn: 0
    }
    handleSubmit = () => {
        fetch('https://www.techjuice.com.pl/todolist/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'password': this.state.password,
                'email': this.state.email,
                'name': this.state.name
            })
        }).then((response) => {
            response.json().then((jsonData) => {
                if (jsonData.errors) {
                    this.setState({ error: true, message: jsonData.errors })
                } else {
                    this.props.props.history.push("/login");
                }
            });
        })
    }

    storage(userDetails) {
        // 'access_token': this.jsonData.access_token,
        localStorage.setItem('token', JSON.stringify({
            'expires': new Date(new Date().getTime() + this.state.expiresIn).toISOString(),
            'access_token': this.state.token,
            'refresh_token': this.state.refreshToken,
        }));
        localStorage.setItem('user', JSON.stringify({
            'id': userDetails.id,
            'name': userDetails.name,
            'email': userDetails.email,
            'username': userDetails.username,
        }));

    }
    handleChangeName = (event) => {
        this.setState({ name: event.target.value });
    }
    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    }
    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }
    render() {
        return (
            <div>
                <MainSlider Background={Background} title={'Zarejestruj się'} />
                <div className="container" style={{ paddingTop: 50 }}>
                    <div className="col-md-6 offset-md-3">

                        {Object.keys(this.state.message).map((item, index) => (<Alert key={index} variant={'danger'}>
                            {this.state.message[item]}
                        </Alert>))}
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Name and Surname</Form.Label>
                                <Form.Control type="text" value={this.state.name} onChange={this.handleChangeName} placeholder="Enter your name" />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Enter email" />
                                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                        </Form>
                    </div>
                    <br />

                </div>
            </div>
        );
    }

}

export default Register;