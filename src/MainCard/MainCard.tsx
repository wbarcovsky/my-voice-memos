import React from 'react';
import styles from './MainCard.module.css';
import { IMemo } from '../types/IMemo';
import { Button } from 'components/Button/Button';
import { Card } from 'components/Card/Card';

interface MainCardProps {
  memos: IMemo[];
}

export const MainCard: React.FC<MainCardProps> = ({ memos }) => {
  const [addMemoMode, setAddMemoMod] = React.useState<'add' | 'select'>('add');
  const preventPropagation = React.useRef(false);

  const outsideClickHandler = () => {
    // We need to prevent one click handler after user switch to 'select' mode
    // Otherwise button will immediately come back to 'add' mode
    if (!preventPropagation.current) {
      setAddMemoMod('add');
    } else {
      preventPropagation.current = false;
    }
  };

  React.useEffect(() => {
    window.addEventListener('click', outsideClickHandler);
    window.addEventListener('scroll', outsideClickHandler);
    return () => {
      window.removeEventListener('click', outsideClickHandler);
      window.removeEventListener('scroll', outsideClickHandler);
    };
  }, []);

  const cardContent = React.useMemo(
    () => (
      <>
        {memos.length === 0 && (
          <div className={styles.memosEmptyList}>
            <p className={styles.notFoundText}>
              No memos here.
              <br />
              <br />
              Let&lsquo;s create one!
            </p>
          </div>
        )}
      </>
    ),
    [memos]
  );

  const cardButtons = React.useMemo(() => {
    if (addMemoMode === 'add') {
      return (
        <>
          <Button
            onClick={() => {
              preventPropagation.current = true;
              setAddMemoMod('select');
            }}
            icon={'plus'}
            text={'Add new memo'}
          />
        </>
      );
    } else {
      return (
        <>
          <Button isRound icon={'record'} />
          <Button isRound icon={'text'} />
        </>
      );
    }
  }, [addMemoMode]);

  return <Card title={'My voice memos'} content={cardContent} buttons={cardButtons} />;
};
