import React, { useState } from 'react';
import './styles.scss';

const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;// point of conditional rendering, we will pass whether or not it is hidden up through props via a call back seen below. this will change the state of hideModal, which will then be sent down to here via props

  return (
    <>
      <div className="modalOverlay" onClick={() => toggleModal(true)} />
      <div className="modal">
        {children}
      </div>
    </>
  );
}

export default Modal; 