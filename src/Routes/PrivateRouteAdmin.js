import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../Login/Auth';

const PrivateRouteAdmin = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (!Auth.isLogin() ? (<Redirect to='/login' />) : (Auth.isMedico() ? (<Redirect to='/medico' />) : (Auth.isPaciente() ? (<Redirect to='/paciente' />) : (Auth.isCuidador() ? (<Redirect to='/cuidador' />) : (<Layout><Component {...props} /></Layout>)))))} />

);
export default PrivateRouteAdmin;

