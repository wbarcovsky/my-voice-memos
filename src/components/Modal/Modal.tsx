import React, { PropsWithChildren } from "react";
import styles from "./Modal.module.css";
import cs from "classnames";

type ModalProps = PropsWithChildren<{
  title: string,
  onClose: () => void,
  isOpen: boolean,
}>
export const Modal: React.FC<ModalProps> = ({ onClose, isOpen, title, children }) => {
  return (
    <div className={cs(styles.modal, isOpen ? styles.displayBlock : styles.displayNone)} onClick={onClose}>
      <section className={styles.modalMain} onClick={event => event.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} title={'Close'}>
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="white">
            <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#cccccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={styles.titleWrapper}>
          <p>{title}</p>
        </div>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </section>
    </div>
  );
};
