import React, {Component, Fragment} from 'react';
import SideBar from '../components/SideBar';

class HomePage extends Component {
    render() {
        return (
            <Fragment>
            	<SideBar title="Home">
                		<h1>This is home page</h1>
                </SideBar>
            </Fragment>
        );
    }
}

export default HomePage;
