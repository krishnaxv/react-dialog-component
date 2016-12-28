import React, { Component } from 'react';
import { spring, presets } from 'react-motion';
import { DialogManager, AlertDialog, ModalDialog } from '../Dialog';

const style = {
  right: '10%',
  bottom: 0,
  height: '320px'
};

const childrenStyle = {
  padding: '16px'
};

const effectConfig = {
  start: {
    from: {
      scale: 0,
      height: 0
    },
    to: {
      scale: spring(1, presets.wobbly),
      height: spring(320, presets.wobbly)
    }
  },
  end: {
    from: {
      scale: 1,
      height: 320
    },
    to: {
      scale: spring(0, presets.noWobble),
      height: spring(0, presets.noWobble)
    }
  }
};

const effectReducer = value => (
  {
    transform: `scale(${value.scale})`,
    height: `${value.height}px`
  }
);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Just do it!',
      content: 'I said, "Just do it!". Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ut quaerat itaque minus ab quas ipsum iure consequatur voluptatibus architecto assumenda dolores. Beatae, iste?'
    };
    this.onReturnDialog = (dialog) => {
      DialogManager.closeDialog(dialog);
    };
  }
  onShowAlertDialog(effect) {
    DialogManager.showDialog(
      <AlertDialog effect={effect} title={this.state.title} content={this.state.content} returnCallback={dialog => this.onReturnDialog(dialog)} />,
      this.parent
    );
  }

  onShowAlertModalDialog() {
    DialogManager.showDialog(
      <AlertDialog effect="FALL" title={this.state.title} content={this.state.content} returnCallback={dialog => this.onReturnDialog(dialog)} />,
      this.child
    );
  }
  onShowModalDialog() {
    DialogManager.showDialog(
      <ModalDialog effectConfig={effectConfig} effectReducer={value => effectReducer(value)} style={style}>
        <div style={childrenStyle}>Modal Dialog Component</div>
      </ModalDialog>,
      this.parent
    );
    DialogManager.showDialog(
      <ModalDialog effect="FALL">
        <div style={childrenStyle}>Modal Dialog Component</div>
      </ModalDialog>,
      this.parent
    );
  }
  render() {
    const parentStyle = {
      border: '1px solid #f00',
      position: 'relative',
      height: '400px',
      width: '400px',
      overflowY: 'auto'
    };
    const divStyle = {
      marginBottom: '8px'
    };
    const buttonStyle = {
      padding: '8px'
    };
    return (
      <div>
        <div style={divStyle}><button style={buttonStyle} onClick={() => this.onShowAlertDialog('FADE_IN')}>FADE_IN Effect</button></div>
        <div style={divStyle}><button style={buttonStyle} onClick={() => this.onShowAlertDialog('FADE_IN_SCALE')}>FADE_IN_SCALE Effect</button></div>
        <div style={divStyle}><button style={buttonStyle} onClick={() => this.onShowAlertDialog('FALL')}>FALL Effect</button></div>
        <div style={divStyle}><button style={buttonStyle} onClick={() => this.onShowAlertDialog('SIDE_FALL')}>SIDE_FALL Effect</button></div>
        <div style={divStyle}><button style={buttonStyle} onClick={() => this.onShowAlertDialog('SLIDE_IN_TOP')}>SLIDE_IN_TOP Effect</button></div>
        <div style={divStyle}><button style={buttonStyle} onClick={() => this.onShowAlertDialog('SLIDE_IN_RIGHT')}>SLIDE_IN_RIGHT Effect</button></div>
        <div style={divStyle}><button style={buttonStyle} onClick={() => this.onShowAlertDialog('SLIDE_IN_BOTTOM')}>SLIDE_IN_BOTTOM Effect</button></div>
        <div style={divStyle}><button style={buttonStyle} onClick={() => this.onShowAlertDialog('SLIDE_IN_LEFT')}>SLIDE_IN_LEFT Effect</button></div>
        <div style={divStyle}><button style={buttonStyle} onClick={() => this.onShowAlertDialog('ROTATE_IN')}>ROTATE_IN Effect</button></div>
        <div style={divStyle}><button style={buttonStyle} onClick={() => this.onShowModalDialog()}>Show Modal</button></div>
        <div style={divStyle}><button style={buttonStyle} onClick={() => this.onShowAlertModalDialog()}>onShowAlertModalDialog</button></div>
        <div ref={(child) => { this.child = child; }} style={parentStyle}>
          Ci
        </div>
        <div ref={(parent) => { this.parent = parent; }} style={parentStyle}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    );
  }
}

export default Main;
