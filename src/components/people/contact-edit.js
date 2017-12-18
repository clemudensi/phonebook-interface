/**
 * Created by SLEEK on 12/14/2017.
 */
import React from 'react';
import {Button} from "react-materialize";
import axios from 'axios';
import ContactView from "./contact-view-items";

class ContactForm extends React.Component{
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
        this.state = {
            isEditing: true,
            contact: '',
            value: this.state
        };
    }


    handleContactUpdate() {
        //sends the comment id and new author/text to our api
        // ev.preventDefault();

        let db = 'http://localhost:5000/v1/contact/' + this.props.id;
        let contactUpdate = {
            name: this.refs.name.value,
            phone_number: this.refs.phone_number.value,
            address: this.refs.address.value
        };

        axios.put(db, contactUpdate)
            .then( (response) => {
                this.setState({isEditing: false});
                console.log(response);
            })
            .catch( (error) => {
                console.log(error);
            });

    }

    onCancelClick(){
        this.setState({isEditing: false});
    }

    // handleChange(event) {
    //     this.setState({value: event.target.value});
    // }

    render() {
        console.log(this.state.contact, 'Shalala')
        if (this.state.isEditing) {
            const contact = this.props.contact;
            return (
                <div>
                    <form onSubmit={this.handleContactUpdate.bind(this)}>
                        Name: <input type="text" defaultValue={contact.name} ref="name"/>
                        <br/>
                        Phone number: <input type="text" defaultValue={contact.phone_number} ref="phone_number"/>
                        <br/>
                        Address: <input type="text" defaultValue={contact.address} ref="address"/>
                    </form>
                    <div className="contact-list">
                        <Button onClick={this.handleContactUpdate.bind(this)}>Save</Button>
                        <Button onClick={this.onCancelClick.bind(this)}>Cancel</Button>
                    </div>
                </div>
            )
        }
        return (
            <ContactView {...this.props} />
        )
    }
}

export default ContactForm;
