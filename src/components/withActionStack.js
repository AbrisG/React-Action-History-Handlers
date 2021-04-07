import { Component } from "react";

const withActionStack = (WrappedComponent, { initialValue, onUpdate }) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        val: initialValue,
        actionStackPointer: -1,
        actionStack: [],
      };

      this.onAction = this.onAction.bind(this);
      this.onUndo = this.onUndo.bind(this);
      this.onRedo = this.onRedo.bind(this);
      this.isUndoAvailable = this.isUndoAvailable.bind(this);
      this.isRedoAvailable = this.isRedoAvailable.bind(this);
    }

    onAction = (value) => {
      this.deleteAfterPointer();
      this.setState(
        (state) => {
          let modProps = {};
          for (const key in value) {
            modProps[key] = state.val[key];
          }
          return {
            val: { ...state.val, ...value },
            actionStack: state.actionStack.concat({
              execute: value,
              undo: modProps,
            }),
            actionStackPointer: state.actionStackPointer + 1,
          };
        },
        () =>
          console.log(
            this.state.val,
            this.state.actionStack[this.state.actionStack.length - 1]
          )
      );
    };

    onUndo = (step = 1) => {
      if (this.state.actionStackPointer - step < -1) {
        return;
      } else {
        this.setState((state) => {
          let updatedVal = state.val;
          for (
            var i = state.actionStackPointer;
            i > state.actionStackPointer - step;
            i--
          ) {
            //merging the state.val and the undo state repeatedly
            updatedVal = { ...updatedVal, ...state.actionStack[i].undo };
          }
          return {
            val: updatedVal,
            actionStackPointer: state.actionStackPointer - step,
          };
        });
        if (onUpdate !== undefined) onUpdate(this.state.val);
      }
    };

    isUndoAvailable = () => this.state.actionStackPointer > 0;

    onRedo = (step = 1) => {
      if (
        this.state.actionStackPointer + step >=
        this.state.actionStack.length
      ) {
        return;
      } else {
        this.setState((state) => {
          let updatedVal = state.val;
          for (
            var i = state.actionStackPointer + 1;
            i < state.actionStackPointer + step + 1;
            i++
          ) {
            updatedVal = { ...updatedVal, ...state.actionStack[i].execute };
          }
          return {
            val: updatedVal,
            actionStackPointer: state.actionStackPointer + step,
          };
        });
        if (onUpdate !== undefined) onUpdate(this.state.val);
      }
    };

    isRedoAvailable = () =>
      this.state.actionStackPointer < this.state.actionStack.length - 1;

    deleteAfterPointer = () => {
      this.setState((state) => ({
        actionStack: state.actionStack.filter(
          (_, i) => i <= state.actionStackPointer
        ),
      }));
    };

    render() {
      let data = {
        onAction: this.onAction,
        onUndo: this.onUndo,
        onRedo: this.onRedo,
        isUndoAvailable: this.isUndoAvailable,
        isRedoAvailable: this.isRedoAvailable,
        stackLength: this.state.actionStack.length,
      };
      if (onUpdate === undefined) data.value = this.state.val;
      return <WrappedComponent actionstack={data} {...this.props} />;
    }
  };
};

export default withActionStack;
