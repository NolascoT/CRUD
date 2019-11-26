import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { createrestaurante, updaterestaurante } from '../store';

class restauranteEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      restaurante     : props.restaurante || {},
      saving     : false,
      serverError: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const prevrestaurante = this.props.restaurante || {};
    const nextrestaurante = nextProps.restaurante || {};

    if (prevrestaurante.objectId !== nextrestaurante.objectId) {
      this.setState({ restaurante: nextrestaurante })
    }
  }

  close = () => {
    this.setState({
      restaurante     : {},
      saving     : false,
      serverError: null
    });

    this.props.onHide()
  };

  preparerestaurante() {
    const { restaurante } = this.state;

    return {
      ...restaurante,
      nombre   : (restaurante.nombre || '').trim() || null,
      domicilio: (restaurante.domicilio || '').trim() || null,
    }
  }

  save = () => {
    const restaurante = this.preparerestaurante();

    const action = this.props.restaurante
      ? this.props.updaterestaurante
      : this.props.createrestaurante;

    action(restaurante)
      .then(() => this.close())
      .catch(e => this.setState({ serverError: e.message }));
  };

  onNombreChange = e => this.setState({ restaurante: { ...this.state.restaurante, nombre: e.target.value } });
  onDomicilioChange = e => this.setState({ restaurante: { ...this.state.restaurante, domicilio: e.target.value } });

  render() {
    const { show } = this.props;
    const { restaurante, serverError, saving } = this.state;

    const isNew = !this.props.restaurante;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isNew ? 'Add' : 'Edit'} restaurante
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                className="form-control"
                placeholder="Input nombre"
                value={restaurante.nombre || ''}
                onChange={this.onNombreChange}
              />
            </div>

            <div className="form-group">
              <label>Domicilio:</label>
              <input
                className="form-control"
                placeholder="Input domicilio"
                value={restaurante.domicilio || ''}
                onChange={this.onDomicilioChange}
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

export default connect(null, { createrestaurante, updaterestaurante })(restauranteEditor);