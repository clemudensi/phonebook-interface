/**
 * Created by SLEEK on 11/28/2017.
 */
import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Dialer from './dialer';
import '../../css/style.css';
import {Button} from 'react-materialize';
import ContactForm from "./contact-edit";
import PropTypes from 'prop-types';

class ContactView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
        };

        this.handleContactDelete = this.handleContactDelete.bind(this);
        this.renderContactAction = this.renderContactAction.bind(this);
    };

    componentDidMount(){
        let contact = 'http://localhost:5000/v1/contact/'+ this.props.id;
        let callHistory = 'http://localhost:5000/v1/call-history';
        axios.all([
            axios.get(contact),
            axios.get(callHistory)
        ])
            .then( axios.spread((contact, history) => {
                this.setState({contact: contact.data, history: history.data});
            }))
            .catch(function (error) {
                console.error(error);
            })
    }


    handleContactDelete () {
        const dbUrl = 'http://localhost:5000/v1/contact/' + this.props.id;
        if (confirm("Delete contact " + this.state.contact.name + "?")) {
            return (axios.delete(dbUrl)
                .then((response) => {
                    console.log(response);
                    this.setState({status: response.status, contactList: this.state.contactList});
                })
                .catch((error) =>{
                    console.log(error);
                }));
        }
        return false;
    };

    renderContactAction(){
        const {contact} = this.state;
        if(this.state.isEditing){
            return(
                <ContactForm contact={this.state.contact} {...this.props} onCancelClick={this.onCancelClick.bind(this)} />
            );
        }
        return contact ? (
                <div className="contact-list title">
                    <h1>{contact.name}</h1>
                    <p>{contact.address}</p>
                    <div>
                        {contact.phone_number}
                        <div className="floater">
                            <Dialer contact={this.state.contact} callHistory={this.state.history} {...this.props} />
                        </div>
                    </div>
                    <div className="contact-list contact-list-action">
                        <Button onClick={this.onEditClick.bind(this)}>Edit</Button>
                        <Button type="submit" onClick={this.handleContactDelete.bind(this)}>Delete</Button>
                    </div>
                </div>
        ) : (
            <div>Error: Contact doesn't exist</div>

        );
    };

    onEditClick(){
        this.setState({isEditing: true});
    };

    onCancelClick(){
        this.setState({isEditing: false});
    };

    render(){
        return(
            this.state.status ? <Redirect to="/" />
                : <div className="title">
                    {this.renderContactAction()}
                </div>
        )
    }
}

export default ContactView;

ContactView.propTypes = {
    id: PropTypes.string,
    contacts: PropTypes.array,
    contact: PropTypes.object,
    name: PropTypes.string,
    address: PropTypes.string,
    phone_number: PropTypes.string
};