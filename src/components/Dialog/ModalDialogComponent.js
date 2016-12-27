import React, { Component, PropTypes } from 'react';
import { Motion } from 'react-motion';
import { assign, clone } from 'lodash';
import DialogManager from './DialogManager';
import Effect, { EffectConfig } from './Effect';

class ModalDialog extends Component {
  static propTypes = {
    effect: PropTypes.string,
    effectConfig: PropTypes.shape(),
    effectReducer: PropTypes.func,
    style: PropTypes.shape()
  }
  constructor(props) {
    super(props);
    const effect = EffectConfig[props.effect] || props.effectConfig;
    this.state = {
      dialog: effect,
      motion: effect.start
    };
  }
  componentDidMount() {
    this.dialogWrapper.classList.add('open');
  }
  onClickDialogBackdrop(e) {
    if (e.target === this.dialogWrapper) {
      this.onCloseDialog();
    }
  }
  onCloseDialog() {
    this.removeDialog();
    DialogManager.closeDialog(true);
  }
  removeDialog() {
    this.dialogWrapper.classList.add('hide');
    this.setState({
      motion: this.state.dialog.end
    });
  }
  render() {
    const effectReducer = Effect[this.props.effect] ? Effect[this.props.effect] : this.props.effectReducer;
    return (
      <Motion defaultStyle={this.state.motion.from} style={this.state.motion.to}>
        {(value) => {
          const style = clone(assign(this.props.style, effectReducer(value)));
          return (
            <div className="dialogWrapper" ref={(dialogWrapper) => { this.dialogWrapper = dialogWrapper; }} onClick={e => this.onClickDialogBackdrop(e)}>
              <section style={style} className="elevationTransition elevationZ24 dialog modalDialog">
                {this.props.children}
              </section>
            </div>
          );
        }}
      </Motion>
    );
  }
}

export default ModalDialog;
