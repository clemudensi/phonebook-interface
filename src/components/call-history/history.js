/**
 * Created by SLEEK on 12/9/2017.
 */
import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import Moment from 'react-moment';

class CallHistory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            histories: []
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
                    this.setState({id: id});
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
                <p>Phone number: {history.phone_number}</p>
                <p>Time: <Moment format="HH:mm">{history.time}</Moment></p>
                <button onClick={this.historyDelete.bind(this)}>Delete</button>
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