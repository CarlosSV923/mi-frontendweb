export default class FuncionesAuxiliares {

    static generateTitlesExcel(names, color) {
        let arrayColumnName = [];
        names.forEach(element => {
            let titulo = {
                title: element, width: { wch: 30 },
                style: {
                    font: { sz: "16", bold: true },
                    fill: { patternType: "solid", fgColor: { rgb: color } }
                }
            }
            arrayColumnName.push(titulo);
        });
        return arrayColumnName;
    }

    static validarCampo(campo, replace) {
        return campo === undefined || campo === '' || campo === null ? replace : campo;
    }

    
}