import React, { useEffect } from "react";
import styles from "./RecordingModal.module.css";
import { Modal } from "components/Modal/Modal";
import { MicrophoneBigIcon } from "components/icons";
import { speechApi } from "../../utils/speechApi";

interface RecordingModalProps {
  isOpen: boolean;
  onVoiceRecorded: (text: string) => any;
}

export const RecordingModal: React.FC<RecordingModalProps> = ({ isOpen, onVoiceRecorded }) => {

  useEffect(() => {
    if (isOpen) {
      speechApi.startRecord().then(text => {
        if (text) onVoiceRecorded(text);
      })
    } else {
      speechApi.stopRecord();
    }
  }, [isOpen])

  return (
    <Modal
      title={"ON-AIR"}
      onClose={() => null}
      isOpen={isOpen}
      maxWidth={300}
      maxHeight={300}
      hideClose
    >
      <div className={styles.wrapper}>
        <div className={styles.pulse}></div>
        <div className={styles.svg}>
          <MicrophoneBigIcon width={120} height={120}/>
        </div>
      </div>
    </Modal>
  );
};
