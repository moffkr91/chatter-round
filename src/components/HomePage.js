import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: ''
        }
        this.getSessid = this.getSessid.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
    }

    componentWillMount() {
        this.getSessid()
    }

    getSessid() {
        let sessid = document.cookie.split('=')
        if (sessid[0] === 'sessid'){
            this.getUserInfo(sessid[1])
        } else if (sessid === undefined) {
            this.props.history.push('/')
        }
    }

    getUserInfo(sessid) {
        fetch('/get_user', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessid: sessid
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    userInfo: responseJson.response
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return(
            <Container>
                <h1>Welcome {this.state.userInfo.username}</h1>
                <Link to='/'>
                    <Button color="primary" >To Landing</Button>
                </Link>
            </Container>
        )
    }
}