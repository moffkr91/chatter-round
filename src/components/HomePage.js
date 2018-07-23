import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Container>
                <h1>Landing Page</h1>
                <Link to='/'>
                    <Button color="primary" >To Landing</Button>
                </Link>
            </Container>
        )
    }
}