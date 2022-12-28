export interface FeedBackMsgs  {
  [key: string]:  string;
}

export interface ButtonConfig {
  buttonName: string;
  clickFn: () => any
}

export interface ModalInput {
  formControlName: string;
  controlName: string;
  label: string;
  type: string;
  hidden: boolean;
  valid?: boolean;
  invalid?: boolean;
  feedBackMsg?: string;
  showFeedback?: boolean;
}

export interface ModalConfig {
  title: string;
  iconName?: string;
  iconSize?: number;
  fieldsetNames: string[];
  modalButtons: ButtonConfig[];
  modalInputs: ModalInput[];
}