import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../Login/Auth';

const PrivateRoutePaciente = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (!Auth.isLogin() ? (<Redirect to='/login' />) : (Auth.isMedico() ? (<Redirect to='/medico' />) : (Auth.isPaciente() ? (<Layout><Component {...props} /></Layout>) : (Auth.isCuidador() ? (<Redirect to='/cuidador' />) : (<Redirect to='/admin' />)))))} />

);
export default PrivateRoutePaciente;

