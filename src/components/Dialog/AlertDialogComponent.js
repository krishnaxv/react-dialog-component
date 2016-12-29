import React, { Component, PropTypes } from 'react';
import { Motion } from 'react-motion';
import DialogManager from './DialogManager';
import Effect, { EffectConfig } from './Effect';

class AlertDialog extends Component {
  static propTypes = {
    effect: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape()
    ]),
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    returnCallback: PropTypes.func,
    closeOnAction: PropTypes.bool
  }
  constructor(props) {
    super(props);
    const effect = typeof (props.effect) === 'string' ? EffectConfig[props.effect] || 'FADE_IN' : props.effect.config;
    this.state = {
      dialog: effect,
      motion: effect.start
    };
  }
  componentDidMount() {
    this.dialogWrapper.classList.add('open');
    DialogManager.setDialogPosition(this.dialogWrapper);
  }
  onClickDialogBackdrop(e) {
    if (e.target === this.dialogWrapper) {
      this.onCloseDialog();
    }
  }
  onCloseDialog() {
    this.removeDialog();
    DialogManager.closeDialog(this, true);
  }
  onCloseDialogNotify() {
    if (this.props.closeOnAction) {
      this.onCloseDialog();
    }
    this.props.returnCallback(this);
  }
  removeDialog() {
    this.dialogWrapper.classList.add('hide');
    this.setState({
      motion: this.state.dialog.end
    });
  }
  render() {
    const effectReducer = Effect[this.props.effect] ? Effect[this.props.effect] : this.props.effect.reducer;
    return (
      <Motion defaultStyle={this.state.motion.from} style={this.state.motion.to}>
        {(value) => {
          const style = effectReducer(value);
          return (
            <div className="dialogWrapper" ref={(dialogWrapper) => { this.dialogWrapper = dialogWrapper; }} onClick={e => this.onClickDialogBackdrop(e)}>
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
