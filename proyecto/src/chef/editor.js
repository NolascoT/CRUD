import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { createchef, updatechef } from '../store';

class chefEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      chef     : props.chef || {},
      saving     : false,
      serverError: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const prevchef = this.props.chef || {};
    const nextchef = nextProps.chef || {};

    if (prevchef.objectId !== nextchef.objectId) {
      this.setState({ chef: nextchef })
    }
  }

  close = () => {
    this.setState({
      chef     : {},
      saving     : false,
      serverError: null
    });

    this.props.onHide()
  };

  preparechef() {
    const { chef } = this.state;

    return {
      ...chef,
      nombre   : (chef.nombre || '').trim() || null,
      apellidop: (chef.apellidop || '').trim() || null,
      apellidom: (chef.apellidom || '').trim() || null,
      matricula: (chef.matricula || '').trim() || null,
      cargo: (chef.cargo || '').trim() || null,
      especialidad: (chef.especialidad|| '').trim() || null
    }
  }

  save = () => {
    const chef = this.preparechef();

    const action = this.props.chef
      ? this.props.updatechef
      : this.props.createchef;

    action(chef)
      .then(() => this.close())
      .catch(e => this.setState({ serverError: e.message }));
  };

  onNombreChange = e => this.setState({ chef: { ...this.state.chef, nombre: e.target.value } });
  onApellidopChange = e => this.setState({ chef: { ...this.state.chef, apellidop: e.target.value } });
  onApellidomChange = e => this.setState({ chef: { ...this.state.chef, apellidom: e.target.value } });
  onMatriculaChange = e => this.setState({ chef: { ...this.state.chef, matricula: e.target.value } });
  onSueldoChange = e => this.setState({ chef: { ...this.state.chef, sueldo: e.target.value } });
  onCargoChange = e => this.setState({ chef: { ...this.state.chef, cargo: e.target.value } });
  onEspecialidadChange = e => this.setState({ chef: { ...this.state.chef, especialidad: e.target.value } });

  render() {
    const { show } = this.props;
    const { chef, serverError, saving } = this.state;

    const isNew = !this.props.chef;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isNew ? 'Add' : 'Edit'} chef
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                className="form-control"
                placeholder="Input nombre"
                value={chef.nombre || ''}
                onChange={this.onNombreChange}
              />
            </div>

            <div className="form-group">
              <label>Apellidop:</label>
              <input
                className="form-control"
                placeholder="Input apellidop"
                value={chef.apellidop || ''}
                onChange={this.onApellidopChange}
              />
            </div>

            <div className="form-group">
              <label>Apellidom:</label>
              <input
                className="form-control"
                placeholder="Input apellidom"
                value={chef.apellidom || ''}
                onChange={this.onApellidomChange}
              />
            </div>

            <div className="form-group">
              <label>matricula:</label>
              <input
                className="form-control"
                placeholder="Input matricula"
                value={chef.matricula || ''}
                onChange={this.onMatriculaChange}
              />
            </div>

            <div className="form-group">
              <label>sueldo:</label>
              <input
                className="form-control"
                placeholder="Input sueldo"
                value={chef.sueldo || ''}
                onChange={this.onSueldoChange}
              />
            </div>

            <div className="form-group">
              <label>cargo:</label>
              <input
                className="form-control"
                placeholder="Input cargo"
                value={chef.cargo || ''}
                onChange={this.onCargoChange}
              />
            </div>

            <div className="form-group">
              <label>especialidad:</label>
              <input
                className="form-control"
                placeholder="Input especialidad"
                value={chef.especialidad || ''}
                onChange={this.onEspecialidadChange}
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

export default connect(null, { createchef, updatechef })(chefEditor);