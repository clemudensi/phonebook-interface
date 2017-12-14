/**
 * Created by SLEEK on 12/9/2017.
 */
import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import Moment from 'react-moment';
import {Button} from 'react-materialize';
import '../../css/style.css';

class CallHistory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: []
        }
}

    historyDelete(){
        const {callHistory} = this.props;
        const  id = _.find(callHistory, history => {return history._id === history._id})._id;
        const dbUrl = 'http://localhost:5000/v1/dialer/' + id;

        if (confirm("Delete contact " + this.state.name + "?")) {
            return (axios.delete(dbUrl)
                .then((response) => {
                    console.log(response);
                    this.setState({clicked: true});
                })
                .catch((error) =>{
                    console.log(error);
                }));
        }
        return false;
    }

    renderHistory(){
        return _.map(this.props.callHistory, (history, key) =>

            <div key={key}>
                <h4>Name: {history.name} </h4>
                <div>
                    <p>Phone number: {history.phone_number}</p>
                    <div className="floater">Time: <Moment format="DD/MM HH:mm">{history.time}</Moment></div>
                </div>
                <div className="contact-list-action">
                    <Button onClick={this.historyDelete.bind(this)}>Delete</Button>
                </div>

            </div>
        );
    }


    render(){
       return(
           <div>
               {this.renderHistory()}
           </div>
       )
    }
}

export default CallHistory;