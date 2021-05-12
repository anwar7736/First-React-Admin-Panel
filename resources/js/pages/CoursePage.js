import React, {Component, Fragment} from 'react';
import SideBar from '../components/SideBar';

class CoursePage extends Component {
    render() {
        return (
            <Fragment>
            	<SideBar title="Courses">
               	 	<h1>This is course page</h1>
                </SideBar>
            </Fragment>
        );
    }
}

export default CoursePage;
