import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { createmesero, updatemesero } from '../store';

class meseroEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mesero     : props.mesero || {},
      saving     : false,
      serverError: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const prevmesero = this.props.mesero || {};
    const nextmesero = nextProps.mesero || {};

    if (prevmesero.objectId !== nextmesero.objectId) {
      this.setState({ mesero: nextmesero })
    }
  }

  close = () => {
    this.setState({
      mesero     : {},
      saving     : false,
      serverError: null
    });

    this.props.onHide()
  };

  preparemesero() {
    const { mesero } = this.state;

    return {
      ...mesero,
      nombre   : (mesero.nombre || '').trim() || null,
      apellido: (mesero.apellido || '').trim() || null,
      apellidom: (mesero.apellidom || '').trim() || null,
      matricula: (mesero.matricula || '').trim() || null,
      sueldo: (mesero.sueldo || '').trim() || null,
      mesa: (mesero.mesa || '').trim() || null
    }
  }

  save = () => {
    const mesero = this.preparemesero();

    const action = this.props.mesero
      ? this.props.updatemesero
      : this.props.createmesero;

    action(mesero)
      .then(() => this.close())
      .catch(e => this.setState({ serverError: e.message }));
  };

  onNombreChange = e => this.setState({ mesero: { ...this.state.mesero, nombre: e.target.value } });
  onApellidoChange = e => this.setState({ mesero: { ...this.state.mesero, apellido: e.target.value } });
  onApellidomChange = e => this.setState({ mesero: { ...this.state.mesero, apellidom: e.target.value } });
  onMatriculaChange = e => this.setState({ mesero: { ...this.state.mesero, matricula: e.target.value } });
  onSueldoChange = e => this.setState({ mesero: { ...this.state.mesero, sueldo: e.target.value } });
  onMesaChange = e => this.setState({ mesero: { ...this.state.mesero, mesa: e.target.value } });

  render() {
    const { show } = this.props;
    const { mesero, serverError, saving } = this.state;

    const isNew = !this.props.mesero;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isNew ? 'Add' : 'Edit'} mesero
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                className="form-control"
                placeholder="Input nombre"
                value={mesero.nombre || ''}
                onChange={this.onNombreChange}
              />
            </div>

            <div className="form-group">
              <label>apellido:</label>
              <input
                className="form-control"
                placeholder="Input apellido"
                value={mesero.apellido || ''}
                onChange={this.onApellidoChange}
              />
            </div>

            <div className="form-group">
              <label>apellidom:</label>
              <input
                className="form-control"
                placeholder="Input apellidom"
                value={mesero.apellidom || ''}
                onChange={this.onApellidomChange}
              />
            </div>

            <div className="form-group">
              <label>matricula:</label>
              <input
                className="form-control"
                placeholder="Input matricula"
                value={mesero.matricula || ''}
                onChange={this.onMatriculaChange}
              />
            </div>

            <div className="form-group">
              <label>sueldo:</label>
              <input
                className="form-control"
                placeholder="Input sueldo"
                value={mesero.sueldo || ''}
                onChange={this.onSueldoChange}
              />
            </div>

            <div className="form-group">
              <label>mesa:</label>
              <input
                className="form-control"
                placeholder="Input mesa"
                value={mesero.mesa || ''}
                onChange={this.onMesaChange}
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

export default connect(null, { createmesero, updatemesero })(meseroEditor);