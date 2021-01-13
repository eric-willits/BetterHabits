import React, { Component } from 'react';
import { 
    Modal,
    Button,
    Form,
    FormGroup,
    Input,
    ModalHeader,
    ModalBody,
    Nav,
    NavItem,
    NavLink,
    Alert,
    TabContent,
    TabPane
} from 'reactstrap';



import Aux from '../../../hoc/Aux';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './AddHabitModal.module.css';


class AddHabitModal extends Component {
    state = {
        showModal : false,
        activeTab : "habit",
        habitName : '',
        userName : '',
        msg: null
    }

    componentDidUpdate(prevProps){
        const { error } = this.props;
        if(error !== prevProps.error){
            //check for add group error
            if(error.id === 'ADD_HABIT_TO_GROUP_FAIL'){
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    setActiveTab = tabName => {
        this.setState({activeTab: tabName});
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({showModal: !this.state.showModal});
    }

    onChange = (event, propName) => {
        this.setState({ [propName] : event.target.value })
    }

    onSubmit = (event, tabName) => {
        event.preventDefault();

        if(tabName === "habit") {
            //Attempt to add habit to group
            this.props.addHabit({name: this.state.habitName, groupId: this.props.groupId});
        } else {
            //Attempt to add user to group
            this.props.addUser(this.state.userName, this.props.groupId);
        }
        //Close modal when authenticated
        if(this.props.isAuthenticated){
            this.toggle();
        }
    }

    onDelete = () => {
        this.props.deleteGroup(this.props.groupId);
        this.toggle();
    }
    
    render(){
        return(
            <Aux>
                <NavLink onClick={this.toggle} href="#" className={styles.navlinkText}>
                    {this.props.name}
                </NavLink>
                <Modal
                    isOpen={this.state.showModal}
                    toggle={this.toggle}
                    >
                        <Nav tabs>
                            <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'habit' })}
                                onClick={() => this.setActiveTab('habit')}
                            >
                                Habit
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'user' })}
                                onClick={() => this.setActiveTab('user')}
                            >
                                User
                            </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="habit">
                                <ModalHeader toggle={this.toggle}>Add habit to {this.props.name}</ModalHeader>
                                <ModalBody>
                                {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                                    <Form onSubmit={(event) => this.onSubmit(event, "habit")}>
                                        <FormGroup>
                                            <Input 
                                                type="text"
                                                name="habit"
                                                placeholder="habit"
                                                onChange={(event) => this.onChange(event, "habitName")}
                                                required
                                            />
                                        </FormGroup>
                                        <Button
                                            color="dark"
                                            style={{martinTop: "2rem"}}
                                            block
                                        >
                                            Add
                                        </Button>
                                    </Form>
                                </ModalBody>
                            </TabPane>
                            <TabPane tabId="user">
                                <ModalHeader toggle={this.toggle}>Add user to {this.props.name}</ModalHeader>
                                <ModalBody>
                                {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                                    <Form onSubmit={(event) => this.onSubmit(event, "user")}>
                                        <FormGroup>
                                            <Input 
                                                type="text"
                                                name="user"
                                                placeholder="user"
                                                onChange={(event) => this.onChange(event, "userName")}
                                                required
                                            />
                                        </FormGroup>
                                        <Button
                                            color="dark"
                                            style={{martinTop: "2rem"}}
                                            block
                                        >
                                            Add
                                        </Button>
                                    </Form>
                                </ModalBody>
                            </TabPane>
                        </TabContent>
                        <div style={{"display":"flex"}}>
                            <Button outline color="danger" onClick={this.onDelete} style={{"width":"25%", "marginLeft":"auto"}}>Delete Group</Button>
                        </div>
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
        clearErrors: () => dispatch(actions.clearErrors()),
        deleteGroup: (groupId) => dispatch(actions.deleteGroup(groupId)),
        addHabit: (data) => dispatch(actions.addHabitToGroup(data)),
        addUser: (userName, groupId) => dispatch(actions.addUser(userName, groupId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHabitModal);