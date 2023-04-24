import React from "react";
import styles from "./MainCard.module.css";
import { IMemo } from "../types/IMemo";
import { Button } from "components/Button/Button";
import { Card } from "components/Card/Card";
import { Modal } from "components/Modal/Modal";
import { Textarea } from "components/Textarea/Textarea";
import { Spinner } from "components/Spinner/Spinner";
import { MemoItem } from "components/MemoItem/MemoItem";

interface MainCardProps {
  memos: IMemo[];
  isLoading: boolean;
  onMemoSaved: (memo: IMemo) => Promise<boolean>;
}

export const MainCard: React.FC<MainCardProps> = ({ memos, isLoading, onMemoSaved}) => {
  const [currentMemo, setCurrentMemo] = React.useState<IMemo>(null);
  const [addMemoMode, setAddMemoMod] = React.useState<"add" | "select">("add");
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const preventPropagation = React.useRef(false);

  const createNewMemo = () => {
    setCurrentMemo({ text: "" });
    setEditModalOpen(true);
  };

  const updateCurrentMemo = (data: Partial<IMemo>) => {
    setCurrentMemo({ ...currentMemo, ...data });
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
    if (isLoading) {
      return (
        <div className={styles.loader}>
          <Spinner/>
        </div>
      );
    }
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
            <MemoItem key={memo.id} memo={memo}/>
          </div>)
        )}
      </div>
    )
  }, [memos, isLoading]);

  const cardButtons = React.useMemo(() => {
    if (isLoading) return null;
    if (addMemoMode === "add") {
      return (
        <>
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
        </>
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
          />
          <Button
            isRound
            isBig
            theme={"primary"}
            icon={"record"}
            tooltip={"Hold to start record"} />
        </>
      );
    }
  }, [addMemoMode, isLoading]);

  return (
    <>
      <Card title={"My voice memos"} content={cardContent} buttons={cardButtons} />
      <Modal
        title={"Create new memo"}
        onClose={() => setEditModalOpen(false)}
        isOpen={editModalOpen}
      >
        <div className={styles.editModalWrapper}>
          <div className={styles.editModalInput}>
            <Textarea
              value={currentMemo?.text}
              onChange={text => updateCurrentMemo({ text })}
              placeholder={"Write your memo"}
            />
          </div>
          <div className={styles.editModalButtons}>
            <Button
              theme={"primary"}
              text={"Save"}
              onClick={async () => {
                setEditModalOpen(false);
                await onMemoSaved(currentMemo);
              }}
            />
            <Button
              theme={"gray"}
              text={"Cancel"}
              onClick={() => setEditModalOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
