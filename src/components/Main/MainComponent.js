import React, { Component } from 'react';
import { DialogManager, AlertDialog, ModalDialog } from '../Dialog';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Just do it!',
      content: 'I said, "Just do it!". Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ut quaerat itaque minus ab quas ipsum iure consequatur voluptatibus architecto assumenda dolores, eveniet error deleniti iusto iste repudiandae. Beatae, iste?'
    };
    this.onReturnDialog = () => {
      console.log('Dialog is closed.');  // eslint-disable-line no-console
      // DialogManager.closeDialog();
    };
  }
  onShowAlertDialog() {
    DialogManager.showDialog(
      <AlertDialog effect="SIDE_FALL" title={this.state.title} content={this.state.content} returnCallback={() => this.onReturnDialog()} closeOnAction />
    );
  }
  onShowModalDialog() {
    const style = {
      right: '10%',
      bottom: 0
    };
    const childrenStyle = {
      padding: '16px'
    };
    DialogManager.showDialog(
      <ModalDialog effect="ROTATE_IN" style={style}>
        <div style={childrenStyle}>Modal Dialog Component</div>
      </ModalDialog>
    );
  }
  render() {
    return (
      <div>
        <button onClick={() => this.onShowAlertDialog()}>Show Alert</button>
        <button onClick={() => this.onShowModalDialog()}>Show Modal</button>
      </div>
    );
  }
}

export default Main;
