// import logo from './logo.svg';
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
import Auth from './Login/Auth';

import 'antd/dist/antd.css';
import FormularioDiscapacidades from './Administrador/FormularioDiscapacidades';
import FormularioUsuarios from './Administrador/FormularioUsuarios';
import FormularioRoles from './Administrador/FormularioRoles';
import FormularioMedicamentos from './Administrador/FormularioMedicamentos';
import FormularioEnfermedades from './Administrador/FormularioEnfermedades';
import HomeAdmin from './Administrador/initPage';
import Index from './Seguimientos/index';
import PacienteTab from './Cuidador/pacienteTab';
import HomeEnfermedades from './Administrador/HomeEnfermedades';
import HomeMedicamentos from './Administrador/HomeMedicamentos';
import HomeDiscapacidades from './Administrador/HomeDiscapacidades';
import HomeUsuarios from './Administrador/HomeUsuarios';
import HomeRoles from './Administrador/HomeRoles';
import FormularioPerfiles from './Administrador/FormularioPerfiles';
import IndexTable from './Seguimientos/indexTable';
import HomeCitasAtendidas from './Administrador/HomeCitasAtendidas';
import HomePacientes from './Administrador/HomePacientes';
import ExpedientePaciente from '../src/Administrador/ExpedientePaciente';
import VisualizarCita from './Citas/VisualizarCita';
import Adicional from './Administrador/Adicional';

function App() {

  return (
    <BrowserRouter>
      {/* Routes Publicas */}
      <HomeRoute exact path='/' />
      <PublicRoute exact path='/login' component={Login} layout={PublicLayout} />
      {/* <PublicRoute exact path='/perfil/:ced' component={FormularioPerfiles} layout={AdminLayout} /> */}
      {/* <PublicRoute exact path={`${perfil()}/perfil/:ced`} component={FormularioPerfiles} layout={PublicLayout} /> */}
      {/* <PublicRoute exact path='/cambiar_password' component={UpdatePass} layout={PublicLayout} /> */}

      {/* Routes Medicos */}
      <PrivateRouteMedico exact path='/medico' component={AgendaCitas} layout={MedicoLayout} />
      <PrivateRouteMedico exact path='/medico/atenderCita' component={AtenderCita} layout={MedicoLayout} />
      <PrivateRouteMedico exact path='/medico/seguimiento/:id' component={Index} layout={MedicoLayout} />
      <PrivateRouteMedico exact path='/medico/seguimientos' component={IndexTable} layout={MedicoLayout} />
      <PrivateRouteMedico exact path='/medico/atenderCita/:id' component={AtenderCita} layout={MedicoLayout} />
      <PrivateRouteMedico exact path='/medico/perfil/:ced' component={FormularioPerfiles} layout={MedicoLayout} />
      <PrivateRouteMedico exact path='/medico/homecitasatentidas' component={HomeCitasAtendidas} layout={MedicoLayout} />
      <PrivateRouteMedico exact path='/medico/homepacientes' component={HomePacientes} layout={MedicoLayout} />
      <PrivateRouteMedico exact path='/medico/homepacientes/expedientepaciente/:ced' component={ExpedientePaciente} layout={MedicoLayout} />
      <PrivateRouteMedico exact path='/medico/citaanterior/paciente/:id/:ced' component={VisualizarCita} layout={MedicoLayout} />
      <PrivateRouteMedico exact path='/medico/adicional' component={Adicional} layout={MedicoLayout} />

      {/* Routes Paciente */}
      <PrivateRoutePaciente exact path='/paciente' component={AgendaCitas} layout={PacienteLayout} />
      <PrivateRoutePaciente exact path='/paciente/perfil/:ced' component={FormularioPerfiles} layout={PacienteLayout} />
      <PrivateRoutePaciente exact path='/paciente/seguimiento/:id' component={Index} layout={PacienteLayout} />
      <PrivateRoutePaciente exact path='/paciente/seguimientos' component={IndexTable} layout={PacienteLayout} />

      {/* Routes Admin */}
      <PrivateRouteAdmin exact path='/admin' component={HomeAdmin} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/formulariodiscapacidades' component={FormularioDiscapacidades} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/formulariousuarios' component={FormularioUsuarios} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/formularioroles' component={FormularioRoles} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/formulariomedicamentos' component={FormularioMedicamentos} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/formularioenfermedades' component={FormularioEnfermedades} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/homeenfermedades' component={HomeEnfermedades} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/homemedicamentos' component={HomeMedicamentos} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/homediscapacidades' component={HomeDiscapacidades} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/homeusuarios' component={HomeUsuarios} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/homeroles' component={HomeRoles} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/edit/enfermedades/:id' component={FormularioEnfermedades} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/edit/medicamentos/:id' component={FormularioMedicamentos} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/edit/discapacidades/:id' component={FormularioDiscapacidades} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/edit/usuarios/:ced' component={FormularioUsuarios} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/edit/roles/:id' component={FormularioRoles} layout={AdminLayout} />
      <PrivateRouteAdmin exact path='/admin/perfil/:ced' component={FormularioPerfiles} layout={AdminLayout} />

      {/* Routes Admin */}
      <PrivateRouteCuidador exact path='/cuidador' component={AgendaCitas} layout={CuidadorLayout} />
      <PrivateRouteCuidador exact path='/cuidador/pacientesACargo' component={PacienteTab} layout={CuidadorLayout} />

    </BrowserRouter>
  );
}

export default App;
