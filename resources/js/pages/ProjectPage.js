import React, {Component, Fragment} from 'react';
import SideBar from '../components/SideBar';

class ProjectPage extends Component {
    render() {
        return (
            <Fragment>
            	<SideBar title="Projects">
                	<h1>This is project page</h1>
                </SideBar>
            </Fragment>
        );
    }
}

export default ProjectPage;
