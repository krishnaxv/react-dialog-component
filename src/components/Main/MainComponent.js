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
      height: 0
    },
    to: {
      height: spring(320, presets.wobbly)
    }
  },
  end: {
    from: {
      height: 320
    },
    to: {
      height: spring(0, presets.noWobble)
    }
  }
};

const effectReducer = value => (
  {
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
    this.onReturnDialog = () => {
      console.log('Dialog is closed.');  // eslint-disable-line no-console
      // DialogManager.closeDialog();
    };
  }
  onShowAlertDialog(effect) {
    DialogManager.showDialog(
      <AlertDialog effect={effect} title={this.state.title} content={this.state.content} returnCallback={() => this.onReturnDialog()} closeOnAction />
    );
  }
  onShowModalDialog() {
    DialogManager.showDialog(
      <ModalDialog effectConfig={effectConfig} effectReducer={value => effectReducer(value)} style={style}>
        <div style={childrenStyle}>Modal Dialog Component</div>
      </ModalDialog>
    );
  }
  render() {
    const parentStyle = {
      position: 'relative',
      height: '400px',
      width: '400px'
    };
    const divStyle = {
      marginBottom: '16px'
    };
    const buttonStyle = {
      display: 'block',
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
        <div ref={(parent) => { this.parent = parent; }} style={parentStyle} />
      </div>
    );
  }
}

export default Main;
