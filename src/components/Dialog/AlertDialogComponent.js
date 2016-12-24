import React, { Component, PropTypes } from 'react';
import { Motion } from 'react-motion';
import DialogManager from './DialogManager';
import Effect, { EffectConfig } from './Effect';

class AlertDialog extends Component {
  static propTypes = {
    effect: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    returnCallback: PropTypes.func,
    closeOnAction: PropTypes.bool
  }
  constructor(props) {
    super(props);
    const effect = EffectConfig[props.effect];
    this.state = {
      dialog: effect,
      motion: effect.start
    };
  }
  componentDidMount() {
    this.dialogWrapper.classList.add('open');
  }
  onCloseDialog() {
    this.removeDialog();
    DialogManager.closeDialog(true);
  }
  onCloseDialogNotify() {
    if (this.props.closeOnAction) {
      this.removeDialog();
      DialogManager.closeDialog();
    }
    this.props.returnCallback();
  }
  removeDialog() {
    this.dialogWrapper.classList.add('hide');
    this.setState({
      motion: this.state.dialog.end
    });
  }
  render() {
    return (
      <Motion defaultStyle={this.state.motion.from} style={this.state.motion.to}>
        {(value) => {
          const style = Effect[this.props.effect](value);
          return (
            <div className="dialogWrapper" ref={(dialogWrapper) => { this.dialogWrapper = dialogWrapper; }}>
              <section style={style} className="elevationTransition elevationZ24 dialog alertDialog">
                <h3 className="alertDialogTitle">{this.props.title}</h3>
                <section className="alertDialogContent">{this.props.content}</section>
                <section className="alertDialogActions">
                  <button onClick={() => this.onCloseDialogNotify()}>Do it!</button>
                  <button onClick={() => this.onCloseDialog()}>Cancel</button>
                </section>
              </section>
            </div>
          );
        }}
      </Motion>
    );
  }
}

export default AlertDialog;
