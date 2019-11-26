import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Backendless from 'backendless';

import { loadplatillos, getplatillos, onplatilloCreate, onplatilloUpdate, onplatilloRemove } from '../store';

import Editor from './editor';
import DeleteConfirmation from './delete-confirmation';

const mapStateToProps = state => {
  const { loading, loaded, error, list: platillos } = getplatillos(state);

  return {
    loading,
    loaded,
    error,
    platillos
  }
};

class Platillo extends Component {

  state = {
    showEditor : false,
    editorProps: null,

    showDeleteConfirmation : false,
    deleteConfirmationProps: null,
  };

  showEditor = platillo => this.setState({ showEditor: true, editorProps: { platillo } });
  hideEditor = () => this.setState({ showEditor: false, editorProps: null });

  showDeleteConfirmation = platillo => this.setState({ showDeleteConfirmation : true, deleteConfirmationProps: { platillo } });
  hideDeleteConfirmation = () => this.setState({ showDeleteConfirmation: false, deleteConfirmationProps: null });

  componentWillMount(){
    this.props.loadplatillos();

    this.platilloRT = Backendless.Data.of('platillo').rt();

    this.platilloRT.addCreateListener(this.props.onplatilloCreate);
    this.platilloRT.addUpdateListener(this.props.onplatilloUpdate);
    this.platilloRT.addDeleteListener(this.props.onplatilloRemove);
  }

  componentWillUnmount(){
    this.platilloRT.removeCreateListener(this.props.onplatilloCreate);
    this.platilloRT.removeUpdateListener(this.props.onplatilloUpdate);
    this.platilloRT.removeDeleteListener(this.props.onplatilloRemove);
  }

  onAddClick = () => this.showEditor(null);
  onEditClick = platillo => this.showEditor(platillo);
  onDeleteClick = platillo => this.showDeleteConfirmation(platillo);

  renderplatillo = platillo => {
    return (
      <li key={platillo.objectId} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div>{platillo.nombre}</div>
          <div className="text-muted small">{platillo.precio}</div>
          <div className="text-muted small">{platillo.descripcion}</div>
        </div>

        <ButtonGroup>
          <Button size="sm" variant="outline-primary" onClick={() => this.onEditClick(platillo)}>Edit</Button>
          <Button size="sm" variant="outline-danger" onClick={() => this.onDeleteClick(platillo)}>Delete</Button>
        </ButtonGroup>
      </li>
    );
  };

  render() {
    const { loading, error, platillos } = this.props;
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
          <Button onClick={this.onAddClick}>Add new platillo</Button>
          <Editor {...editorProps} show={showEditor} onHide={this.hideEditor}/>
        </div>

        <ul className="list-group">
          {platillos.map(this.renderplatillo)}
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

export default connect(mapStateToProps, { loadplatillos, onplatilloCreate, onplatilloUpdate, onplatilloRemove })(Platillo);