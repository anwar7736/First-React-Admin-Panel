import React, {Component, Fragment} from 'react';
import SideBar from '../components/SideBar';
class ServicePage extends Component {
    render() {
        return (
            <Fragment>
            	<SideBar title="Services">
                	<h1>This is service page</h1>
                </SideBar>
            </Fragment>
        );
    }
}

export default ServicePage;
