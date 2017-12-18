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

class ListExampleContacts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isCreating: false,
            contactList: this.props.contactList
        };
        this.renderContact = this.renderContact.bind(this);
    }

    onCreateClick(){
        this.setState({isCreating: true});
    }

    onCancelClick(){
        this.setState({isCreating: false});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({contactList: nextProps.contactList});
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
                <List>
                    {this.renderContact()}
                </List>
            </div>
        )
    }

    renderContact(){
        return _.map(this.state.contactList, (contact, key) => <ListItem
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