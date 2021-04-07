import { useState } from "react";

//optional onUpdate for each implementation
const useActionStack = (initialValue, onUpdate = undefined) => {
  let value = initialValue;
  const [actionStack, setActionStack] = useState([]);
  const [actionStackPointer, setActionStackPointer] = useState(-1);

  const onAction = (v) => {
    deleteAfterPointer();
    let modProps = {};
    for (const key in v) {
      //saving each value that is about to change
      modProps[key] = value[key];
    }
    setActionStack((prevStack) =>
      prevStack.concat({ execute: v, undo: modProps })
    );
    setActionStackPointer((prevPointer) => prevPointer + 1);
    Object.assign(value, v);
  };

  const onUndo = (step = 1) => {
    if (actionStackPointer - step < -1) {
      return;
    } else {
      for (var i = actionStackPointer; i > actionStackPointer - step; i--) {
        Object.assign(value, actionStack[i].undo);
      }
      setActionStackPointer((prevPointer) => prevPointer - step);
      if (onUpdate !== undefined) onUpdate(value);
    }
  };

  const onRedo = (step = 1) => {
    console.log(actionStackPointer, actionStack);
    if (actionStackPointer + step >= actionStack.length) {
      return;
    } else {
      for (
        var i = actionStackPointer + 1;
        i < actionStackPointer + step + 1;
        i++
      ) {
        console.log(actionStack[i].execute);
        Object.assign(value, actionStack[i].execute);
      }
      setActionStackPointer(actionStackPointer + step);
      if (onUpdate !== undefined) onUpdate(value);
    }
  };

  const deleteAfterPointer = () => {
    console.log(actionStackPointer, actionStack);
    if (actionStackPointer === actionStack.length - 1) return;
    setActionStack((prevStack) =>
      prevStack.filter((_, i) => i <= actionStackPointer)
    );
  };

  const isUndoAvailable = () => actionStackPointer < 0;

  const isRedoAvailable = () => actionStackPointer >= actionStack.length;

  let data = {
    onAction,
    onUndo,
    onRedo,
    isUndoAvailable,
    isRedoAvailable,
    stackLength: actionStack.length,
  };

  if (onUpdate === undefined) data.value = value;

  return data;
};

export { useActionStack };
