import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { createencargado, updateencargado } from '../store';

class encargadoEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      encargado     : props.encargado || {},
      saving     : false,
      serverError: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const prevencargado = this.props.encargado || {};
    const nextencargado = nextProps.encargado || {};

    if (prevencargado.objectId !== nextencargado.objectId) {
      this.setState({ encargado: nextencargado })
    }
  }

  close = () => {
    this.setState({
      encargado     : {},
      saving     : false,
      serverError: null
    });

    this.props.onHide()
  };

  prepareencargado() {
    const { encargado } = this.state;

    return {
      ...encargado,
      nombre   : (encargado.nombre || '').trim() || null,
      apellidop: (encargado.apellidop || '').trim() || null,
      apellidom: (encargado.apellidom || '').trim() || null,
      matricula: (encargado.matricula || '').trim() || null,
      sucursal: (encargado.sucursal || '').trim() || null
    }
  }

  save = () => {
    const encargado = this.prepareencargado();

    const action = this.props.encargado
      ? this.props.updateencargado
      : this.props.createencargado;

    action(encargado)
      .then(() => this.close())
      .catch(e => this.setState({ serverError: e.message }));
  };

  onNombreChange = e => this.setState({ encargado: { ...this.state.encargado, nombre: e.target.value } });
  onApellidopChange = e => this.setState({ encargado: { ...this.state.encargado, apellidop: e.target.value } });
  onApellidomChange = e => this.setState({ encargado: { ...this.state.encargado, apellidom: e.target.value } });
  onMatriculaChange = e => this.setState({ encargado: { ...this.state.encargado, matricula: e.target.value } });
  onSucursalChange = e => this.setState({ encargado: { ...this.state.encargado, sucursal: e.target.value } });

  render() {
    const { show } = this.props;
    const { encargado, serverError, saving } = this.state;

    const isNew = !this.props.encargado;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isNew ? 'Add' : 'Edit'} encargado
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                className="form-control"
                placeholder="Input nombre"
                value={encargado.nombre || ''}
                onChange={this.onNombreChange}
              />
            </div>

            <div className="form-group">
              <label>apellidop:</label>
              <input
                className="form-control"
                placeholder="Input apellidop"
                value={encargado.apellidop || ''}
                onChange={this.onApellidopChange}
              />
            </div>

            <div className="form-group">
              <label>apellidom:</label>
              <input
                className="form-control"
                placeholder="Input apellidom"
                value={encargado.apellidom || ''}
                onChange={this.onApellidomChange}
              />
            </div>

            <div className="form-group">
              <label>matricula:</label>
              <input
                className="form-control"
                placeholder="Input matricula"
                value={encargado.matricula || ''}
                onChange={this.onMatriculaChange}
              />
            </div>

            <div className="form-group">
              <label>sucursal:</label>
              <input
                className="form-control"
                placeholder="Input sucursal"
                value={encargado.sucursal || ''}
                onChange={this.onSucursalChange}
              />
            </div>

            {serverError && (
              <Alert variant="danger">
                {serverError}
              </Alert>
            )}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.close}>
            Close
          </Button>
          <Button variant="primary" onClick={this.save} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(null, { createencargado, updateencargado })(encargadoEditor);