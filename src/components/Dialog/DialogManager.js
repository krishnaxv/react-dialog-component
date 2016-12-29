import React from 'react';  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { forEach } from 'lodash';
import AlertDialog from './AlertDialogComponent';  // eslint-disable-line no-unused-vars
import ModalDialog from './ModalDialogComponent';  // eslint-disable-line no-unused-vars

/**
 * Handles base methods of dialog component
 */
class DialogManager {
  constructor() {
    this.dialogContainer = null;
    this.defaultDialogParent = document.body;
    this.dialogParent = null;
    this.dialogParentHeight = null;
  }

  /**
   * Delegates the call to `renderDialog` to show the requested dialog component.
   * @param {object} component - React dialog component
   * @param {object} [dialogParent=document.body] - Parent DOMNode of the dialog component
   */
  static showDialog(component, dialogParent = this.defaultDialogParent) {
    return this.renderDialog(component, dialogParent);
  }

  /**
   * Render the dialog component.
   * @param {object} component - React dialog component
   * @param {object} dialogParent - Parent DOMNode of the dialog component
   */
  static renderDialog(component, dialogParent) {
    this.dialogParent = dialogParent;
    if (this.dialogParent === this.defaultDialogParent) {
      // Save default height of `dialogParent` i.e `document.body` to restore later when dialog component will be closed
      this.dialogParentHeight = this.getDOMNodeStyle(this.dialogParent, 'height');
      this.setDOMNodeStyle(
        this.dialogParent,
        {
          height: '100vh'
        }
      );
    }
    this.setDOMNodeStyle(
      this.dialogParent,
      {
        overflow: 'hidden'
      }
    );
    // Create container DOMNode of dialog component
    this.createDialogContainer();
    // Render dialog component
    return ReactDOM.render(component, this.dialogContainer);  // eslint-disable-line react/no-render-return-value
  }

  /**
   * Create container DOMNode for the dialog component.
   */
  static createDialogContainer() {
    this.dialogContainer = document.createElement('div');
    this.dialogParent.appendChild(this.dialogContainer);
    this.dialogContainer.classList.add('dialogContainer');
  }

  /**
   * Set position of the dialog component.
   * @param {object} dialogWrapper - Wrapper element of the dialog component
   */
  static setDialogPosition(dialogWrapper) {
    if (this.dialogParent === this.defaultDialogParent) {
      this.setDOMNodeStyle(
        dialogWrapper,
        {
          position: 'fixed'
        }
      );
    } else {
      this.setDOMNodeStyle(
        dialogWrapper,
        {
          position: 'absolute',
          transform: `translateY(${this.dialogParent.scrollTop}px)`
        }
      );
    }
  }

  /**
   * Set style property of input DOMNode.
   * @param {object} element - DOMNode
   * @param {object} style - CSS style property(ies)
   */
  static setDOMNodeStyle(element, style) {
    forEach(style, (value, property) => {
      element.style[property] = value;  // eslint-disable-line no-param-reassign
    });
  }

  /**
   * Get style property value of input DOMNode.
   * @param {object} element - DOMNode
   * @param {string} property - CSS style property
   * @return {string} - CSS style property value
   */
  static getDOMNodeStyle(element, property) {
    return element.style[property];
  }

  /**
   * Get dialog component container DOMNode.
   * @param {object} element - Parent DOMNode
   * @return {object|null} - CSS style property value
   */
  static getDialogContainer(element) {
    return element.querySelector('.dialogContainer');
  }

  /**
   * Close dialog component.
   * @param {object} component - Dialog component reference
   * @param {boolean} [requestFromModule=false] - Indicates whether close dialog request has been triggered by the user externally or internally from any of the module method
   */
  static closeDialog(component, requestFromModule = false) {
    // If dialog close request is triggered by the user i.e. `requestFromModule` is false, trigger leave animation before unmounting the dialog component
    if (!requestFromModule) {
      // Trigger leave animation
      component.removeDialog();
    }
    setTimeout(() => {
      try {
        if (this.dialogParent === this.defaultDialogParent) {
          // Reset height of `dialogParent`
          this.setDOMNodeStyle(
            this.dialogParent,
            {
              height: this.dialogParentHeight
            }
          );
        }
        const dialogContainer = component.dialogWrapper.parentNode;
        // Unmount dialog component
        ReactDOM.unmountComponentAtNode(dialogContainer);
        // Remove dialog component container from DOM
        dialogContainer.parentNode.removeChild(dialogContainer);
        // Get dialog component container
        const isDialogInParent = this.getDialogContainer(this.dialogParent);
        if (isDialogInParent === null) {
          this.setDOMNodeStyle(
            this.dialogParent,
            {
              overflow: 'auto'
            }
          );
        }
      } catch (e) {
        // Log error in console
        console.error('%c React Dialog Component Module Error\n', 'color: red; font-weight: bold;', e);  // eslint-disable-line no-console
      }
    }, 500);
  }
}

export default DialogManager;
