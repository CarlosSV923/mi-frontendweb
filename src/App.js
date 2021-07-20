import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import PrivateRouteGeneral from './Routes/PrivateRouteGeneral';
import GeneralLayout from './Routes/Layouts/GeneralLayout';
import AgendaCitas from './Citas/AgendaCitas';
import AtenderCita from './Citas/AtenderCita'
import 'antd/dist/antd.css';
import FormularioDiscapacidades from './Administrador/FormularioDiscapacidades';
import FormularioUsuarios from './Administrador/FormularioUsuarios';
import FormularioRoles from './Administrador/FormularioRoles';
import FormularioMedicamentos from './Administrador/FormularioMedicamentos';
import FormularioEnfermedades from './Administrador/FormularioEnfermedades';

function App() {
  return (
    <BrowserRouter>
      <PrivateRouteGeneral exact path = '/' component = {AgendaCitas} layout = {GeneralLayout} />
      <PrivateRouteGeneral exact path = '/atenderCita' component = {AtenderCita} layout = {GeneralLayout} />
      <PrivateRouteGeneral exact path = '/formulariodiscapacidades' component = {FormularioDiscapacidades} layout = {GeneralLayout} />
      <PrivateRouteGeneral exact path = '/formulariousuarios' component = {FormularioUsuarios} layout = {GeneralLayout} />
      <PrivateRouteGeneral exact path = '/formularioroles' component = {FormularioRoles} layout = {GeneralLayout} />
      <PrivateRouteGeneral exact path = '/formulariomedicamentos' component = {FormularioMedicamentos} layout = {GeneralLayout} />
      <PrivateRouteGeneral exact path = '/formularioenfermedades' component = {FormularioEnfermedades} layout = {GeneralLayout} />

    </BrowserRouter>
  );
}

export default App;
