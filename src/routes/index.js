import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Home from '../containers/Home/index';
import ViewTemplate from '../templates/index';

class AppRouters extends React.Component {
    render(){
        return(
            <ViewTemplate>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </ViewTemplate>
        )
    }
}
export default AppRouters;