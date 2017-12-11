/**
 * Created by SLEEK on 11/28/2017.
 */
import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Dialer from './dialer';
import '../../css/style.css';

class ContactView extends React.Component{

    constructor(props){
        super(props);
        const {contactlist} = this.props;
        const contact = _.find(contactlist, contact => '/contact/' + contact.phone_number === window.location.pathname );
        const id = contact._id;
        const name = contact.name;
        const phone = contact.phone_number;
        this.state = {
            isEditing: false,
            id,
            name,
            phone
        };

        this.handleContactUpdate = this.handleContactUpdate.bind(this);
        this.handleContactDelete = this.handleContactDelete.bind(this);
        this.renderButtonAction = this.renderButtonAction.bind(this);
        this.renderContactAction = this.renderContactAction.bind(this);
    }

    handleContactUpdate(ev) {
        //sends the comment id and new author/text to our api
        ev.preventDefault();

        const db = 'http://localhost:5000/v1/contact/' + this.state.id;
        const createContact = {
            name: this.refs.name.value,
            phone_number: this.refs.phone_number.value,
            address: this.refs.address.value
        };

        axios.put(db, createContact)
            .then( (response) => {
                this.setState({isEditing: false});
                console.log(response);
            })
            .catch( (error) => {
                console.log(error);
            });
    }

    handleContactDelete() {
        //sends the comment id and new author/text to our api
        const dbUrl = 'http://localhost:5000/v1/contact/' + this.state.id;
        if (confirm("Delete contact " + this.state.name + "?")) {
            return (axios.delete(dbUrl)
                .then((response) => {
                    console.log(response);
                    this.setState({status: response.status, clicked: true});
                })
                .catch((error) =>{
                    console.log(error);
                }));
        }
        return false;
    }

    dialerAction(){
        const db = 'http://localhost:5000/v1/dialer/';

        const dialer = {
            name: this.state.name,
            phone_number: this.state.phone,
            time: new Date()
        };

        axios.post(db, dialer)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({isEditing: false});
    }


    renderContactAction(){
        const {contactlist} = this.props;
        const contact = _.find(contactlist, contact => '/contact/' + contact.phone_number === window.location.pathname );
        if(this.state.isEditing){
            return(
                <form onSubmit={this.handleContactUpdate.bind(this)}>
                    Name: <input type="text" defaultValue={contact.name} ref="name" />
                    <br/>
                    Phone number: <input type="text" defaultValue={contact.phone_number} ref="phone_number" />
                    <br/>
                    Address: <input type="text" defaultValue={contact.address} ref="address" />
                </form>
            )
        }
        return contact ? (
            <span>
                <h1>{contact.name}</h1>
                <span>
                    <p>{contact.phone_number}</p>
                    <Dialer dialerAction={this.dialerAction.bind(this)}/>
                </span>
                <p>{contact.address}</p>
            </span>
        ) : (
            <div>Error: Contact doesn't exist</div>
        );
    }

    renderButtonAction(){
        if(this.state.isEditing){
            return(
                <div>
                    <button onClick={this.handleContactUpdate.bind(this)}>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </div>
            );
        }

        return(
            <div>
                <button onClick={this.onEditClick.bind(this)}>Edit</button>
                <button onClick={this.handleContactDelete.bind(this)}>Delete</button>
            </div>
        );
    }

    onEditClick(){
        this.setState({isEditing: true});
    }

    onCancelClick(){
        this.setState({isEditing: false});
    }

    render(){
        return(
            this.state.status ? <Redirect to="/"/>
                : <div className="title">
                    {this.renderContactAction()}
                    {this.renderButtonAction()}
                </div>
        )
    }
}

export default ContactView;