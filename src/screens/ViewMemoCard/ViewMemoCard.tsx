import React from 'react';
import { Card } from 'components/Card/Card';
import { IMemo } from '../../types/IMemo';
import { Button } from 'components/Button/Button';
import styles from './ViewMemoCard.module.css';
import { MemoItem } from 'components/MemoItem/MemoItem';
import { EditModal } from 'components/EditModal/EditModal';
import { speechApi } from '../../utils/speechApi';
import { RecordingModal } from 'components/RecordingModal/RecordingModal';

interface ViewMemoCardProps {
  memo: IMemo;
  onBack: () => void;
  onSave: (memo) => Promise<void>;
  onRemove: (memo) => Promise<void>;
  isLoading: boolean;
}

export const ViewMemoCard: React.FC<ViewMemoCardProps> = ({ memo, onBack, onSave, onRemove, isLoading }) => {
  const [editOpen, setEditOpen] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [memoToEdit, setMemoToEdit] = React.useState({ ...memo });

  const buttons = (
    <>
      <Button isRound isBig theme={'gray'} icon={'arrowLeft'} onClick={onBack} />
      <Button
        isRound
        isBig
        theme={'primary'}
        icon={'text'}
        onClick={() => {
          setMemoToEdit({ ...memo });
          setEditOpen(true);
        }}
        tooltip={'Edit this memo'}
      />
      {speechApi.isAvailable && (
        <Button
          isRound
          isBig
          theme={'primary'}
          icon={'record'}
          tooltip={'Hold to re-record this memo'}
          onHoldStart={() => setIsRecording(true)}
          onHoldFinish={() => setIsRecording(false)}
        />
      )}
      <Button
        isRound
        isBig
        theme={'warning'}
        icon={'remove'}
        tooltip={'Remove this memo'}
        onClick={() => onRemove(memo)}
      />
    </>
  );

  const content = (
    <div className={styles.memoWrapper}>
      <MemoItem memo={memo} />
    </div>
  );

  return (
    <>
      <Card content={content} buttons={buttons} isLoading={isLoading} />
      <EditModal
        isOpen={editOpen}
        title={'Edit your memo'}
        onClose={() => setEditOpen(false)}
        onSave={async (savedMemo) => {
          setEditOpen(false);
          await onSave(savedMemo);
        }}
        memo={memoToEdit}
      />
      <RecordingModal
        isOpen={isRecording}
        onVoiceRecorded={(text) => {
          setMemoToEdit({ ...memo, text });
          setEditOpen(true);
        }}
      />
    </>
  );
};
