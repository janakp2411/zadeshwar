import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, REGISTER_USER, REGISTER_USER_SUCCESS } from './actionTypes';

// export const registerUser = (user, history) => dispatch => {
//     axios.post('/api/users/register', user)
//             .then(res => history.push('/login'))
//             .catch(err => {
//                 dispatch({
//                     type: GET_ERRORS,
//                     payload: err.response.data
//                 });
//             });
// }

export const registerUser = (data) => {
    return {
        type: REGISTER_USER,
        data
    }
}

export const registerUserSuccessed = (data) => {
    return {
        type: REGISTER_USER_SUCCESS,
        data
    }
}

export const loginUser = (user) => dispatch => {
    // axios.post('/api/users/login', user)
    //         .then(res => {
    //             const { token } = res.data;
    //             localStorage.setItem('jwtToken', token);
    //             setAuthToken(token);
    //             const decoded = jwt_decode(token);
    //             dispatch(setCurrentUser(decoded));
    //         })
    //         .catch(err => {
    //             dispatch({
    //                 type: GET_ERRORS,
    //                 payload: err.response.data
    //             });
    //         });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    // localStorage.removeItem('jwtToken');
    // setAuthToken(false);
    // dispatch(setCurrentUser({}));
    // history.push('/login');
}