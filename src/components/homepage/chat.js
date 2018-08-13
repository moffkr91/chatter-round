import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';
const moment = require('moment');
const firebase = require('firebase')

export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: '',
            conversation: [],
            isLoaded: false
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.handleUserInput = this.handleUserInput.bind(this)
        this.getConversation = this.getConversation.bind(this)
    }

    componentDidMount() {
        this.getConversation()
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    getConversation() {
        let { coordinates, currentChat } = this.props.state
        let conversation = []

        const setConversation = (conversation) => {
            this.setState({
                conversation: conversation,
                isLoaded: true
            })}

        firebase.database().ref(`${coordinates}/${currentChat}`).on('value', function(dataSnapshot) {
            conversation = []

            dataSnapshot.forEach((childNode) => {
                let message = {
                    user: childNode.val().userName,
                    message: childNode.val().message,
                    timeSent: childNode.val().timeSent
                }
                conversation.push(message)
              })
              setConversation(conversation)
          })
    }

    displayConversation() {
        let { isLoaded, conversation } = this.state
        console.log(conversation)
        let chatDiv = <div id='mainChat' />
        
            {conversation.map((item) => {
                chatDiv.append(
                  <div>  
                    <Col xs='3' id={'username'}>{item.user}</Col> 
                    <Col xs='9'>{item.message}</Col>
                  </div>
                    )
                })}

        if (isLoaded === false) {
            return(<div>Loading {this.props.currentChat}...</div>)
        } else {
            return chatDiv
        }
    }

    sendMessage(e) {
        let { coordinates, currentChat, userInfo } = this.props.state

        e.preventDefault()
        firebase.database().ref().child(`${coordinates}/${currentChat}`).push({
            userName: userInfo.userName,
            timeSent: [moment().format('YYYY-MM-DD'), moment().format("HH:mm")],
            message: this.state.userInput
        });

    }

    render() {
        return(
            <Container>

                <Row className={'userChatDisplay'}>
                    {this.displayConversation()}
                </Row>

                <Row className={'userInput'}>
                    <Col xs='2'>
                        <Button onClick={(e) => {this.sendMessage(e)}}>Send</Button>
                    </Col>

                    <Col xs='10'>
                        <Form>
                            <FormGroup>
                                <Input type="text" name="userInput" value={this.state.userInput} onChange={this.handleUserInput} placeholder="say something..." />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>

                <Row>
                  <Button onClick={(e) => {this.props.exitChat()}} color="primary" >Leave Chat</Button>
                </Row>
            </Container>
        )
    }
    
}