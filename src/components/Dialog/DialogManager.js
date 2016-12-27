import React from 'react';  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import AlertDialog from './AlertDialogComponent';  // eslint-disable-line no-unused-vars
import ModalDialog from './ModalDialogComponent';  // eslint-disable-line no-unused-vars

let dialogContainerNode;
let Dialog;
let dialogParentElement;
const dialogDefaultParentElement = document.body;
let dialogParentElementHeight;
let scrollTop;
let dialogWrapperElement;

const DialogManager = {
  renderDialog(component, parentElement = dialogDefaultParentElement) {
    dialogParentElement = parentElement;
    if (dialogParentElement === dialogDefaultParentElement) {
      dialogParentElementHeight = dialogParentElement.style.height;
      dialogParentElement.style.height = '100vh';
    }
    dialogParentElement.style.overflowY = 'hidden';
    dialogContainerNode = document.createElement('div');
    dialogParentElement.appendChild(dialogContainerNode);
    dialogContainerNode.classList.add('dialogContainer');
    Dialog = ReactDOM.render(component, dialogContainerNode);
    dialogWrapperElement = document.querySelector('.dialogWrapper');
    if (dialogParentElement === dialogDefaultParentElement) {
      dialogWrapperElement.style.position = 'fixed';
    } else {
      dialogWrapperElement.style.position = 'absolute';
      scrollTop = dialogParentElement.scrollTop;
      dialogWrapperElement.style.transform = `translateY(${scrollTop}px)`;
    }
  },
  showDialog(component, parentElement = dialogDefaultParentElement) {
    this.renderDialog(component, parentElement);
  },
  closeDialog(requestFromModule = false) {
    if (!requestFromModule) {
      Dialog.removeDialog();
    }
    setTimeout(() => {
      try {
        if (dialogParentElement === dialogDefaultParentElement) {
          dialogParentElement.style.height = dialogParentElementHeight;
        }
        dialogParentElement.style.overflowY = 'auto';
        ReactDOM.unmountComponentAtNode(dialogContainerNode);
        dialogParentElement.removeChild(dialogContainerNode);
      } catch (e) {
        console.error('%c DialogManager.closeDialog() method is invoked after the dialog is destroyed. [Possible Reason] You are passing closeOnAction prop as true and invoking DialogManager.closeDialog() at the same time.', 'color: white; font-weight: bold;');  // eslint-disable-line no-console
        console.error(e.message);  // eslint-disable-line no-console
      }
    }, 500);
  }
};

export default DialogManager;
