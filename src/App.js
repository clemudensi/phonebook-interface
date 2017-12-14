import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tabscreen from './components/tabscreen'
import {Route, Switch } from 'react-router-dom';
import ContactView from './components/people/contact-view-items';
import Dialer from './components/people/dialer';
import axios from "axios";
import './css/style.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactList: [],
            callHistory: []
        }
    }

    componentDidMount(){
        let contactList = 'http://localhost:5000/v1/contacts';
        let callHistory = 'http://localhost:5000/v1/call-history';
        axios.all([
            axios.get(contactList),
            axios.get(callHistory)
        ])
            .then( axios.spread((list, history) => {
                console.log(list.data, 'RD');
                console.log(history.data, 'HD');
                this.setState({contactList: list.data, callHistory: history.data});
            }))
            .catch(function (error) {
                 console.error(error);
                 })
            }


      render() {
        return (
            <Switch>
                <Route exact path="/contact/:id"
                       component={(props)=> <ContactView contactList={this.state.contactList}
                                                         callHistory={this.state.callHistory}
                                                         id={props.match.params.id}  />} />
                <Route path="/"
                       render={()=> <MuiThemeProvider ><Tabscreen
                           contactList={this.state.contactList}
                           callHistory={this.state.callHistory} /></MuiThemeProvider>} />
            </Switch>

        );
      }
}

export default App;
