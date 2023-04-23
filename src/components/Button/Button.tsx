import React from 'react';
import styles from './Button.module.css';
import cs from 'classnames';

type ButtonIcons = 'plus' | 'text' | 'record';

type ButtonProps = {
  onClick?: () => void;
  onHoldStart?: () => void;
  onHoldFinish?: () => void;
  text?: string;
  icon?: ButtonIcons;
  isRound?: boolean;
  tooltip?: string;
};

// Icons downloaded from https://www.svgrepo.com/
const iconsHash: Record<ButtonIcons, React.JSXElementConstructor<any>> = {
  text: ({ width, height }) => (
    <svg
      fill="#ffffff"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M30.133 1.552c-1.090-1.044-2.291-1.573-3.574-1.573-2.006 0-3.47 1.296-3.87 1.693-0.564 0.558-19.786 19.788-19.786 19.788-0.126 0.126-0.217 0.284-0.264 0.456-0.433 1.602-2.605 8.71-2.627 8.782-0.112 0.364-0.012 0.761 0.256 1.029 0.193 0.192 0.45 0.295 0.713 0.295 0.104 0 0.208-0.016 0.31-0.049 0.073-0.024 7.41-2.395 8.618-2.756 0.159-0.048 0.305-0.134 0.423-0.251 0.763-0.754 18.691-18.483 19.881-19.712 1.231-1.268 1.843-2.59 1.819-3.925-0.025-1.319-0.664-2.589-1.901-3.776zM22.37 4.87c0.509 0.123 1.711 0.527 2.938 1.765 1.24 1.251 1.575 2.681 1.638 3.007-3.932 3.912-12.983 12.867-16.551 16.396-0.329-0.767-0.862-1.692-1.719-2.555-1.046-1.054-2.111-1.649-2.932-1.984 3.531-3.532 12.753-12.757 16.625-16.628zM4.387 23.186c0.55 0.146 1.691 0.57 2.854 1.742 0.896 0.904 1.319 1.9 1.509 2.508-1.39 0.447-4.434 1.497-6.367 2.121 0.573-1.886 1.541-4.822 2.004-6.371zM28.763 7.824c-0.041 0.042-0.109 0.11-0.19 0.192-0.316-0.814-0.87-1.86-1.831-2.828-0.981-0.989-1.976-1.572-2.773-1.917 0.068-0.067 0.12-0.12 0.141-0.14 0.114-0.113 1.153-1.106 2.447-1.106 0.745 0 1.477 0.34 2.175 1.010 0.828 0.795 1.256 1.579 1.27 2.331 0.014 0.768-0.404 1.595-1.24 2.458z"></path>
    </svg>
  ),
  plus: ({ width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fill="#ffffff"
        fillRule="evenodd"
        d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"
      />
    </svg>
  ),
  record: ({ width, height }) => (
    <svg
      fill="#ffffff"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.965 22h0.238c2.78 0 4.797-2.050 4.797-4.874v-11.919c0-2.92-2.108-5.207-4.798-5.207h-0.237c-2.738 0-4.965 2.336-4.965 5.207v11.919c0 2.779 2.135 4.874 4.965 4.874zM13 5.207c0-1.768 1.33-3.207 2.965-3.207h0.238c1.595 0 2.797 1.379 2.797 3.207v11.919c0 1.718-1.124 2.874-2.798 2.874h-0.237c-1.746 0-2.965-1.181-2.965-2.874zM25 11c-0.552 0-1 0.448-1 1v4.159c0 5.95-2.124 8.842-6.492 8.842h-2.973c-5.713 0-6.535-4.808-6.535-8.841v-4.159c0-0.552-0.448-1-1-1s-1 0.448-1 1v4.159c0 6.89 2.872 10.841 8.535 10.841h0.465v3h-5c-0.552 0-1 0.448-1 1s0.448 1 1 1h12c0.552 0 1-0.448 1-1s-0.448-1-1-1h-5v-3h0.508c3.874 0 8.492-1.881 8.492-10.842v-4.159c0-0.552-0.448-1-1-1z"></path>
    </svg>
  )
};
export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  onClick,
  icon,
  text,
  isRound,
  tooltip,
}) => {
  const Icon = icon ? iconsHash[icon] : null;
  return (
    <button
      className={cs(styles.button, isRound && styles.roundButton)} onClick={onClick}
      data-tooltip-id={'tooltip'}
      data-tooltip-content={tooltip}
      data-tooltip-place={tooltip ? 'top' : undefined}
    >
      {!!icon && (
        <div className={styles.icon}>
          <Icon width={32} height={32} />
        </div>
      )}
      {!!text && <p className={styles.text}>{text}</p>}
    </button>
  );
};
