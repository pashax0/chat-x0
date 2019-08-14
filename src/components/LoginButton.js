import React from 'react';
import Modal from '@material-ui/core/Modal';

import LoginForm from './LoginForm';

export default function LoginButton(props) {
  const { onLogin } = props;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <button type="button" onClick={handleOpen}>
        login
      </button>
      <Modal
        className="modal"
        disableAutoFocus={true}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <LoginForm
          onLogin={onLogin}
        />
      </Modal>
    </>
  )
}
