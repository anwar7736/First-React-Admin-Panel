import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../pages/HomePage';
import Course from '../pages/CoursePage';
import Contact from '../pages/ContactPage';
import Project from '../pages/ProjectPage';
import Review from '../pages/ReviewPage';
import Service from '../pages/ServicePage';
import NotFound from '../pages/NotFound';

class Routes extends Component {
    render() {
        return (
            <Fragment>
            <Switch>
               	<Route exact path="/" component={Home}/>
               	<Route exact path="/contact" component={Contact}/>
               	<Route exact path="/course" component={Course}/>
               	<Route exact path="/project" component={Project}/>
               	<Route exact path="/review" component={Review}/>
                <Route exact path="/services" component={Service}/>
               	<Route exact component={NotFound}/>
            </Switch>
            </Fragment>
        );
    }
}

export default Routes;
