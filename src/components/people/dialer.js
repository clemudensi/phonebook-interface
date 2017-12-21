/**
 * Created by SLEEK on 12/10/2017.
 */
import React from 'react';
import { Icon, Toast} from 'react-materialize';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

class Dialer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            callHistory: []
        };
        this.dialerAction = this.dialerAction.bind(this);
    }

    dialerAction(){
        const db = 'http://localhost:5000/v1/dialer/';
        const {contact} = this.props;

        const dialer = {
            name: contact.name,
            phone_number: contact.phone_number,
            time: new Date()
        };

        axios.post(db, dialer)
            .then( (response)=> {
               this.setState({status: response.status, callHistory: this.props.callHistory});
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    refreshDelete(){
        window.location.reload(true);
    }

    render(){
        return(
            this.state.status ? [this.refreshDelete(), <Redirect to="/" /> ]
                : <div>
                    <Toast rounded={true}  toast={"Calling.... " + this.props.contact.name}>
                        <div onClick={this.dialerAction.bind(this)}><Icon >phone</Icon></div>
                    </Toast>
                </div>
            )
        }
    }

export default Dialer;

Dialer.propTypes = {
    id: PropTypes.string,
    callHistory: PropTypes.array,
    contact: PropTypes.object,
    name: PropTypes.string,
    address: PropTypes.string,
    phone_number: PropTypes.string
};