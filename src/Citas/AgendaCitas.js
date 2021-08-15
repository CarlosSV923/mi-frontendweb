import React from 'react';
import BigCalendar from 'react-big-calendar-like-google';
import moment from 'moment';
import { message } from 'antd'
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css';
import ModalAgenda from './modals/ModalAgenda';
import ModalConfirmAgenda from './modals/ModalConfirmAgenda';
import AxiosCitas from './../Services/AxiosCitas';
import { estadoCitaColor } from './enumEstadoCita';
import FilterAgenda from './filterAgenda';
import Auth from './../Login/Auth';
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
require('moment/locale/es-us.js');
export default class AgendaCitas extends React.Component {
  constructor(props) {
    super(props);
    this.getFechasLimitesSemana = this.getFechasLimitesSemana.bind(this);
    this.setDataFilter = this.setDataFilter.bind(this);
    this.state = {
      visibleModal: false,
      slotInfo: null,
      event: null,
      idxEvent: -1,
      slotInfoSave: null,
      eventSave: null,
      visibleConfirm: false,
      visibleCancel: false,
      visibleUpdate: false,
      events: [],
      userData: {},
      date: new Date(),
    }


  }

  componentDidMount() {
    // localStorage.getItem('userdata')
    console.log('localStorage.getItem(userdata): ',localStorage.getItem('userdata'));
    this.setState({ userData: Auth.getDataUser() }, () => { this.preLoadCitas(); });
  }

  setDataFilter(data){
    this.setState({...data});
  }

  getCitasMedico(filter, merge = true) {
    AxiosCitas.getCitasMedico(filter).then(resp => {
      console.log(resp);
      const citas = resp.data.map(cita => {
        cita.title = cita.cedula + " - " + cita.nombre + " " + cita.apellido;
        cita.bgColor = estadoCitaColor[cita.estado];
        cita.start = new Date(cita.start);
        cita.end = new Date(cita.end);
        return cita;
      });
      console.log(citas);
      this.setState({ events: merge ? [...this.state.events, ...citas] : citas });

    }).catch(err => {
      console.log(err);
      message.error('No se cargar las citas actuales, intentelo mas tarde!');
    });
  }

  getCitasPaciente(filter, merge = true) {
    AxiosCitas.getCitasPaciente(filter).then(resp => {
      console.log(resp);
      const citas = resp.data.map(cita => {
        cita.title = cita.especialidad + " - " + cita.cedula + " - " + cita.nombre + " " + cita.apellido;
        cita.bgColor = estadoCitaColor[cita.estado];
        cita.start = new Date(cita.start);
        cita.end = new Date(cita.end);
        return cita;
      });
      console.log(citas);
      this.setState({ events: merge ? [...this.state.events, ...citas] : citas });

    }).catch(err => {
      console.log(err);
      message.error('No se cargar las citas actuales, intentelo mas tarde!');
    });
  }

  getCitasCuidador(filter, merge = true) {
    AxiosCitas.getCitasCuidador(filter).then(resp => {
      console.log(resp);
      const citas = resp.data.map(cita => {
        cita.title = cita.especialidad + " - " + cita.cedula + " - " + cita.nombre + " " + cita.apellido;
        cita.bgColor = estadoCitaColor[cita.estado];
        cita.start = new Date(cita.start);
        cita.end = new Date(cita.end);
        return cita;
      });
      console.log(citas);
      this.setState({ events: merge ? [...this.state.events, ...citas] : citas });

    }).catch(err => {
      console.log(err);
      message.error('No se cargar las citas actuales, intentelo mas tarde!');
    });
  }

  getFechasLimitesSemana(date, daysAdd = 7, daysLess = -7) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    const dayOfWeek = date.getDay();
    const d = date.getDate();
    const date_max = new Date((new Date()).setDate(d + (dayOfWeek === 0 ? 0 : 7 - dayOfWeek) + daysAdd));
    const date_min = new Date((new Date()).setDate(d + (dayOfWeek === 0 ? -7 : - dayOfWeek) + daysLess));

    return { date_max, date_min }
  }

  preLoadCitas(merge = true) {

    const filter = {
      ...this.getFechasLimitesSemana(new Date()),
      cedula: this.state.userData.cedula,
    }
    if (Auth.isMedico()) {
      this.getCitasMedico(filter, merge);
    } else if(Auth.isPaciente()){
      this.getCitasPaciente(filter, merge);
    }else {
      this.getCitasCuidador(filter, merge);
    }
  }

 

  updateCitaX(action) {
    const start = this.state.eventSave.start;
    const end = this.state.eventSave.end;

    start.setMinutes(start.getMinutes() - (5 * 60));
    end.setMinutes(end.getMinutes() - (5 * 60));

    const cita = {
      id: this.state.eventSave.id,
      init_comment: this.state.eventSave.desc,
      inicio_cita: new Date(start),
      fin_cita: new Date(end),
      estado: this.state.eventSave.estado,
    }

    this.reangedarCancelarCita(cita, action);

  }

  reangedarCancelarCita(cita, action) {
    AxiosCitas.reangedarCancelarCita(cita).then(resp => {
      console.log(resp);
      if (action === "R") {
        message.success('Cita Reagendada con éxito!');
      } else {
        message.success('Cita Cancelada con éxito!');
      }
      this.preLoadCitas(false);
    }).catch(err => {
      console.log(err);
      if (action === "R") {
        message.error('Error al reagendar cita, intentelo mas tarde!');
      } else {
        message.error('Error al cancelar cita, intentelo mas tarde!');
      }
    });
  }

  agendarCita() {
    const start = this.state.slotInfoSave.start;
    const end = this.state.slotInfoSave.end;

    start.setMinutes(start.getMinutes() - (5 * 60));
    end.setMinutes(end.getMinutes() - (5 * 60));

    const cita = {
      paciente: this.state.slotInfoSave.paciente,
      medico: this.state.slotInfoSave.medico,
      init_comment: this.state.slotInfoSave.desc,
      inicio_cita: new Date(start),
      fin_cita: new Date(end),
    }

    console.log(cita)

    AxiosCitas.agendarCita(cita).then((result) => {
      console.log(result);
      message.success('Cita Agendada con éxito!');
    }).catch((err) => {
      console.log(err);
      message.error('No se pudo agendar la cita, intentelo mas tarde!');
    });
  }

  createCita(slotInfoSave) {
    console.log("create cita");
    this.setState({ visibleModal: false, visibleConfirm: true, event: null, slotInfoSave }, () => { console.log(this.state) });
  }

  confirmCreatCita() {
    console.log("confirm create cita");
    console.log(this.state.slotInfoSave)
    this.setState({ visibleConfirm: false, events: [...this.state.events, this.state.slotInfoSave], slotInfo: null }, () => {
      this.agendarCita();
    });
  }

  updateCita(eventSave) {
    console.log("update cita");
    this.setState({ visibleModal: false, visibleUpdate: true, eventSave });
  }

  confirmUpdateCita() {
    console.log("confirm update cita");
    const newEvents = [...this.state.events];
    newEvents.splice(this.state.idxEvent, 1, this.state.eventSave);
    this.setState({ events: newEvents, visibleUpdate: false, idxEvent: -1, event: null, slotInfo: null }, () => {
      this.updateCitaX("R");
    });
  }

  cancelCita(eventSave) {
    console.log("cancel cita");
    this.setState({ visibleModal: false, visibleCancel: true, eventSave });
  }

  confirmCancelCita() {
    console.log("confirm calcel cita");
    const newEvents = [...this.state.events];
    newEvents.splice(this.state.idxEvent, 1, this.state.eventSave);
    this.setState({ events: newEvents, idxEvent: -1, visibleCancel: false, event: null, slotInfo: null }, () => {
      this.updateCitaX("C");
    });
  }

  showModalAgendarCita(slotInfo) {
    console.log(slotInfo);
    this.setState({ slotInfo: slotInfo, event: null, visibleModal: true });
  }

  showModalEditCita(event) {
    console.log(event);
    this.setState({ idxEvent: this.state.events.indexOf(event), event: event, slotInfo: null, visibleModal: true }, () => { console.log(this.state) });
  }

  closeModal() {
    this.setState({ visibleModal: false });
  }

  closeModalConfirm() {
    this.setState({ visibleModal: true, visibleConfirm: false });
  }
  closeModalCancel() {
    this.setState({ visibleModal: true, visibleCancel: false });
  }
  closeModalUpdate() {
    this.setState({ visibleModal: true, visibleUpdate: false });
  }

  navigateCalendar(date, view, action) {
    console.log(date)
    this.setState({ date });
    const filter = {
      cedula: this.state.userData.cedula,
      ...this.getFechasLimitesSemana(date),
    }

    console.log(date, filter)

    if (Auth.isMedico()) {
      this.getCitasMedico(filter, false);
    } else {
      this.getCitasPaciente(filter, false);
    }

  }

  render() {
    return (
      <div >

        {Auth.isMedico() ? <FilterAgenda
          setDataFilter={this.setDataFilter}
        /> : null}
        <BigCalendar
          selectable
          events={this.state.events}
          defaultView='work_week'
          onNavigate={(date, view, action) => { this.navigateCalendar(date, view, action) }}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={this.state.date}
          date={this.state.date}
          //views={Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])}
          views={["work_week"]}
          onSelectEvent={event => { this.showModalEditCita(event) }}
          onSelectSlot={(slotInfo) => { this.showModalAgendarCita(slotInfo) }}
        />

        <ModalAgenda
          slotInfo={this.state.slotInfo}
          visibleModal={this.state.visibleModal}
          event={this.state.event}
          agendarCita={this.createCita.bind(this)}
          handleCancel={this.closeModal.bind(this)}
          cancelarCita={this.cancelCita.bind(this)}
          updateCita={this.updateCita.bind(this)}
        />

        {/* Confirmar Crear Cita */}
        <ModalConfirmAgenda
          visible={this.state.visibleConfirm}
          data={this.state.slotInfoSave}
          title={"Agendar Cita"}
          okText={"Aceptar"}
          cancelText={"Cancelar"}
          bodyText={"Esta seguro de agendar esta cita?"}
          confirm={this.confirmCreatCita.bind(this)}
          cancelConfirm={this.closeModalConfirm.bind(this)}
        />

        {/*Confirmar Cancelar Cita */}
        <ModalConfirmAgenda
          visible={this.state.visibleCancel}
          data={this.state.eventSave}
          title={"Cancelar Cita"}
          okText={"Aceptar"}
          cancelText={"Cancelar"}
          bodyText={"Esta seguro de cancelar esta cita?"}
          confirm={this.confirmCancelCita.bind(this)}
          cancelConfirm={this.closeModalCancel.bind(this)}
        />

        {/*Confirmar Actualizar Cita */}
        <ModalConfirmAgenda
          visible={this.state.visibleUpdate}
          data={this.state.eventSave}
          title={"Editar Cita"}
          okText={"Aceptar"}
          cancelText={"Cancelar"}
          bodyText={"Esta seguro de Editar la información de esta cita?"}
          confirm={this.confirmUpdateCita.bind(this)}
          cancelConfirm={this.closeModalUpdate.bind(this)}
        />
      </div>
    )
  }

}