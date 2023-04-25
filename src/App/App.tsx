import React from 'react';
import styles from './App.module.css';
import { MainCard } from '../screens/MainCard/MainCard';
import { IMemo } from '../types/IMemo';
import { Tooltip } from 'react-tooltip';
import { dbApi } from '../utils/dbApi';
import { ViewMemoCard } from '../screens/ViewMemoCard/ViewMemoCard';
import { speechApi } from '../utils/speechApi';
import { useNotify } from '../hooks/useNotify';

export const App: React.FC = () => {
  const [memos, setMemos] = React.useState<IMemo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [viewedMemo, setViewedMemo] = React.useState<IMemo>(null);
  const [screen, setScreen] = React.useState<'main' | 'view'>('main');

  const [notify, contextHolder] = useNotify();

  const errorHandler = (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    notify('Oops! Something went wrong');
  };

  React.useEffect(() => {
    speechApi.on('error', errorHandler);
    dbApi.on('error', errorHandler);
    speechApi.init();
    dbApi.init().then(() =>
      dbApi.loadMemos().then((loadedMemos) => {
        setMemos(loadedMemos);
        setIsLoading(false);
      })
    );
  }, []);

  const saveMemo = async (memo: IMemo, updateViewed = false) => {
    setIsLoading(true);
    await dbApi.saveMemo(memo);
    const dbMemos = await dbApi.loadMemos();
    setMemos(dbMemos);
    setIsLoading(false);
    if (updateViewed) setViewedMemo(memo);
  };

  const removeMemo = async (memo: IMemo) => {
    setIsLoading(true);
    await dbApi.removeMemo(memo);
    const dbMemos = await dbApi.loadMemos();
    setMemos(dbMemos);
    setIsLoading(false);
    setScreen('main');
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {screen === 'main' && (
            <MainCard
              memos={memos}
              isLoading={isLoading}
              onMemoSaved={(memo) => saveMemo(memo)}
              onMemoSelected={(memo) => {
                setViewedMemo(memo);
                setScreen('view');
              }}
            />
          )}
          {screen === 'view' && (
            <ViewMemoCard
              isLoading={isLoading}
              memo={viewedMemo}
              onBack={() => setScreen('main')}
              onSave={(memo) => saveMemo(memo, true)}
              onRemove={(memo) => removeMemo(memo)}
            />
          )}
        </div>
        <div id="popups">{contextHolder}</div>
      </div>
      <Tooltip id="tooltip" />
    </>
  );
};
