import React from 'react';
import styles from './Button.module.scss';

interface Props {
  text: string;
  handleClick: () => void;
}

const Button = ({ text, handleClick }: Props) => {
  return (
    <button className={styles.wrapper} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
