import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Backendless from 'backendless';

import { loadmeseros, getmeseros, onmeseroCreate, onmeseroUpdate, onmeseroRemove } from '../store';

import Editor from './editor';
import DeleteConfirmation from './delete-confirmation';

const mapStateToProps = state => {
  const { loading, loaded, error, list: meseros } = getmeseros(state);

  return {
    loading,
    loaded,
    error,
    meseros
  }
};

class Mesero extends Component {

  state = {
    showEditor : false,
    editorProps: null,

    showDeleteConfirmation : false,
    deleteConfirmationProps: null,
  };

  showEditor = mesero => this.setState({ showEditor: true, editorProps: { mesero } });
  hideEditor = () => this.setState({ showEditor: false, editorProps: null });

  showDeleteConfirmation = mesero => this.setState({ showDeleteConfirmation : true, deleteConfirmationProps: { mesero } });
  hideDeleteConfirmation = () => this.setState({ showDeleteConfirmation: false, deleteConfirmationProps: null });

  componentWillMount(){
    this.props.loadmeseros();

    this.meseroRT = Backendless.Data.of('mesero').rt();

    this.meseroRT.addCreateListener(this.props.onmeseroCreate);
    this.meseroRT.addUpdateListener(this.props.onmeseroUpdate);
    this.meseroRT.addDeleteListener(this.props.onmeseroRemove);
  }

  componentWillUnmount(){
    this.meseroRT.removeCreateListener(this.props.onmeseroCreate);
    this.meseroRT.removeUpdateListener(this.props.onmeseroUpdate);
    this.meseroRT.removeDeleteListener(this.props.onmeseroRemove);
  }

  onAddClick = () => this.showEditor(null);
  onEditClick = mesero => this.showEditor(mesero);
  onDeleteClick = mesero => this.showDeleteConfirmation(mesero);

  rendermesero = mesero => {
    return (
      <li key={mesero.objectId} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div>{mesero.nombre}</div>
          <div className="text-muted small">{mesero.apellido}</div>
          <div className="text-muted small">{mesero.apellidom}</div>
          <div className="text-muted small">{mesero.matricula}</div>
          <div className="text-muted small">{mesero.sueldo}</div>
          <div className="text-muted small">{mesero.mesa}</div>
        </div>

        <ButtonGroup>
          <Button size="sm" variant="outline-primary" onClick={() => this.onEditClick(mesero)}>Edit</Button>
          <Button size="sm" variant="outline-danger" onClick={() => this.onDeleteClick(mesero)}>Delete</Button>
        </ButtonGroup>
      </li>
    );
  };

  render() {
    const { loading, error, meseros } = this.props;
    const { showEditor, editorProps, showDeleteConfirmation, deleteConfirmationProps } = this.state;

    if (loading) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    if (error) {
      return (
        <div className="alert alert-danger">
          Error: {error}
        </div>
      )
    }

    return (
      <div>
        <div className="mb-2">
          <Button onClick={this.onAddClick}>Add new mesero</Button>
          <Editor {...editorProps} show={showEditor} onHide={this.hideEditor}/>
        </div>

        <ul className="list-group">
          {meseros.map(this.rendermesero)}
        </ul>

        <DeleteConfirmation
          {...deleteConfirmationProps}
          show={showDeleteConfirmation}
          onHide={this.hideDeleteConfirmation}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, { loadmeseros, onmeseroCreate, onmeseroUpdate, onmeseroRemove })(Mesero);