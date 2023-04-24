import React from "react";
import styles from "./MainCard.module.css";
import { IMemo } from "../../types/IMemo";
import { Button } from "components/Button/Button";
import { Card } from "components/Card/Card";
import { MemoItem } from "components/MemoItem/MemoItem";
import { EditModal } from "components/EditModal/EditModal";
import { speechApi } from "../../utils/speechApi";
import { RecordingModal } from "components/RecordingModal/RecordingModal";

interface MainCardProps {
  memos: IMemo[];
  isLoading: boolean;
  onMemoSaved: (memo: IMemo) => Promise<void>;
  onMemoSelected: (memo: IMemo) => void;
}

export const MainCard: React.FC<MainCardProps> = ({ memos, isLoading, onMemoSaved, onMemoSelected}) => {
  const [currentMemo, setCurrentMemo] = React.useState<IMemo>(null);
  const [addMemoMode, setAddMemoMod] = React.useState<"add" | "select">("add");
  const [isRecording, setIsRecording] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const preventPropagation = React.useRef(false);

  const createNewMemo = () => {
    setCurrentMemo({ text: "" });
    setEditModalOpen(true);
  };

  const outsideClickHandler = () => {
    // We need to prevent one click handler after user switch to 'select' mode
    // Otherwise button will immediately come back to 'add' mode
    if (!preventPropagation.current) {
      setAddMemoMod("add");
    } else {
      preventPropagation.current = false;
    }
  };

  React.useEffect(() => {
    window.addEventListener("click", outsideClickHandler);
    return () => window.removeEventListener("click", outsideClickHandler);
  }, []);

  const cardContent = React.useMemo(() => {
    if (memos.length === 0) return (
        <div className={styles.memosEmptyList}>
          <p className={styles.notFoundText}>
            No memos here.
            <br />
            <br />
            Let&lsquo;s create one!
          </p>
        </div>
      )

    return (
      <div className={styles.memoList}>
        {memos.map(memo => (
          <div className={styles.memoItemWrapper}>
            <MemoItem
              key={memo.id}
              memo={memo}
              onClick={() => onMemoSelected(memo)}
              isShort={true}
            />
          </div>)
        )}
      </div>
    )
  }, [memos]);

  const cardButtons = React.useMemo(() => {
    if (addMemoMode === "add") {
      return (
        <Button
          isBig
          theme={"primary"}
          onClick={() => {
            preventPropagation.current = true;
            setAddMemoMod("select");
          }}
          icon={"plus"}
          text={"Add new memo"}
        />
      );
    } else {
      return (
        <>
          <Button
            isRound
            isBig
            theme={"primary"}
            icon={"text"}
            onClick={() => createNewMemo()}
            tooltip={"Write your memo"}
          />
          {speechApi.isAvailable && (
            <Button
              isRound
              isBig
              theme={"primary"}
              icon={"record"}
              onHoldStart={() => setIsRecording(true)}
              onHoldFinish={() => setIsRecording(false)}
              tooltip={"Hold to start record"} />
          )}
        </>
      );
    }
  }, [addMemoMode]);

  return (
    <>
      <Card
        content={cardContent}
        buttons={cardButtons}
        isLoading={isLoading}
      />
      <EditModal
        isOpen={editModalOpen}
        title={"Create new memo"}
        onClose={() => setEditModalOpen(false)}
        memo={currentMemo}
        onSave={async (memo) =>{
          setEditModalOpen(false);
          await onMemoSaved(memo);
        }}
      />
      <RecordingModal isOpen={isRecording} onVoiceRecorded={(text) => {
        setCurrentMemo({ text });
        setEditModalOpen(true);
      }}/>
    </>
  );
};
