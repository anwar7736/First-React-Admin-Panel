import React, {Component, Fragment} from 'react';
import SideBar from '../components/SideBar';
class ReviewPage extends Component {
    render() {
        return (
            <Fragment>
            	<SideBar title="Review">
                	<h1>This is review page</h1>
                </SideBar>
            </Fragment>
        );
    }
}

export default ReviewPage;
