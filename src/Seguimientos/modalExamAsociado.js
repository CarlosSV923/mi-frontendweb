import React from 'react';
import 'antd/dist/antd.css';
import {
    Steps, Button, message, Form, Input, Popconfirm, Row, Col,
    Collapse, DatePicker, Alert, Divider, Card, Select, InputNumber,
    Upload, Modal, Empty, Table, Tabs, Typography
} from 'antd'
import {
    UserOutlined, InfoCircleOutlined, HeartOutlined,
    PlusSquareOutlined, FileAddOutlined, PlusOutlined,
    PaperClipOutlined, CalendarOutlined, FileOutlined,
    LineChartOutlined, MedicineBoxFilled,
    FileImageOutlined, DatabaseOutlined,
    MinusCircleOutlined, DeleteOutlined, EyeOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;


export default class ModalExamAsociado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examen: {},
            fileList: [],
            editFileList: [],
        }
        this.formRef = React.createRef();
    }

    generateFileList(urls) {
        const fl = [];
        let idx = 0;
        urls.split(",").forEach(url => {
            idx++;
            fl.push({
                uid: String(idx),
                name: 'image.png',
                status: 'done',
                removeIcon: false,
                showRemoveIcon: false,
                url: url
            });
        });
        this.setState({ fileList: fl });
    }

    componentDidMount() {
        this.setState({
            visible: this.props.visible,
            edit: this.props.edit,
            examen: this.props.examen,
            idSeg: this.props.idSeg,
            loadingSave: this.props.loadingSave,
        })
    }

    componentDidUpdate() {
        if (this.state.visible !== this.props.visible) {
            this.setState({ visible: this.props.visible }, () => {
                if(!this.state.visible){
                    this.formRef.current.setFieldsValue({
                        tipo_examen: null,
                        comentario: null,
                        diagnostico: null,
                    })
                    this.setState({ fileList: [], editFileList: [] })
                }
            });
        }
        if (this.state.edit !== this.props.edit) {
            this.setState({ edit: this.props.edit });
        }
        if (this.state.loadingSave !== this.props.loadingSave) {
            this.setState({ loadingSave: this.props.loadingSave });
        }
        if (this.state.idSeg !== this.props.idSeg) {
            this.setState({ idSeg: this.props.idSeg });
        }
        if (this.state.examen !== this.props.examen) {
            this.setState({ examen: this.props.examen }, () => {
                if (this.state.examen) {
                    this.formRef.current.setFieldsValue({
                        tipo_examen: this.state.examen.tipo_examen ? this.state.examen.tipo_examen : "",
                        comentario: this.state.examen.comentarios ? this.state.examen.comentarios : "",
                        diagnostico: this.state.examen.diagnostico ? this.state.examen.diagnostico : "",
                    });
                    this.generateFileList(this.state.examen.url_examen)
                }
                else {
                    this.formRef.current.setFieldsValue({
                        tipo_examen: null,
                        comentario: null,
                        diagnostico: null,
                    })
                    this.setState({ fileList: [], editFileList: [] })
                }
            });
        }
    }

    saveExamen(e) {
        e.preventDefault();
        this.formRef.current.validateFields().then(values => {
            if (this.state.fileList && this.state.fileList.length > 0) {
                let formData = new FormData();
                formData.append("tipo_examen", values.tipo_examen);
                formData.append("comentarios", values.comentario);
                formData.append("diagnostico", values.diagnostico);
                formData.append("seguimiento", this.state.idSeg);

                this.setState({
                    examSave: formData,
                }, () => {
                    if (this.state.edit) {
                        formData.append("id_examen", this.state.examen.id_examen);
                        this.state.fileList.filter(img => img.response !== null && img.response !== undefined).forEach(img => { formData.append("images[]", img["originFileObj"]) })
                        this.props.editExamenAsociada(this.state.examSave);
                    } else {
                        this.state.fileList.forEach(img => { formData.append("images[]", img["originFileObj"]) })
                        this.props.saveExamenAsociada(this.state.examSave);
                    }
                });
            } else {
                message.warning("Debe seleccionar almenos una imagen.");
            }


        }).catch(err => {
            console.log(err);
        });

    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => { console.log(fileList); this.setState({ fileList }) };

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    beforeUpload(file) {
        if (this.state.edit) {
            console.log("entrooooo")
            this.setState({ editFileList: [...this.state.editFileList, file] })
        }
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Agregar Imagen</div>
            </div>
        );
        return (
            <div>
                <Modal title={"Examenes"}
                    visible={this.state.visible}
                    onCancel={(e) => { this.props.close() }}
                    footer={[
                        <Button key="back" onClick={(e) => { this.props.close() }}>
                            Cancelar
                        </Button>,
                        <Button htmlType="submit" loading={this.state.loadingSave} type="primary" onClick={(e) => { this.saveExamen(e) }}>
                            Guardar
                        </Button>
                    ]}
                >
                    <div style={{ textAlign: "center" }}>
                        <Form
                            ref={this.formRef}
                            layout="vertical"
                        >
                            <Form.Item
                                name="tipo_examen"
                                label="Ingrese el tipo de examen"
                                rules={[
                                    {
                                        required: true,
                                        message: "*Debe Singresar un valor valido"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="diagnostico"
                                label="Ingrese el diagnostico del examen"
                                rules={[
                                    {
                                        required: true,
                                        message: "*Debe ingresar un valor valido"
                                    },
                                ]}
                            >

                                <TextArea showCount maxLength={400} />

                            </Form.Item>
                            <Form.Item
                                name="comentario"
                                label="Comentario"

                            >
                                <TextArea showCount maxLength={400} />

                            </Form.Item>
                            <Form.Item
                                name="images"
                                label="Archivos (Imagenes)"

                            >


                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                    action={false}
                                    
                                >
                                {uploadButton}
                                </Upload>
                            <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={this.handleCancel}
                            >
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                            </Form.Item>


                        </Form>
                    </div>
                </Modal>
            </div >
        );
    }

}