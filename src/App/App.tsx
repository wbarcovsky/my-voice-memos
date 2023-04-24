import React from "react";
import styles from "./App.module.css";
import { MainCard } from "../MainCard/MainCard";
import { IMemo } from "../types/IMemo";
import { Tooltip } from "react-tooltip";
import { dbApi } from "../utils/dbApi";

export const App: React.FC = () => {
  const [memos, setMemos] = React.useState<IMemo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    dbApi.init().then(() => dbApi.loadMemos().then(memos => {
      setMemos(memos);
      setIsLoading(false);
    }));
  }, []);

  const saveMemo = async (memo: IMemo) => {
    setIsLoading(true);
    await dbApi.saveMemo(memo);
    const memos = await dbApi.loadMemos();
    setMemos(memos);
    setIsLoading(false)
    return true;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <MainCard memos={memos} isLoading={isLoading} onMemoSaved={(memo) => saveMemo(memo)}/>
        </div>
      </div>
      <Tooltip id="tooltip" />
    </>
  );
};
