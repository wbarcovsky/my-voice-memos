import React from 'react';
import styles from './Button.module.css';
import cs from 'classnames';
import { ArrowLeftIcon, CrossIcon, MicIcon, PlusIcon, TextIcon } from "components/icons";

type ButtonIcons = 'plus' | 'text' | 'record' | 'arrowLeft' | 'remove';

interface ButtonProps {
  onClick?: () => any;
  onHoldStart?: () => any;
  onHoldFinish?: () => any;
  text?: string;
  icon?: ButtonIcons;
  isRound?: boolean;
  isBig?: boolean;
  tooltip?: string;
  theme: 'primary' | 'gray' | 'warning';
}

const iconsHash: Record<ButtonIcons, React.JSXElementConstructor<any>> = {
  text: TextIcon,
  plus: PlusIcon,
  record: MicIcon,
  arrowLeft: ArrowLeftIcon,
  remove: CrossIcon,
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  onHoldStart,
  onHoldFinish,
  icon,
  text,
  isRound,
  isBig,
  tooltip,
  theme,
}) => {
  const Icon = icon ? iconsHash[icon] : null;
  const mouseDown = () => {
    if (onHoldStart) {
      onHoldStart();
      window.addEventListener('mouseup', () => onHoldFinish(), { once: true })
    }
  }

  const touchStart = () => {
    if (onHoldStart) {
      onHoldStart();
      window.addEventListener('touchend', () => onHoldFinish(), { once: true })
    }
  }

  return (
    <button
      className={cs(
        styles.button,
        isRound && styles.roundButton,
        isBig && styles.big,
        styles[theme],
      )}
      onClick={onClick}
      onMouseDown={mouseDown}
      onTouchStart={touchStart}
      data-tooltip-id={'tooltip'}
      data-tooltip-content={tooltip}
      data-tooltip-place={tooltip ? 'top' : undefined}
    >
      {!!icon && (
        <div className={styles.icon}>
          <Icon width={32} height={32} fill={'#ffffff'} />
        </div>
      )}
      {!!text && <p className={styles.text}>{text}</p>}
    </button>
  );
};
