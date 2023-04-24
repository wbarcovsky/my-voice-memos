import React, { PropsWithChildren } from "react";
import styles from "./Modal.module.css";
import cs from "classnames";
import { CrossIcon } from "components/icons";

type ModalProps = PropsWithChildren<{
  title: string,
  onClose: () => void,
  isOpen: boolean,
  maxWidth?: number,
  maxHeight?: number,
  hideClose?: boolean,
}>
export const Modal: React.FC<ModalProps> = ({ onClose, isOpen, title, children, hideClose, maxWidth = 600 }) => {
  if (!isOpen) return <></>;
  return (
    <div
      className={cs(styles.modal, isOpen ? styles.displayBlock : styles.displayNone)} onClick={onClose}>
      <section style={{ maxWidth }} className={styles.modalMain} onClick={event => event.stopPropagation()}>
        {!hideClose && (<button className={styles.closeButton} onClick={onClose} title={'Close'}>
          <CrossIcon width={24} height={24} fill={'white'} />
        </button>)}
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
