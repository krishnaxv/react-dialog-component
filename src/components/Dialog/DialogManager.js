import React from 'react';  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import AlertDialog from './AlertDialogComponent';  // eslint-disable-line no-unused-vars
import ModalDialog from './ModalDialogComponent';  // eslint-disable-line no-unused-vars

let dialogContainerNode;
let dialogParentElement;
const dialogDefaultParentElement = document.body;
let dialogParentElementHeight;

class DialogManager {
  static showDialog(component, parentElement = dialogDefaultParentElement) {
    this.renderDialog(component, parentElement);
  }

  static renderDialog(component, parentElement) {
    dialogParentElement = parentElement;
    if (dialogParentElement === dialogDefaultParentElement) {
      dialogParentElementHeight = dialogParentElement.style.height;
      dialogParentElement.style.height = '100vh';
    }
    dialogParentElement.style.overflow = 'hidden';
    dialogContainerNode = document.createElement('div');
    dialogParentElement.appendChild(dialogContainerNode);
    dialogContainerNode.classList.add('dialogContainer');
    ReactDOM.render(component, dialogContainerNode);
  }

  static setDialogPosition(dialogWrapper) {
    const dialogWrapperCopy = dialogWrapper;
    if (dialogParentElement === dialogDefaultParentElement) {
      dialogWrapperCopy.style.position = 'fixed';
    } else {
      dialogWrapperCopy.style.position = 'absolute';
      dialogWrapperCopy.style.transform = `translateY(${dialogParentElement.scrollTop}px)`;
    }
  }

  static closeDialog(componentReference, requestFromModule = false) {
    if (!requestFromModule) {
      // TODO: Dialog is the latest Dialog instance
      componentReference.removeDialog();
    }
    const dialogWrapper = componentReference.dialogWrapper;
    setTimeout(() => {
      try {
        if (dialogParentElement === dialogDefaultParentElement) {
          dialogParentElement.style.height = dialogParentElementHeight;
        }
        const dialogParentNode = dialogWrapper.parentNode;
        ReactDOM.unmountComponentAtNode(dialogParentNode);
        dialogParentNode.parentNode.removeChild(dialogParentNode);
        const isDialogInParentNode = dialogParentElement.querySelector('.dialogContainer');
        if (isDialogInParentNode === null) {
          dialogParentElement.style.overflow = 'auto';
        }
      } catch (e) {
        console.error('%c React Dialog Component Error:', 'color: red; font-weight: bold;', e);  // eslint-disable-line no-console
      }
    }, 500);
  }
}

export default DialogManager;
