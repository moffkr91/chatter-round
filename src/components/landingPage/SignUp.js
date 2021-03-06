import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import './index.css';
const moment = require('moment');
const hash = require('hash.js');

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            dateOfBirth: '',
            password: '',
            passwordMatch: '',
            formErrors: '',
            userNameValid: false,
            emailVaild: false,
            dateOfBirthValid: false,
            passwordValid: false,
            passwordMatchValid: false,
            formValid: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    };

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => { this.validateField(name) });
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.fieldValidationErrors;
        let userNameValid = this.state.userNameValid;
        let emailValid = this.state.emailValid;
        let dateOfBirthValid = this.state.dateOfBirthValid;
        let passwordValid = this.state.passwordValid; 
        let passwordMatchValid = this.state.passwordMatchValid; 
      
        switch(fieldName) {
          case 'userName':
            if (this.state.userName.toString().length > 4) {
                console.log('Username is long enough.');
                console.log(this.state.userName);
                userNameValid = true;
            } else {
                console.log('Usernames must have a length greater than 4 characters.');
                fieldValidationErrors = 'Usernames must have a length greater than 4 characters.';
            }
          break;
          case 'email':
            const emailVal = /^(?=.*[@])(?=.*[/.])/;
            if (emailVal.test(this.state.email.toString()) === true) {
                console.log('email valid');
                emailValid = true;
            } else {
                console.log('You must enter a valid email.');
                fieldValidationErrors = 'You must enter a valid email.';
            }
          break;
          case 'dateOfBirth':
            let today = moment(moment().format('YYYY-MM-DD'));
            let dob = moment(this.state.dateOfBirth.toString());
            let dateDiff = today.diff(dob, 'years', true);
            if (dateDiff === "" | dateDiff === NaN | dateDiff < 13) {
                fieldValidationErrors = `Looks like you are't old enough, or you have entered an invalid date.`;
            } else if (dateDiff > 13) {
                console.log('You are old enough!');
                dateOfBirthValid = true;
            } else {
                console.log('You must enter a valid date of birth.');
                fieldValidationErrors = 'You must enter a valid date of birth.'
            }
            break;           
          case 'password':
            const passVal = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if (passVal.test(this.state.password.toString()) === true) {
                console.log('password true');
                passwordValid = true;
            } else {
                console.log('Your password must be between 6 and 16 characters long and include one of each of the following: lowercase character, uppercase character, special character, and number.');
                fieldValidationErrors = 'Your password must be between 6 and 16 characters long and include one of each of the following: lowercase character, uppercase character, special character, and number.';
            }
            break;
           case "passwordMatch":
            if (this.state.password === this.state.passwordMatch) {
                console.log('Passwords Match');
                passwordMatchValid = true;
            } else {
                console.log('Your passwords do not match.');
                fieldValidationErrors = 'Your passwords do not match.';
            }
            break;
          default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            userNameValid: userNameValid,
            emailValid: emailValid,
            dateOfBirthValid: dateOfBirthValid,
            passwordValid: passwordValid,
            passwordMatchValid: passwordMatchValid
            }, this.validateForm);
    };

    validateForm() {
        if (this.state.userNameValid && this.state.emailValid && this.state.dateOfBirthValid && this.state.passwordValid && this.state.passwordMatchValid) {
            this.setState({formValid: true});
        }
      }

    handleSignUp(e) {
        e.preventDefault();
        fetch('/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.userName,
                email: this.state.email,
                dateOfBirth: this.state.dateOfBirth,
                password: hash.sha256().update(this.state.password).digest('hex'),
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                switch(responseJson.response) {
                    case 'emailExists':
                        console.log('An account with that email address already exists.')
                      break;
                    case 'usernameExists':
                        console.log('An account with that username already exists.')
                      break;
                    case 'accountCreated':
                        this.props.history.push('/home')
                      break;
                    default:
                        console.log('something went wrong...')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return(
            <Row id={'signup-row'} >
              <Col>
              <div id={'signup-form'}>
                <Form id={'signup-formgroup'} >
                  <FormGroup>
                    <Input className={'signupForms'} type="text" name="userName" value={this.state.userName} onChange={this.handleUserInput} placeholder="enter a username" />
                  </FormGroup>
                  <sup id={'username-validation'} >*Usernames must have a length of at least 4 characters.</sup>
                  <FormGroup>
                    <Input className={'signupForms'} type="email" name="email" value={this.state.email} onChange={this.handleUserInput} placeholder="enter your email" />
                  </FormGroup>
                  <sup id={'email-validation'}>You must enter a valid email.</sup>
                  <FormGroup>
                    <Input className={'signupForms'} type="date" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleUserInput} placeholder="enter date of birth" />
                  </FormGroup>
                  <sup id={'dob-validation'} >*You must be at least 13 years of age.</sup>
                  <FormGroup>
                    <Input className={'signupForms'} type="text" name="password" autocomplete="off" value={this.state.password} onChange={this.handleUserInput} placeholder="enter a password" />
                  </FormGroup>
                  <sup id={'password-validation'} >*Your password must be between 6 and 16 characters long and include one of each of the following: lowercase character, uppercase character, special character, and number.</sup>
                  <FormGroup>
                    <Input className={'signupForms'} type="password" name="passwordMatch" autocomplete="off" value={this.state.passwordMatch} onChange={this.handleUserInput} placeholder="verify your password" />
                  </FormGroup>
                  <sup id={'password-match'} >*Your passwords must match.</sup>
                  <br />
                  <Button className={'signup-btn'} onClick={(e) => {this.props.updateView('landing')}}>Back</Button>
                  <Button className={'signup-btn'} disabled={!this.state.formValid} onClick={(e) => {this.handleSignUp(e)}}>Sign Up</Button>
                </Form>
                </div>
              </Col>
            </Row>
        );
    };
};