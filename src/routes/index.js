import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Register from '../containers/Register/index';
import ViewTemplate from '../templates/index';
import setAuthToken from '../utils/setAuthToken';
import { addHistory } from '../actions/global/index';


class AppRouters extends React.Component {
    componentWillMount(){
        this.props.dispatch(addHistory(this.props.history));
        if(localStorage.jwtToken) {
            setAuthToken(localStorage.jwtToken);
            const decoded = jwt_decode(localStorage.jwtToken);
            //store.dispatch(setCurrentUser(decoded));
            const currentTime = Date.now() / 1000;
            if(decoded.exp < currentTime) {
              //store.dispatch(logoutUser());
              // window.location.href = '/'
            }
        }
    }

    render(){
        return(
            <ViewTemplate>
                <Switch>
                    <Route exact path="/janak" component={Register} />
                </Switch>
            </ViewTemplate>
        )
    }
}

export default connect()(withRouter(AppRouters));