import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { removeplatillo } from '../store';

class DeleteplatilloConfirmation extends Component {

  state = {
    removing: false,
  };

  close = () => {
    this.setState({
      removing: false,
    });

    this.props.onHide()
  };

  confirm = () => {
    const { platillo } = this.props;

    this.setState({ removing: true });

    this.props.removeplatillo(platillo.objectId)
      .then(() => this.close())
  };

  render() {
    const { platillo, show } = this.props;
    const { removing } = this.state;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header className="bg-danger text-white" closeButton>
          <Modal.Title>
            Delete platillo Confirmation
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you seriously want to delete "<b>{platillo && platillo.nombre}</b>"
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.close} disabled={removing}>No</Button>
          <Button variant="danger" onClick={this.confirm} disabled={removing}>Yes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(null, { removeplatillo })(DeleteplatilloConfirmation);