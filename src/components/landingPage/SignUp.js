import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            dateOfBirth: '',
            password: '',
            password2: '',
            sessid: ''
        }
        this.setSessid = this.setSessid.bind(this)
        this.handleUserName = this.handleUserName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleDateOfBirth = this.this.handleDateOfBirth.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handlePassword2 =this.handlePassword2.bind(this)
    }

    componentWillMount() {
        this.setSessid()
    }

    setSessid() {
        console.log(document.cookie)
    }

    handleUserName(event) {
        this.setState({username: event.target.value});
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
    }

    handleDateOfBirth(event) {
        this.setState({dateOfBirth: event.target.value})
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handlePassword2(event) {
        this.setState({password2: event.target.value});
    }


    render() {
        return(
            <Col>
              <Form>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" value={this.state.username} onChange={this.handleUserName} placeholder="enter a username" />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" value={this.state.email} onChange={this.handleEmail} placeholder="enter your email" />
                </FormGroup>
                <FormGroup>
                  <Label for="dateOfBirth">Date of Birth</Label>
                  <Input type="date" value={this.state.dateOfBirth} onChange={this.dateOfBirth} placeholder="enter date of birth" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="text" value={this.state.password} onChange={this.handlePassword} placeholder="enter a password" />
                </FormGroup>
                <FormGroup>
                    <Label for="password2">Verify Password</Label>
                    <Input type="text" value={this.state.password2} onChange={this.handlePassword2} placeholder="verify your password" />
                </FormGroup>
                <Button onclick={(e) => {console.log(this.state)}}></Button>
              </Form>
            </Col>
        )
    }
}