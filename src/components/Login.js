
import React from "react";
import { Form, Button, Alert } from 'react-bootstrap';

import MainSlider from './MainSlider';
import Background from '../img/bg.jpg';


class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        // localStorage.clear();
    }
    state = {
        email: "",
        password: "",
        error: false,
        message: '',
        token: "",
        refreshToken: "",
        expiresIn: 0
    }
    handleSubmit = () => {
        fetch('https://www.techjuice.com.pl/todolist/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': this.state.email,
                'password': this.state.password,
                'grant_type': 'password',
                'client_id': '2',
                'client_secret': 'XWzRIZghRwy7JwnGYKiDh5MiDqtbnt7bmZ4bUxjw'
            })
        }).then((response) => {
            response.json().then((jsonData) => {
                if (jsonData.access_token) {
                    this.setState({
                        token: jsonData.access_token,
                        refreshToken: jsonData.refresh_token,
                        expiresIn: jsonData.expires_in
                    })
                    this.getUserDetails();
                } else {
                    this.setState({ error: true, message: "Błąd!" })
                }

            });
        })
    }
    getUserDetails() {
        console.log(this.state.token)
        fetch('https://www.techjuice.com.pl/todolist/api/init', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        }).then((response) => {
            response.json().then((jsonData) => {
                console.log(jsonData)
                this.storage(jsonData);
                this.props.props.history.push("/");
                this.props.params.setState({isAuthenticated:true});
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
    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    }
    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }
    render() {
        return (
            <div>
                <MainSlider Background={Background} title={'Zaloguj się'} />
                <div className="container" style={{ paddingTop: 50 }}>
                    <div className="col-md-6 offset-md-3">
                        {this.state.error ? <Alert key={1} variant={'danger'}>
                            Sprawdz czy login i hasło są poprawne.
                        </Alert> : null}
                        <Form onSubmit={this.handleSubmit}>
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

                </div>
            </div>
        );
    }

}

export default Login;