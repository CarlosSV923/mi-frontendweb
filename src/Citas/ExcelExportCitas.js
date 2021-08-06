import React, { Component } from 'react';
import ReactExport from 'react-data-export';
import { Button } from 'antd';
import FuncionesAuxiliares from './../funcionesAuxiliares';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class ExcelExportCitas extends Component {
    generateTitles() {
        let titulos = ['Médico', 'CI Médico', 'Paciente', 'CI Paciente', 'Fecha Agendada', 'Fecha Atendida', 'Enfermedades Diagnosticadas',
            'Medicamentos Recetados', 'Estado Cita'];
        return FuncionesAuxiliares.generateTitlesExcel(titulos, 'FFC000');
    }

    generateColumnsImp(data) {
        let rows = []
        if (data) {
            data.forEach(element => {
                let row = [
                    { 'value': FuncionesAuxiliares.validarCampo(element.medico, 'No Asignado') },
                    { 'value': FuncionesAuxiliares.validarCampo(element.cedulaMedico, 'No Asignado') },
                    { 'value': FuncionesAuxiliares.validarCampo(element.paciente, 'No Asignado') },
                    { 'value': FuncionesAuxiliares.validarCampo(element.cedulaPaciente, '-') },
                    { 'value': FuncionesAuxiliares.validarCampo(element.fechaAgendada, '-') },
                    { 'value': FuncionesAuxiliares.validarCampo(element.fechaAtendida, '-') },
                    { 'value': FuncionesAuxiliares.validarCampo(element.enfermedades, '-') },
                    { 'value': FuncionesAuxiliares.validarCampo(element.medicamentos, '-') },
                    { 'value': FuncionesAuxiliares.validarCampo(element.estado, '-') },
                ]
                rows.push(row);
            });
        }

        return rows;
    }


    generateData(data) {
        return [{
            columns: this.generateTitles(),
            data: this.generateColumnsImp(data)
        }];
    }

    render() {
        return (

            <div>
                <ExcelFile filename={'Reporte de Citas'} element={<Button type="primary" icon={<DownloadOutlined />}>Descargar</Button>}>
                    <ExcelSheet dataSet={this.generateData(this.props.data)} name="Citas" />
                </ExcelFile>
            </div>
        );
    }
}
