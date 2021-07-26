import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './../Login/Auth';

const PrivateRouteMedico = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (!Auth.isLogin() ? (<Redirect to='/login' />) : (Auth.isMedico() ? (<Layout><Component {...props} /></Layout>) : (Auth.isPaciente() ? (<Redirect to='/paciente' />) : (Auth.isCuidador() ? (<Redirect to='/cuidador' />) : (<Redirect to='/admin' />)))))} />

);
export default PrivateRouteMedico;

