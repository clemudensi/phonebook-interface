/**
 * Created by SLEEK on 11/28/2017.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import '../../css/style.css';
import CreateContact from './create-contact';
import {Button, Icon} from "react-materialize";
import Clem from '../../../public/images/clem.jpg';
import PropTypes from 'prop-types';
import Search from "./search";

class ListExampleContacts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isCreating: false,
            search: '',
            contactList: this.props.contactList
        };
        this.renderContact = this.renderContact.bind(this);
        this.searchContacts = this.searchContacts.bind(this);
    }

    onCreateClick(){
        this.setState({isCreating: true});
    }

    onCancelClick(){
        this.setState({isCreating: false});
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.contactList !== this.props.contactList) {
            this.setState({contactList: nextProps.contactList});
        }
    };

    searchContacts(event){
        this.setState({search: event.target.value})
    };

    renderCreate(){
        if(this.state.isCreating){
           return(
               <div>
                   <p style={{textAlign: "right"}}>
                       <Button onClick={this.onCancelClick.bind(this)} className='red'
                               large style={{bottom: '15px', right: '8px'}} ><Icon center>cancel</Icon></Button>
                   </p>
                   <CreateContact {...this.props}/>
               </div>
           )
        }

        return(
            <div>
                <p style={{textAlign: "right"}}>
                <Button onClick={this.onCreateClick.bind(this)} className='green'
                        large style={{bottom: '15px', right: '8px'}} ><Icon center>book</Icon></Button>
                </p>
                <Search searchContacts={this.searchContacts.bind(this)} contactList={this.state.contactList} value={this.state.value}/>
                <List>
                    {this.renderContact()}
                </List>
            </div>
        )
    }

    renderContact(){
        const searchContact = _.filter(this.state.contactList, (contact => {return contact.name.toLowerCase().indexOf(this.state.search) !== -1}));

        return _.map(searchContact, (contact, key) => <ListItem
                                                                            key={key}
                                                                            insetChildren={true}
                                                                            rightAvatar={<Avatar src={Clem} />}
                                                                            >
            <Link style={{paddingLeft: 13, textDecoration: 'none'}} to={{pathname: `contact/${contact._id}`, query: { id: contact._id }}} >
                {contact.name}
            </Link></ListItem> );
    }

    render(){
        return (
            <div>
                {this.renderCreate()}
                <Divider inset={true} />
            </div>
        );
    }
}

export default ListExampleContacts;

ListExampleContacts.propTypes = {
    id: PropTypes.string,
    contactList: PropTypes.array,
    contact: PropTypes.object,
    name: PropTypes.string,
    isCreating: PropTypes.bool
};