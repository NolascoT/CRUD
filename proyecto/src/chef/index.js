import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Backendless from 'backendless';

import { loadchefs, getchefs, onchefCreate, onchefUpdate, onchefRemove } from '../store';

import Editor from './editor';
import DeleteConfirmation from './delete-confirmation';

const mapStateToProps = state => {
  const { loading, loaded, error, list: chefs } = getchefs(state);

  return {
    loading,
    loaded,
    error,
    chefs
  }
};

class Chef extends Component {

  state = {
    showEditor : false,
    editorProps: null,

    showDeleteConfirmation : false,
    deleteConfirmationProps: null,
  };

  showEditor = chef => this.setState({ showEditor: true, editorProps: { chef } });
  hideEditor = () => this.setState({ showEditor: false, editorProps: null });

  showDeleteConfirmation = chef => this.setState({ showDeleteConfirmation : true, deleteConfirmationProps: { chef } });
  hideDeleteConfirmation = () => this.setState({ showDeleteConfirmation: false, deleteConfirmationProps: null });

  componentWillMount(){
    this.props.loadchefs();

    this.chefRT = Backendless.Data.of('chef').rt();

    this.chefRT.addCreateListener(this.props.onchefCreate);
    this.chefRT.addUpdateListener(this.props.onchefUpdate);
    this.chefRT.addDeleteListener(this.props.onchefRemove);
  }

  componentWillUnmount(){
    this.chefRT.removeCreateListener(this.props.onchefCreate);
    this.chefRT.removeUpdateListener(this.props.onchefUpdate);
    this.chefRT.removeDeleteListener(this.props.onchefRemove);
  }

  onAddClick = () => this.showEditor(null);
  onEditClick = chef => this.showEditor(chef);
  onDeleteClick = chef => this.showDeleteConfirmation(chef);

  renderchef = chef => {
    return (
      <li key={chef.objectId} onClick={() => {}} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div>{chef.nombre}</div>
          <div className="text-muted small">{chef.apellidop}</div>
          <div className="text-muted small">{chef.apellidom}</div>
          <div className="text-muted small">{chef.matricula}</div>
          <div className="text-muted small">{chef.sueldo}</div>
          <div className="text-muted small">{chef.cargo}</div>
          <div className="text-muted small">{chef.especialidad}</div>
        </div>

        <ButtonGroup>
          <Button size="sm" variant="outline-primary" onClick={() => this.onEditClick(chef)}>Edit</Button>
          <Button size="sm" variant="outline-danger" onClick={() => this.onDeleteClick(chef)}>Delete</Button>
        </ButtonGroup>
      </li>
    );
  };

  render() {
    const { loading, error, chefs } = this.props;
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
          <Button onClick={this.onAddClick}>Add new chef</Button>
          <Editor {...editorProps} show={showEditor} onHide={this.hideEditor}/>
        </div>

        <ul className="list-group">
          {chefs.map(this.renderchef)}
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

export default connect(mapStateToProps, { loadchefs, onchefCreate, onchefUpdate, onchefRemove })(Chef);