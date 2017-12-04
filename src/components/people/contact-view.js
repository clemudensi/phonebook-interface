/**
 * Created by SLEEK on 11/28/2017.
 */
import React from 'react';
import _ from 'lodash';
import '../../css/style.css';

class ContactView extends React.Component{
    render(){
        const {contactlist} = this.props;
        const contact = _.find(contactlist.contacts, contact => '/contact/' + contact.phone_number === window.location.pathname );
        console.log(contact);
        console.log(this.props.location, 'PL');
        console.log(window.location.pathname, 'THIS-PROPS');
        return contact ? (

            <div>
                <h1>{contact.name}</h1>
                <p>{contact.phone_number}</p>
                <p>{contact.address}</p>
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        ) : (
            <div>Error: Contact doesn't exist</div>
        );
    }
}

export default ContactView;