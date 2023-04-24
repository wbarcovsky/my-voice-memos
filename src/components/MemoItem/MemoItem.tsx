import { IMemo } from "../../types/IMemo";
import React from "react";
import styles from "./MemoItem.module.css";
import cs from 'classnames';
import { nl2br } from "../../utils/nl2br";

interface MemoItemProps {
  memo: IMemo,
  isShort?: boolean,
  onClick?: () => void,
}

export const MemoItem: React.FC<MemoItemProps> = ({ memo, isShort, onClick }) => {
  return (
    <div
      className={cs(styles.wrapper, onClick && styles.pointer)}
      onClick={() => onClick ? onClick() : null}
    >
      <div className={cs(styles.text, isShort && styles.short)}>
        {nl2br(memo.text)}
      </div>
    </div>
  );
};
