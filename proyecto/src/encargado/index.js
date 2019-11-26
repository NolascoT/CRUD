import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Backendless from 'backendless';

import { loadencargados, getencargados, onencargadoCreate, onencargadoUpdate, onencargadoRemove } from '../store';

import Editor from './editor';
import DeleteConfirmation from './delete-confirmation';

const mapStateToProps = state => {
  const { loading, loaded, error, list: encargados } = getencargados(state);

  return {
    loading,
    loaded,
    error,
    encargados
  }
};

class Encargado extends Component {

  state = {
    showEditor : false,
    editorProps: null,

    showDeleteConfirmation : false,
    deleteConfirmationProps: null,
  };

  showEditor = encargado => this.setState({ showEditor: true, editorProps: { encargado } });
  hideEditor = () => this.setState({ showEditor: false, editorProps: null });

  showDeleteConfirmation = encargado => this.setState({ showDeleteConfirmation : true, deleteConfirmationProps: { encargado } });
  hideDeleteConfirmation = () => this.setState({ showDeleteConfirmation: false, deleteConfirmationProps: null });

  componentWillMount(){
    this.props.loadencargados();

    this.encargadoRT = Backendless.Data.of('encargado').rt();

    this.encargadoRT.addCreateListener(this.props.onencargadoCreate);
    this.encargadoRT.addUpdateListener(this.props.onencargadoUpdate);
    this.encargadoRT.addDeleteListener(this.props.onencargadoRemove);
  }

  componentWillUnmount(){
    this.encargadoRT.removeCreateListener(this.props.onencargadoCreate);
    this.encargadoRT.removeUpdateListener(this.props.onencargadoUpdate);
    this.encargadoRT.removeDeleteListener(this.props.onencargadoRemove);
  }

  onAddClick = () => this.showEditor(null);
  onEditClick = encargado => this.showEditor(encargado);
  onDeleteClick = encargado => this.showDeleteConfirmation(encargado);

  renderencargado = encargado => {
    return (
      <li key={encargado.objectId} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div>{encargado.nombre}</div>
          <div className="text-muted small">{encargado.apellidop}</div>
          <div className="text-muted small">{encargado.apellidom}</div>
          <div className="text-muted small">{encargado.apellidom}</div>
          <div className="text-muted small">{encargado.matricula}</div>
          <div className="text-muted small">{encargado.sucursal}</div>
        </div>

        <ButtonGroup>
          <Button size="sm" variant="outline-primary" onClick={() => this.onEditClick(encargado)}>Edit</Button>
          <Button size="sm" variant="outline-danger" onClick={() => this.onDeleteClick(encargado)}>Delete</Button>
        </ButtonGroup>
      </li>
    );
  };

  render() {
    const { loading, error, encargados } = this.props;
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
          <Button onClick={this.onAddClick}>Add new encargado</Button>
          <Editor {...editorProps} show={showEditor} onHide={this.hideEditor}/>
        </div>

        <ul className="list-group">
          {encargados.map(this.renderencargado)}
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

export default connect(mapStateToProps, { loadencargados, onencargadoCreate, onencargadoUpdate, onencargadoRemove })(Encargado);