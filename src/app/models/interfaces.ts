export interface FeedBackMsgs  {
  [key: string]:  string;
}

export interface ButtonConfig {
  buttonName: string;
  clickFn: () => any
}

export interface ModalConfig {
  title: string;
  iconName?: string;
  iconSize?: number;
  fieldSetNames?: string[];
  buttons?: ButtonConfig[];

}