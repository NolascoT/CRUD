import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { removechef } from '../store';

class DeletechefConfirmation extends Component {

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
    const { chef } = this.props;

    this.setState({ removing: true });

    this.props.removechef(chef.objectId)
      .then(() => this.close())
  };

  render() {
    const { chef, show } = this.props;
    const { removing } = this.state;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header className="bg-danger text-white" closeButton>
          <Modal.Title>
            Delete chef Confirmation
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you seriously want to delete "<b>{chef && chef.nombre}</b>"
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

export default connect(null, { removechef })(DeletechefConfirmation);