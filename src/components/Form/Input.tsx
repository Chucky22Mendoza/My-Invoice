import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './input.module.css';
import IInputText, { IInputTextBlocked } from '@/interfaces/InputText';

type Props = {
  propsInput: IInputText;
  style?: object;
  floatElement?: React.ReactElement | null;
  helper?: string | null;
  isInvalid?: boolean;
  onChange?: (value: string) => void;
};

function InputText({
  propsInput,
  style = {},
  floatElement = null,
  onChange = () => {},
  helper = null,
  isInvalid = false,
}: Props) {
  const [currentValue, setCurrentValue] = useState(propsInput.value ?? '');

  useEffect(() => {
    if (onChange) {
      onChange(currentValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  useEffect(() => setCurrentValue(propsInput.value ?? ''), [propsInput.value]);

  return (
    <div
      className={`${styles['input-container']} ${isInvalid ? styles.error : ''}`}
      style={style}
    >
      {
        propsInput?.label && propsInput?.label !== ''
          ? (
            <label
              htmlFor={propsInput.id}
              style={{ opacity: currentValue && currentValue !== '' ? '1' : '' }}
            >
              {propsInput.label}
            </label>
          ) : null
      }
      <input
        className={styles['custom-input']}
        maxLength={propsInput.maxLength}
        id={propsInput.id}
        name={propsInput.id}
        type={propsInput.type}
        placeholder={propsInput.placeholder}
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyUp={propsInput.onKeyUp}
        onKeyDown={propsInput.onKeyDown}
        onKeyPress={propsInput.onKeyPress}
        disabled={propsInput.disabled}
        required={propsInput.required}
        value={
          propsInput.type === 'number'
            ? currentValue === '0' || currentValue === '' ? propsInput.value : currentValue
            : currentValue === '' ? propsInput.value : currentValue
        }
      />
      {helper ? <div className={styles.helper}><span>{helper}</span></div> : null}
      {floatElement}
    </div>
  );
}

type PropsBlocked = {
  propsInput: IInputTextBlocked;
  style?: object;
};

export function InputBlocked({ propsInput, style = {} }: PropsBlocked) {
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

type IOption = {
  value: any;
  label: string;
};

type PropsSelect = {
  propsInput: IInputText;
  style?: object;
  options: IOption[];
  onChange?: (value: string) => void;
};

export function InputSelect({
  propsInput,
  style = {},
  options,
  onChange = () => {},
}: PropsSelect) {
  const [currentValue, setCurrentValue] = useState(propsInput.value ?? '');

  useEffect(() => {
    if (onChange) {
      onChange(currentValue);
    }
  }, [currentValue, onChange]);

  return (
    <div className={styles['input-container']} style={style}>
      <label style={{ opacity: '1' }} htmlFor={propsInput.id}>{propsInput.label}</label>
      <select
        id={propsInput.id}
        name={propsInput.id}
        value={currentValue === '' ? propsInput.value : currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
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

export default InputText;
