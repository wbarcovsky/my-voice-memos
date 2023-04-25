import React from 'react';
import { IMemo } from '../../types/IMemo';
import styles from './EditModal.module.css';
import { Textarea } from 'components/Textarea/Textarea';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

interface EditModalProps {
  isOpen: boolean;
  title: string;
  memo?: IMemo;
  isRecording?: boolean;
  onSave?: (memo: IMemo) => void;
  onClose: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({ isOpen, memo, onSave, onClose }) => {
  const [text, setText] = React.useState(memo?.text);
  React.useEffect(() => {
    setText(memo?.text);
  }, [memo]);

  return (
    <Modal title={'Create new memo'} onClose={() => onClose()} isOpen={isOpen}>
      <div className={styles.editModalWrapper}>
        <div className={styles.editModalInput}>
          <Textarea
            value={text}
            onChange={(value) => setText(value)}
            placeholder={'Write your memo'}
            maxLength={2000}
          />
        </div>
        <div className={styles.editModalButtons}>
          <Button theme={'primary'} text={'Save'} onClick={() => onSave({ ...memo, text })} />
          <Button theme={'gray'} text={'Cancel'} onClick={() => onClose()} />
        </div>
      </div>
    </Modal>
  );
};
