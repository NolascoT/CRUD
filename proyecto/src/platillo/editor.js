import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { createplatillo, updateplatillo } from '../store';

class platilloEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      platillo     : props.platillo || {},
      saving     : false,
      serverError: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const prevplatillo = this.props.platillo || {};
    const nextplatillo = nextProps.platillo || {};

    if (prevplatillo.objectId !== nextplatillo.objectId) {
      this.setState({ platillo: nextplatillo })
    }
  }

  close = () => {
    this.setState({
      platillo     : {},
      saving     : false,
      serverError: null
    });

    this.props.onHide()
  };

  prepareplatillo() {
    const { platillo } = this.state;

    return {
      ...platillo,
      nombre   : (platillo.nombre || '').trim() || null,
      precio   : (platillo.precio || '').trim() || null,
      descripcion: (platillo.descripcion || '').trim() || null,
    }
  }

  save = () => {
    const platillo = this.prepareplatillo();

    const action = this.props.platillo
      ? this.props.updateplatillo
      : this.props.createplatillo;

    action(platillo)
      .then(() => this.close())
      .catch(e => this.setState({ serverError: e.message }));
  };

  onNombreChange = e => this.setState({ platillo: { ...this.state.platillo, nombre: e.target.value } });
  onPrecioChange = e => this.setState({ platillo: { ...this.state.platillo, precio: e.target.value } });
  onDescripcionChange = e => this.setState({ platillo: { ...this.state.platillo, descripcion: e.target.value } });

  render() {
    const { show } = this.props;
    const { platillo, serverError, saving } = this.state;

    const isNew = !this.props.platillo;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isNew ? 'Add' : 'Edit'} platillo
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                className="form-control"
                placeholder="Input name"
                value={platillo.nombre || ''}
                onChange={this.onNombreChange}
              />
            </div>

            <div className="form-group">
              <label>Precio:</label>
              <input
                className="form-control"
                placeholder="Input precio"
                value={platillo.precio || ''}
                onChange={this.onPrecioChange}
              />
            </div>

            <div className="form-group">
              <label>Descripcion:</label>
              <input
                className="form-control"
                placeholder="Input descripcion"
                value={platillo.descripcion || ''}
                onChange={this.onDescripcionChange}
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

export default connect(null, { createplatillo, updateplatillo })(platilloEditor);