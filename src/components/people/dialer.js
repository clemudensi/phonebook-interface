/**
 * Created by SLEEK on 12/10/2017.
 */
import React from 'react';
import { Icon, Toast} from 'react-materialize';
import axios from 'axios';
import _ from 'lodash';

class Dialer extends React.Component{
    dialerAction(){
        const db = 'http://localhost:5000/v1/dialer/';
        const {contactList} = this.props;
        const contact = _.find(contactList, contact => '/contact/' + contact._id === window.location.pathname );

        const dialer = {
            name: contact.name,
            phone_number: contact.phone_number,
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

    render(){
        return(
            <div>
                <Toast rounded={true}  toast="Calling.....">
                    <div onClick={this.dialerAction.bind(this)}><Icon >phone</Icon></div>
                </Toast>
            </div>
        )
    }
}

export default Dialer;