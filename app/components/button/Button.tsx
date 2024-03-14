import React, { forwardRef, ForwardedRef } from 'react';
import styles from './Button.module.scss';

interface Props {
  text: string;
  handleClick: () => void;
}

const Button = forwardRef(({ text, handleClick }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button className={styles.wrapper} onClick={handleClick} ref={ref}>
      {text}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
