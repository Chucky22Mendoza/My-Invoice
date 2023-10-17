import React from 'react';
import Image from 'next/image';
import IInputText, { IInputTextBlocked } from '@/interfaces/InputText';
import styles from './input.module.css';

type Props = {
  propsInput: IInputText;
  style?: object;
  floatElement?: React.ReactElement;
  value: string;
};

function InputText({ propsInput, style, floatElement, value }: Props) {
  return (
    <div className={styles['input-container']} style={style}>
      {
        propsInput.label !== ''
          ? <label htmlFor={propsInput.id}>{propsInput.label}</label>
          : null
      }
      <input
        id={propsInput.id}
        name={propsInput.id}
        type={propsInput.type}
        placeholder={propsInput.placeholder}
        onChange={propsInput.onChange}
        onKeyUp={propsInput.onKeyUp}
        onKeyDown={propsInput.onKeyDown}
        onKeyPress={propsInput.onKeyPress}
        disabled={propsInput.disabled}
        value={value}
      />
      {floatElement}
    </div>
  );
}

type PropsBlocked = {
  propsInput: IInputTextBlocked;
  style?: object;
};

InputText.defaultProps = {
  style: {},
  floatElement: null,
};

export function InputBlocked({ propsInput, style }: PropsBlocked) {
  return (
    <div className={styles['input-blocked']} style={style}>
      <label htmlFor={propsInput.id}>{propsInput.label}</label>
      <input
        id={propsInput.id}
        name={propsInput.id}
        type={propsInput.type}
        placeholder={propsInput.placeholder}
        disabled
        value={propsInput.value}
      />
      <Image src="/img/profile_menu/lock.svg" alt="disabled" width={24} height={24} />
    </div>
  );
}

InputBlocked.defaultProps = {
  style: {},
};

type IOption = {
  value: number;
  label: string;
};

type PropsSelect = {
  propsInput: IInputText;
  style?: object;
  options: IOption[];
};

export function InputSelect({ propsInput, style, options }: PropsSelect) {
  return (
    <div className={styles['input-container']} style={style}>
      <label htmlFor={propsInput.id}>{propsInput.label}</label>
      <select
        id={propsInput.id}
        name={propsInput.id}
        onChange={propsInput.onChangeSelect}
      >
        {
          options.map((opt: IOption) => (
            <option key={`${opt.value}-option-gender`} value={opt.value}>{opt.label}</option>
          ))
        }
      </select>
    </div>
  );
}

InputSelect.defaultProps = {
  style: {},
};

export default InputText;
