import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../pages/HomePage';
import Course from '../pages/CoursePage';
import Contact from '../pages/ContactPage';
import Project from '../pages/ProjectPage';
import Review from '../pages/ReviewPage';
import Service from '../pages/ServicePage';
import ChangePassword from '../pages/ChangePassword';
import NotFound from '../pages/NotFound';

class Routes extends Component {
    render() {
        return (
            <Fragment>
            <Switch>
                <Route exact path="/" render={(props)=> <Home {...props} key={ Date.now() } />} />
                <Route exact path="/contact" render={(props)=> <Contact {...props} key={ Date.now() } />} />
                <Route exact path="/course" render={(props)=> <Course {...props} key={ Date.now() } />} />
                <Route exact path="/project" render={(props)=> <Project {...props} key={ Date.now() } />} />
                <Route exact path="/review" render={(props)=> <Review {...props} key={ Date.now() } />} />
                <Route exact path="/services" render={(props)=> <Service {...props} key={ Date.now() } />} />
                <Route exact path="/changePassword" render={(props)=> <ChangePassword {...props} key={ Date.now() } />} />
               	<Route exact component={NotFound}/>
            </Switch>
            </Fragment>
        );
    }
}

export default Routes;
