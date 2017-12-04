import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tabscreen from './components/tabscreen'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ContactView from './components/people/contact-view';
import axios from "axios";
import './css/style.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactlist: []
        }
    }

    componentWillMount(){
        let contacts = 'http://www.mocky.io/v2/581335f71000004204abaf83';
        axios.get(contacts)
            .then( (response)=> {
                console.log(response.data);
                this.setState({contactlist: response.data});
            })
            .catch(function (error) {
                console.error(error);
            });
    }


  render() {
      // console.log(this.props.location, 'PH')
    return (
        <div>
            <BrowserRouter history={history}>
                <Switch>
                    <Route path="/contact" render={()=> <ContactView contactlist={this.state.contactlist} />} />
                        <div className="title">
                            <Route path="/" render={()=> <MuiThemeProvider ><Tabscreen contactlist={this.state.contactlist}/></MuiThemeProvider>} />
                        </div>
                </Switch>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;
