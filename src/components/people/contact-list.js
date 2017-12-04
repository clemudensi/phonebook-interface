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

class ListExampleContacts extends React.Component {
    renderContact(){
        return _.map(this.props.contactlist.contacts, (contact, key) => <ListItem
                                                                                key={key}
                                                                                insetChildren={true}
                                                                                rightAvatar={<Avatar src="images/chexee-128.jpg" />}
                                                                                >
            <Link style={{paddingLeft: 13, textDecoration: 'none'}} to={{pathname: `contact/${contact.phone_number}`, query: { id: contact.id }}} >
                {contact.name}
            </Link></ListItem> );
    }


    render(){
        console.log(this.props.contactlist, 'PROPS');
        console.log(this.renderContact(), "CONT")
        return (
            <div>
                <List>
                    {this.renderContact()}
                </List>
                <Divider inset={true} />
            </div>
        );
    }
}

export default ListExampleContacts;