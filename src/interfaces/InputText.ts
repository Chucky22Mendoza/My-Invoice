export default interface IInputText {
  id: string;
  type?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IInputTextBlocked {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  value: string;
}
