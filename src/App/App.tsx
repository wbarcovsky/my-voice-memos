import React from "react";
import styles from "./App.module.css";
import { MainCard } from "../MainCard/MainCard";
import { IMemo } from "../types/IMemo";
import { Tooltip } from "react-tooltip";

export const App: React.FC = () => {
  const [memos, setMemos] = React.useState<IMemo[]>([]);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <MainCard memos={memos} />
        </div>
      </div>
      <Tooltip id="tooltip" />
    </>
  );
};
