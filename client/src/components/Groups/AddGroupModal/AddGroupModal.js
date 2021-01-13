import React, { Component } from 'react';
import { 
    Modal,
    Button,
    Form,
    FormGroup,
    Input,
    ModalHeader,
    ModalBody,
    Alert
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import Aux from '../../../hoc/Aux';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

import styles from './AddGroupModal.module.css';


class AddGroupModal extends Component {
    state = {
        showModal : false,
        groupName : '',
        msg: null
    }

    componentDidUpdate(prevProps){
        const { error } = this.props;
        if(error !== prevProps.error){
            //check for add group error
            if(error.id === 'ADD_GROUP_FAIL'){
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({showModal: !this.state.showModal});
    }

    onChange = event => {
        this.setState({ groupName : event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault();
        
        //Attempt to add group
        this.props.addGroup(this.state.groupName);

        //Close modal when authenticated
        if(this.props.isAuthenticated){
            this.toggle();
        }
    }
    
    render(){
        return(
            <Aux>
                <NavLink onClick={this.toggle}
                    to="#"
                    className={styles.navlinkText}
                >
                    Create Group
                </NavLink>
                <Modal
                    isOpen={this.state.showModal}
                    toggle={this.toggle}
                    >
                    <ModalHeader toggle={this.toggle}>Create new Group</ModalHeader>
                    <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={(event) => this.onSubmit(event)}>
                            <FormGroup>
                                <Input 
                                    type="text"
                                    name="group"
                                    placeholder="group"
                                    onChange={this.onChange}
                                    required
                                />
                            </FormGroup>
                            <Button
                                color="dark"
                                style={{martinTop: "2rem"}}
                                block
                            >
                                Create
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
        addGroup: (groupName) => dispatch(actions.addGroup(groupName)),
        clearErrors: () => dispatch(actions.clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupModal);