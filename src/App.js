import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tabscreen from './components/tabscreen'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import ContactView from './components/people/contact-view';
import _ from 'lodash';
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

    componentWillMount(){
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
      // const location = _.omit(location);
    return (
            <BrowserRouter>
                <Switch>
                    <Route path="/contact" component={()=> <ContactView contactlist={this.state.contactList} callHistory={this.state.callHistory} />} />
                    <Route path="/" render={()=> <MuiThemeProvider ><Tabscreen contactlist={this.state.contactList} callHistory={this.state.callHistory} /></MuiThemeProvider>} />
                </Switch>
            </BrowserRouter>
    );
  }
}

export default App;
