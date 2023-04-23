import { IMemo } from "../../types/IMemo";
import React from "react";
import styles from "./MemoItem.module.css";
import cs from 'classnames';

interface MemoItemProps {
  memo: IMemo,
  isOpen?: boolean,
  onClick: () => void,
}

export const MemoItem: React.FC<MemoItemProps> = ({ memo, isOpen }) => {
  return (
    <div className={cs(styles.wrapper)}>
      <div className={styles.text}>
        {memo.text}
      </div>
    </div>
  );
};
