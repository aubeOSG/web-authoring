import React from "react";

export type GenericEvent =
  | Event
  | React.ChangeEvent
  | React.DragEvent
  | React.FormEvent
  | React.FocusEvent
  | React.KeyboardEvent
  | React.MouseEvent
  | React.TouchEvent
  | React.WheelEvent
  | React.PointerEvent;

export type ELEM_ALIGNMENT = 
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'center-top'
  | 'center-center'
  | 'center-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';

  export type AsyncForEachResult<T> = {
    error: boolean;
    data: T;
    result: unknown;
  }