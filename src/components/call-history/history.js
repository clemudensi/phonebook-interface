/**
 * Created by SLEEK on 12/9/2017.
 */
import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import Moment from 'react-moment';
import {Button} from 'react-materialize';
import '../../css/style.css';
import PropTypes from 'prop-types';

class CallHistory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: []
        };
    }

    historyDelete(key){
        const callHistory = this.props.callHistory[key];
        const id = callHistory._id;
        const dbUrl = 'http://localhost:5000/v1/dialer/' + id;

        if (confirm("Delete contact " + callHistory.name + "?")) {
            return (axios.delete(dbUrl)
                .then((response) => {
                    console.log(response);
                    this.setState({history: this.state.history});
                    this.setState({status: response.status});
                })
                .catch((error) =>{
                    console.log(error);
                }));
        }
        return false;
    }

    refreshDelete(){
        window.location.reload(true);
    }

    renderHistory(){
        return _.map(this.props.callHistory, (history, key) =>

            <div key={key}>
                <h4>Name: {history.name} </h4>
                <div>
                    <p>Phone number: {history.phone_number}</p>
                    <div className="floater">Time: <Moment format="DD/MM HH:mm">{history.time}</Moment></div>
                </div>
                <Button onClick={()=> this.historyDelete(key) }>Delete</Button>
            </div>
        );
    }

    render(){
       return(
           this.state.status ? this.refreshDelete()
           : <div>
               {this.renderHistory()}
            </div>
       )
    }
}

export default CallHistory;

CallHistory.propTypes = {
    id: PropTypes.string,
    history: PropTypes.array,
    contactList: PropTypes.object,
    name: PropTypes.string,
    address: PropTypes.string,
    phone_number: PropTypes.string
};