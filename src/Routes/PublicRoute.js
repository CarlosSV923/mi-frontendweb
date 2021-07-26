import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import Auth from './../Login/Auth';


const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest}
        render={props => (!Auth.isLogin() ? (<Layout><Component {...props}/></Layout>) : (Auth.isMedico() ? (<Redirect to='/medico' />) : (Auth.isPaciente() ? (<Redirect to='/paciente' />) : (Auth.isCuidador() ? (<Redirect to='/cuidador' />) : (<Redirect to='/admin' />)))))} />
);
export default PublicRoute;