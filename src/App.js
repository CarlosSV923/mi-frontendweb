import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import PrivateRouteGeneral from './Routes/PrivateRouteGeneral';
import GeneralLayout from './Routes/Layouts/GeneralLayout';
import AgendaCitas from './Citas/AgendaCitas';
import AtenderCita from './Citas/AtenderCita'
import 'antd/dist/antd.css';
function App() {
  return (
    <BrowserRouter>
      <PrivateRouteGeneral exact path = '/' component = {AgendaCitas} layout = {GeneralLayout} />
      <PrivateRouteGeneral exact path = '/atenderCita' component = {AtenderCita} layout = {GeneralLayout} />
    </BrowserRouter>
  );
}

export default App;
