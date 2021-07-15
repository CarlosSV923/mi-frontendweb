import React from 'react';
import BigCalendar from 'react-big-calendar-like-google';
import moment from 'moment';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css';
import ModalAgenda from './modals/ModalAgenda';
import ModalConfirmAgenda from './modals/ModalConfirmAgenda';
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
require('moment/locale/es-us.js');

var colors = {
  'color-1': "rgba(102, 195, 131 , 1)",
  "color-2": "rgba(242, 177, 52, 1)",
  "color-3": "rgba(235, 85, 59, 1)",
  "color-4": "rgba(70, 159, 213, 1)",
  "color-5": "rgba(170, 59, 123, 1)"
}


export default class AgendaCitas extends React.Component {
  constructor(props) {
    super(props);

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
    }


  }

  createCita(slotInfoSave) {
    console.log("create cita");
    this.setState({ visibleModal: false, visibleConfirm: true, event: null, slotInfoSave }, () => { console.log(this.state) });
  }

  confirmCreatCita() {
    console.log("confirm create cita");
    console.log(this.state.slotInfoSave)
    this.setState({ visibleConfirm: false, events: [...this.state.events, this.state.slotInfoSave], slotInfo: null });
  }

  updateCita(eventSave) {
    console.log("update cita");
    this.setState({ visibleModal: false, visibleUpdate: true, eventSave });
  }

  confirmUpdateCita() {
    console.log("confirm update cita");
    const newEvents = [...this.state.events];
    newEvents.splice(this.state.idxEvent, 1, this.state.eventSave);
    this.setState({ events: newEvents, visibleUpdate: false, idxEvent: -1, event: null, slotInfo: null });
  }

  cancelCita(eventSave) {
    console.log("cancel cita");
    this.setState({ visibleModal: false, visibleCancel: true, eventSave });
  }

  confirmCancelCita() {
    console.log("confirm calcel cita");
    const newEvents = [...this.state.events];
    newEvents.splice(this.state.idxEvent, 1, this.state.eventSave);
    this.setState({ events: newEvents, idxEvent: -1, visibleCancel: false, event: null, slotInfo: null });
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

  componentDidMount() {
    console.log(BigCalendar.Navigate)

  }

  render() {
    return (
      <div >
        <BigCalendar
          selectable
          events={this.state.events}
          defaultView='work_week'
          onNavigate={(e, a, r, l) => { console.log(e, a, r, l) }}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          views={Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])}
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