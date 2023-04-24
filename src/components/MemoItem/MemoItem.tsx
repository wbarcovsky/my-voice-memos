import { IMemo } from "../../types/IMemo";
import React from "react";
import styles from "./MemoItem.module.css";
import cs from 'classnames';
import { nl2br } from "../../utils/nl2br";

interface MemoItemProps {
  memo: IMemo,
  isOpen?: boolean,
  onClick?: () => void,
}

export const MemoItem: React.FC<MemoItemProps> = ({ memo, isOpen }) => {
  return (
    <div className={cs(styles.wrapper)}>
      <div className={styles.text}>
        {nl2br(memo.text)}
      </div>
    </div>
  );
};
