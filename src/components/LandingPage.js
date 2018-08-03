import React, { Component } from 'react';
import { Login, SignUp } from './landingPage/index'
import { Container, Row, Col, Button } from 'reactstrap';

export default class LandingPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Container>
              <Row>
                <Col>
                <h1>Chatter Round</h1>
                </Col>
              </Row>
              <SignUp history={this.props.history} />
              <Login history={this.props.history} />
            </Container>
        )
    }
}