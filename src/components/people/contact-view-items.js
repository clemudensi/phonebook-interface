/**
 * Created by SLEEK on 11/28/2017.
 */
import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Dialer from './dialer';
import '../../css/style.css';
import {Button} from 'react-materialize';
import ContactForm from "./contact-edit";
import _ from 'lodash'

class ContactView extends React.Component{

    constructor(props){
        super(props);
        // const {contactList} = this.props;
        // const contact = _.find(contactList, contact => '/contact/' + contact._id === window.location.pathname );
        this.state = {
            isEditing: false,
        };

        // this.handleContactUpdate = this.handleContactUpdate.bind(this);
        this.handleContactDelete = this.handleContactDelete.bind(this);
        // this.renderButtonAction = this.renderButtonAction.bind(this);
        this.renderContactAction = this.renderContactAction.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount(){
        let contact = 'http://localhost:5000/v1/contact/'+ this.props.id;
        let callHistory = 'http://localhost:5000/v1/call-history';
        let contactList = 'http://localhost:5000/v1/contacts';
        axios.all([
            axios.get(contact),
            axios.get(callHistory),
            axios.get(contactList)
        ])
            .then( axios.spread((contact, history, list) => {
                console.log(contact.data, 'RD');
                console.log(history.data, 'HD');
                console.log(list.data, 'LD');
                this.setState({contact: contact.data, history: history.data});
                this.setState({clicked: true});
            }))
            .catch(function (error) {
                console.error(error);
            })
    }

    // handleContactUpdate() {
    //     //sends the comment id and new author/text to our api
    //     // ev.preventDefault();
    //
    //     let db = 'http://localhost:5000/v1/contact/' + this.props.id;
    //     let contactUpdate = {
    //         name: this.refs.name.value,
    //         phone_number: this.refs.phone_number.value,
    //         address: this.refs.address.value
    //     };
    //
    //     axios.put(db, contactUpdate)
    //         .then( (response) => {
    //             this.setState({isEditing: false, value: contactUpdate});
    //             console.log(response);
    //             console.log(this.state.contact);
    //         })
    //         .catch( (error) => {
    //             console.log(error);
    //         });
    // }

    // handleChange(event) {
    //     this.setState({value: event.target.value});
    // }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.contactList !== this.props.contactList) {
    //         this.setState({contactList: nextProps.contactList});
    //     }
    // };

    handleContactDelete () {
        //sends the comment id and new author/text to our api
        // const dbUrl1 = 'http://localhost:5000/v1/contacts'
        const dbUrl = 'http://localhost:5000/v1/contact/' + this.props.id;
        if (confirm("Delete contact " + this.state.contact.name + "?")) {
            return (axios.delete(dbUrl)
                .then((response) => {
                    console.log(response);
                    this.setState({status: response.status, contactList: this.state.contactList});
                    // this.setState((state) => ({ contactList: state.contactList }));
                })
                .catch((error) =>{
                    console.log(error);
                }));
        }
        return false;
    };

    renderContactAction(){
        const contact = this.state.contact;
        if(this.state.isEditing){
            return(
                <ContactForm contact={this.state.contact} {...this.props} onCancelClick={this.onCancelClick.bind(this)} />
            );
        }
        return contact ? (
                <div className="contact-list">
                    <h1>{contact.name}</h1>
                    <p>{contact.address}</p>
                    <div>
                        {contact.phone_number}
                        <div className="floater">
                            <Dialer contact={this.state.contact} callHistory={this.state.history} {...this.props} />
                        </div>
                    </div>
                    <div className="contact-list contact-list-action">
                        <Button onClick={this.onEditClick.bind(this)}>Edit</Button>
                        <Button type="submit" onClick={this.handleContactDelete.bind(this)}>Delete</Button>
                    </div>
                </div>
        ) : (
            <div>Error: Contact doesn't exist</div>

        );
    };

    // renderButtonAction(){
    //     if(this.state.isEditing){
    //         return(
    //             <div className="contact-list">
    //                 <Button onClick={this.handleContactUpdate.bind(this)}>Save</Button>
    //                 <Button onClick={this.onCancelClick.bind(this)}>Cancel</Button>
    //             </div>
    //         );
    //     }
    //
    //     return(
    //         <div className="contact-list contact-list-action">
    //             <Button onClick={this.onEditClick.bind(this)}>Edit</Button>
    //             <Button onClick={this.handleContactDelete.bind(this)}>Delete</Button>
    //         </div>
    //     );
    // }

    onEditClick(){
        this.setState({isEditing: true});
    };

    onCancelClick(){
        this.setState({isEditing: false});
    };

    render(){
        // console.log(this.state.contactList, 'Contct List')
        // console.log(this.state.contact, 'REfresged', this.props.id);
        return(
            this.state.status ? <Redirect to="/" />
                : <div className="title">
                    {this.renderContactAction()}
                    {/*{this.renderButtonAction()}*/}
                </div>
        )
    }
}

export default ContactView;