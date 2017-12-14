/**
 * Created by SLEEK on 11/28/2017.
 */
import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Dialer from './dialer';
import '../../css/style.css';
import {Button} from 'react-materialize';

class ContactView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
        };

        this.handleContactUpdate = this.handleContactUpdate.bind(this);
        this.handleContactDelete = this.handleContactDelete.bind(this);
        this.renderButtonAction = this.renderButtonAction.bind(this);
        this.renderContactAction = this.renderContactAction.bind(this);
    }


    handleContactUpdate(ev) {
        //sends the comment id and new author/text to our api
        ev.preventDefault();

        const db = 'http://localhost:5000/v1/contact/' + this.props.id;
        const createContact = {
            name: this.refs.name.value,
            phone_number: this.refs.phone_number.value,
            address: this.refs.address.value
        };

        axios.put(db, createContact)
            .then( (response) => {
                this.setState({isEditing: false, contact: createContact});
                console.log(response);
                console.log(this.state.contact);
            })
            .catch( (error) => {
                console.log(error);
            });
    }

    handleContactDelete() {
        //sends the comment id and new author/text to our api
        const dbUrl = 'http://localhost:5000/v1/contact/' + this.props.id;
        if (confirm("Delete contact " + this.state.name + "?")) {
            return (axios.delete(dbUrl)
                .then((response) => {
                    console.log(response);
                    this.setState({status: response.status, contact: this.state.contact});
                })
                .catch((error) =>{
                    console.log(error);
                }));
        }
        return false;
    }

    // dialerAction(){
    //     const db = 'http://localhost:5000/v1/dialer/' + this.props.id;
    //
    //     const dialer = {
    //         name: this.state.name,
    //         phone_number: this.state.phone,
    //         time: new Date()
    //     };
    //
    //     axios.post(db, dialer)
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //     this.setState({isEditing: false});
    // }


    renderContactAction(){
        const {contactList} = this.props;
        const contact = _.find(contactList, contact => '/contact/' + contact._id === window.location.pathname );
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
                <div className="contact-list">
                    <h1>{contact.name}</h1>
                    <p>{contact.address}</p>
                    <div>
                        {contact.phone_number}
                        <div className="floater"><Dialer contactList={this.props.contactList}/></div>
                    </div>
                </div>
        ) : (
            <div>Error: Contact doesn't exist</div>

        );
    }

    renderButtonAction(){
        if(this.state.isEditing){
            return(
                <div className="contact-list">
                    <Button onClick={this.handleContactUpdate.bind(this)}>Save</Button>
                    <Button onClick={this.onCancelClick.bind(this)}>Cancel</Button>
                </div>
            );
        }

        return(
            <div className="contact-list contact-list-action">
                <Button onClick={this.onEditClick.bind(this)}>Edit</Button>
                <Button onClick={this.handleContactDelete.bind(this)}>Delete</Button>
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