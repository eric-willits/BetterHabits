import React, { Component } from 'react';
import { 
    Modal,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    ModalHeader,
    ModalBody,
    Alert
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';


class LoginModal extends Component {
    state = {
        showModal : false,
        username : '',
        password : '',
        msg: null
    }

    componentDidUpdate(prevProps){
        const { error } = this.props;
        if(error !== prevProps.error){
            //check for register error
            if(error.id === 'LOGIN_FAIL'){
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        //If authenticated, close modal
        if(this.state.showModal){
            if(this.props.isAuthenticated){
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({showModal: !this.state.showModal});
    }

    onChange = event => {
        this.setState({ [event.target.name] : event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault();

        //Create new user object
        const user = {
            username: this.state.username,
            password: this.state.password
        };

        //Attempt to login
        this.props.login(user);
    }
    
    render(){
        return(
            <Aux>
                <NavLink onClick={this.toggle} to="#">
                    Login
                </NavLink>
                <Modal
                    isOpen={this.state.showModal}
                    toggle={this.toggle}
                    >
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={(event) => this.onSubmit(event)}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input 
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <Button
                                color="dark"
                                style={{martinTop: "2rem"}}
                                block
                            >
                                Login
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(actions.login(user)),
        clearErrors: () => dispatch(actions.clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);