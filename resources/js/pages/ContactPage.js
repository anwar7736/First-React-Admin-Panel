import React, {Component, Fragment} from 'react';
import SideBar from '../components/SideBar';

class ContactPage extends Component {
    render() {
        return (
            <Fragment>
                <SideBar title="Contact">
                	<h1>This is contact page</h1>
                </SideBar>
            </Fragment>
        );
    }
}

export default ContactPage;
