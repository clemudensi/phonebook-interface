/**
 * Created by SLEEK on 11/28/2017.
 */
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import ContactList from './people/contact-list';
import FontIcon from "material-ui/FontIcon";

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};
function handleActive(tab) {
    alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

class TabsExampleSimple extends React.Component{

    render(){
        console.log(this.props.contactlist, 'TABSCREEN');
        return (
            <div className="title">
                <Tabs>
                    <Tab
                        icon={<FontIcon className="material-icons">phone</FontIcon>}
                        label="Dailer" >
                        <div>
                            <h2 style={styles.headline}>Tab One</h2>
                            <p>
                                This is an example tab.
                            </p>
                            <p>
                                You can put any sort of HTML or react component in here. It even keeps the component state!
                            </p>
                            <Slider name="slider0" defaultValue={0.5} />
                        </div>
                    </Tab>
                    <Tab
                        icon={<FontIcon className="material-icons">contact</FontIcon>}
                        label="Call History" >
                        <div>
                            <h2 style={styles.headline}>Tab Two</h2>
                            <p>
                                This is another example tab.
                            </p>
                        </div>
                    </Tab>
                    <Tab
                        icon={<FontIcon className="material-icons">people</FontIcon>}
                        label="People"
                        data-route="/home"
                        onActive={this.handleActive}
                    >
                        <ContactList contactlist={this.props.contactlist}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}


export default TabsExampleSimple;

