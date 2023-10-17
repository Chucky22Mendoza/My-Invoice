import React from 'react';
import styles from './form.module.css';

type Props = {
  children: string;
};

function Button({ children }: Props) {
  return (
    <button className={styles['btn-menu']} type="submit">{children}</button>
  );
}

export default Button;
