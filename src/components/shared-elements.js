import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import { useStore } from '../context/global-state';

function SharedElements() {
  const { state, dispatch } = useStore();
  return (
    <>
      {state.modal.isOpen && (
        <Modal
          isOpen={state.modal.isOpen}
          onClose={() =>
            state.modal.closable &&
            dispatch({ type: 'SET_MODAL', payload: { isOpen: false } })
          }
          {...state.modal.otherProps}
        >
          {state.modal.overlay && <ModalOverlay />}
          <ModalContent>{state.modal.content}</ModalContent>
        </Modal>
      )}
    </>
  );
}

export default SharedElements;
