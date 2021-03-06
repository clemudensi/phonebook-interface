/**
 * Created by SLEEK on 12/5/2017.
 */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class CreateContact extends React.Component{
    constructor(props) {
        super(props);
        this.state = { value: ''};
        this.state = {isEditing: false};
        this.handleCreateContact = this.handleCreateContact.bind(this);
    }

    handleCreateContact(){

        const db = 'http://localhost:5000/v1/new';

        const createContact = {
            name: this.refs.name.value,
            phone_number: this.refs.phone_number.value,
            address: this.refs.address.value
        };

        axios.post(db, createContact)
            .then( (response) =>{
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    clearForm() {
        this.refs.addForm.reset();
        this.refs.name.focus();
    }

    render(){
        return(
            <form ref="addForm" onSubmit={this.handleCreateContact.bind(this)} >
                Name: <input ref="name" type="text" placeholder="Type your name"/>
                <br/>
                Phone number: <input ref="phone_number" type="text" placeholder="Type your phone number"/>
                <br/>
                Address: <input ref="address" type="text" placeholder="Type your address"/>
                <br/>
                <button type="submit" className="btn btn-primary pull-right">Add Contact</button>
                <button type="button" className="btn btn-primary pull-left" onClick={this.clearForm.bind(this)}>Clear Form</button>
            </form>
        )
    }
}

export default CreateContact;

CreateContact.propTypes = {
    id: PropTypes.string,
    contacts: PropTypes.array,
    contact: PropTypes.object,
    name: PropTypes.string,
    address: PropTypes.string,
    phone_number: PropTypes.string
};