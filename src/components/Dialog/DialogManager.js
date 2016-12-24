import React from 'react';  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import AlertDialog from './AlertDialogComponent';  // eslint-disable-line no-unused-vars
import ModalDialog from './ModalDialogComponent';  // eslint-disable-line no-unused-vars

let dialogContainerNode = null;
let Dialog = null;

const DialogManager = {
  renderDialog(component) {
    dialogContainerNode = document.createElement('div');
    document.body.appendChild(dialogContainerNode);
    dialogContainerNode.classList.add('dialogContainer');
    Dialog = ReactDOM.render(component, dialogContainerNode);
  },
  showDialog(component) {
    this.renderDialog(component);
  },
  closeDialog(requestFromModule = false) {
    if (!requestFromModule) {
      Dialog.removeDialog();
    }
    setTimeout(() => {
      try {
        ReactDOM.unmountComponentAtNode(dialogContainerNode);
        document.body.removeChild(dialogContainerNode);
      } catch (e) {
        console.error('%c DialogManager.closeDialog() method is invoked after the dialog is destroyed. [Possible Reason] You are passing closeOnAction prop as true and invoking DialogManager.closeDialog() at the same time.', 'color: white; font-weight: bold;');  // eslint-disable-line no-console
        console.error(e.message);  // eslint-disable-line no-console
      }
    }, 500);
  }
};

export default DialogManager;
