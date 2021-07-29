import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import PrivateRouteMedico from './Routes/PrivateRouteMedico';
import PrivateRouteCuidador from './Routes/PrivateRouteCuidador';
import PrivateRouteAdmin from './Routes/PrivateRouteAdmin';
import PrivateRoutePaciente from './Routes/PrivateRoutePaciente';
import PublicRoute from './Routes/PublicRoute';
import HomeRoute from './Routes/HomeRoute';
import MedicoLayout from './Routes/Layouts/MedicoLayout';
import PublicLayout from './Routes/Layouts/PublicLayout';
import CuidadorLayout from './Routes/Layouts/CuidadorLayout';
import AdminLayout from './Routes/Layouts/AdminLayout';
import PacienteLayout from './Routes/Layouts/PacienteLayout';
import Login from './Login/Login'
import AgendaCitas from './Citas/AgendaCitas';
import AtenderCita from './Citas/AtenderCita'
import 'antd/dist/antd.css';
import FormularioDiscapacidades from './Administrador/FormularioDiscapacidades';
import FormularioUsuarios from './Administrador/FormularioUsuarios';
import FormularioRoles from './Administrador/FormularioRoles';
import FormularioMedicamentos from './Administrador/FormularioMedicamentos';
import FormularioEnfermedades from './Administrador/FormularioEnfermedades';
import HomeAdmin from './Administrador/initPage';
import HomeCuidador from './Cuidador/initPage';

function App() {
  return (
    <BrowserRouter>
      {/* Routes Publicas */}
      <HomeRoute exact path='/' />
      <PublicRoute exact path='/login' component={Login} layout={PublicLayout} />
      {/* <PublicRoute exact path='/cambiar_password' component={UpdatePass} layout={PublicLayout} /> */}

      {/* Routes Medicos */}
      <PrivateRouteMedico exact path='/medico' component={AgendaCitas} layout={MedicoLayout} />
      <PrivateRouteMedico exact path='/medico/atenderCita' component={AtenderCita} layout={MedicoLayout} />

      {/* Routes Medicos */}
      <PrivateRoutePaciente exact path='/paciente' component={AgendaCitas} layout={PacienteLayout} />


      {/* Routes Admin */}
      <PrivateRouteAdmin exact path='/admin' component={HomeAdmin} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/formulariodiscapacidades' component={FormularioDiscapacidades} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/formulariousuarios' component={FormularioUsuarios} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/formularioroles' component={FormularioRoles} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/formulariomedicamentos' component={FormularioMedicamentos} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/formularioenfermedades' component={FormularioEnfermedades} layout={AdminLayout} />

      {/* Routes Admin */}
      <PrivateRouteCuidador exact path='/admin' component={HomeCuidador} layout={CuidadorLayout} />

    </BrowserRouter>
  );
}

export default App;
