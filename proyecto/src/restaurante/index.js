import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Backendless from 'backendless';

import { loadrestaurantes, getrestaurantes, onrestauranteCreate, onrestauranteUpdate, onrestauranteRemove } from '../store';

import Editor from './editor';
import DeleteConfirmation from './delete-confirmation';

const mapStateToProps = state => {
  const { loading, loaded, error, list: restaurantes } = getrestaurantes(state);

  return {
    loading,
    loaded,
    error,
    restaurantes
  }
};

class Restaurante extends Component {

  state = {
    showEditor : false,
    editorProps: null,

    showDeleteConfirmation : false,
    deleteConfirmationProps: null,
  };

  showEditor = restaurante => this.setState({ showEditor: true, editorProps: { restaurante } });
  hideEditor = () => this.setState({ showEditor: false, editorProps: null });

  showDeleteConfirmation = restaurante => this.setState({ showDeleteConfirmation : true, deleteConfirmationProps: { restaurante } });
  hideDeleteConfirmation = () => this.setState({ showDeleteConfirmation: false, deleteConfirmationProps: null });

  componentWillMount(){
    this.props.loadrestaurantes();

    this.restauranteRT = Backendless.Data.of('restaurante').rt();

    this.restauranteRT.addCreateListener(this.props.onrestauranteCreate);
    this.restauranteRT.addUpdateListener(this.props.onrestauranteUpdate);
    this.restauranteRT.addDeleteListener(this.props.onrestauranteRemove);
  }

  componentWillUnmount(){
    this.restauranteRT.removeCreateListener(this.props.onrestauranteCreate);
    this.restauranteRT.removeUpdateListener(this.props.onrestauranteUpdate);
    this.restauranteRT.removeDeleteListener(this.props.onrestauranteRemove);
  }

  onAddClick = () => this.showEditor(null);
  onEditClick = restaurante => this.showEditor(restaurante);
  onDeleteClick = restaurante => this.showDeleteConfirmation(restaurante);

  renderrestaurante = restaurante => {
    return (
      <li key={restaurante.objectId} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div>{restaurante.nombre}</div>
          <div className="text-muted small">{restaurante.domicilio}</div>
        </div>

        <ButtonGroup>
          <Button size="sm" variant="outline-primary" onClick={() => this.onEditClick(restaurante)}>Edit</Button>
          <Button size="sm" variant="outline-danger" onClick={() => this.onDeleteClick(restaurante)}>Delete</Button>
        </ButtonGroup>
      </li>
    );
  };

  render() {
    const { loading, error, restaurantes } = this.props;
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
          <Button onClick={this.onAddClick}>Add new restaurante</Button>
          <Editor {...editorProps} show={showEditor} onHide={this.hideEditor}/>
        </div>

        <ul className="list-group">
          {restaurantes.map(this.renderrestaurante)}
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

export default connect(mapStateToProps, { loadrestaurantes, onrestauranteCreate, onrestauranteUpdate, onrestauranteRemove })(Restaurante);