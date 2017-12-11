/**
 * Created by SLEEK on 11/28/2017.
 */
import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import _ from 'lodash';
// import ContactView from './contact-view';
import { Link, Route } from 'react-router-dom';
import '../../css/style.css';
// import {pinkA200, transparent} from 'material-ui/styles/colors';
import CreateContact from './create-contact';

class ListExampleContacts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isCreating: false
        }
    }

    onCreateClick(){
        this.setState({isCreating: true});
    }

    onCancelClick(){
        this.setState({isCreating: false});
    }

    renderCreate(){
        if(this.state.isCreating){
           return(
               <div>
                   <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                   <CreateContact/>
               </div>
           )
        }

        return(
            <div>
                <button onClick={this.onCreateClick.bind(this)}>Create Contact</button>
            </div>
        )
    }

    renderContact(){
        return _.map(this.props.contactlist, (contact, key) => <ListItem
                                                                                key={key}
                                                                                insetChildren={true}
                                                                                rightAvatar={<Avatar src="public/images/clem.jpg" />}
                                                                                >
            <Link style={{paddingLeft: 13, textDecoration: 'none'}} to={{pathname: `contact/${contact.phone_number}`}} >
                {contact.name}
            </Link></ListItem> );
    }

    render(){
        return (
            <div>
                {this.renderCreate()}
                <List>
                    {this.renderContact()}
                </List>
                <Divider inset={true} />
            </div>
        );
    }
}

export default ListExampleContacts;